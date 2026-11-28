package com.corvus.corvus_backend.service;

import com.corvus.corvus_backend.dto.CategoryDtoResponse;
import com.corvus.corvus_backend.dto.ProductDtoRequest;
import com.corvus.corvus_backend.dto.ProductDtoResponse;
import com.corvus.corvus_backend.dto.ProductImageDtoResponse;
import com.corvus.corvus_backend.dto.ProductUpdateDtoRequest;
import com.corvus.corvus_backend.model.Category;
import com.corvus.corvus_backend.model.Product;
import com.corvus.corvus_backend.model.ProductImage;
import com.corvus.corvus_backend.repository.CategoryRepository;
import com.corvus.corvus_backend.repository.ProductRepository;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ProductService {

    private static final int MAX_IMAGES = 4;

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final FileStorageService fileStorageService;

    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository, FileStorageService fileStorageService) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.fileStorageService = fileStorageService;
    }

    @Transactional(readOnly = true)
    public Page<ProductDtoResponse> findAll(int page, int limit, Long categoryId, String search) {
        // Mismas reglas que tu controller de Node
        if (page < 1 || limit < 1 || limit > 100 || (categoryId != null && categoryId < 1)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Los filtros de búsqueda no son válidos");
        }

        // contador paginas desde 1
        Pageable pageable = PageRequest.of(page - 1, limit,
                Sort.by(Sort.Order.desc("createdAt"), Sort.Order.desc("id")));

        return productRepository.search(categoryId, search.trim(), pageable)
                .map(this::toResponse);
    }

    @Transactional(readOnly = true)
    public ProductDtoResponse findById(Long id) {
        return toResponse(getActiveOrThrow(id));
    }

    // crear producto (necesita token)
    @Transactional
    public ProductDtoResponse create(ProductDtoRequest request) {
        List<MultipartFile> files = nonEmpty(request.images());
        validateImageCount(files.size());
        Category category = getCategoryOrThrow(request.categoryId());

        // Guardamos los archivos y dejamos programada su limpieza por si la BD falla
        List<String> urls = fileStorageService.storeAll(files);
        registerFileCleanup(urls, List.of());

        // Un producto nuevo siempre nace activo
        Product product = new Product(request.name().trim(), request.description().trim(),
                request.price(), request.stock(), true, category);
        replaceImages(product, urls);

        return toResponse(productRepository.save(product));
    }

    // editar proucto
    @Transactional
    public ProductDtoResponse update(Long id, ProductUpdateDtoRequest request) {
        Product product = getActiveOrThrow(id);

        if (!request.hasChanges()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Debes proporcionar al menos un campo para actualizar");
        }

        // edición parcial de campos que llegaron editados del front
        if (request.categoryId() != null) {
            product.setCategory(getCategoryOrThrow(request.categoryId()));
        }
        if (request.name() != null) {
            product.setName(request.name().trim());
        }
        if (request.description() != null) {
            product.setDescription(request.description().trim());
        }
        if (request.price() != null) {
            product.setPrice(request.price());
        }
        if (request.stock() != null) {
            product.setStock(request.stock());
        }

        // se reemplazan todas las imágenes si editaron el campo
        List<MultipartFile> files = nonEmpty(request.images());
        if (!files.isEmpty()) {
            validateImageCount(files.size());

            List<String> oldUrls = product.getImages().stream()
                    .map(ProductImage::getImageUrl).toList();
            List<String> newUrls = fileStorageService.storeAll(files);
            registerFileCleanup(newUrls, oldUrls);

            replaceImages(product, newUrls);
        }

        return toResponse(productRepository.save(product));
    }

    //  desactivacion de fila
    @Transactional
    public void deactivate(Long id) {
        getActiveOrThrow(id).setActive(false);
    }

    // ---------- Auxiliares ----------

    private Product getActiveOrThrow(Long id) {
        return productRepository.findByIdAndActiveTrue(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Producto no encontrado"));
    }

    // error 400 "La categoría no existe"
    private Category getCategoryOrThrow(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "La categoría no existe"));
    }

    private void validateImageCount(int count) {
        if (count > MAX_IMAGES) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Un producto admite un máximo de cuatro imágenes");
        }
    }

    // 
    private List<MultipartFile> nonEmpty(List<MultipartFile> files) {
        if (files == null) {
            return List.of();
        }
        return files.stream().filter(file -> !file.isEmpty()).toList();
    }

    // Vacía la lista (orphanRemoval borra las filas viejas) y agrega las nuevas: posición 1, 2, 3...
    private void replaceImages(Product product, List<String> urls) {
        product.getImages().clear();
        for (int i = 0; i < urls.size(); i++) {
            product.addProductImage(new ProductImage(product, i + 1, urls.get(i)));
        }
    }

    /**
     * Limpia archivos según cómo termine el flujo:
     *  - commit:   borrado de archivos viejos (no se utilizan)
     *  - rollback: borrado archivos nuevos (db no los guardó)
     */
    private void registerFileCleanup(List<String> newUrls, List<String> oldUrls) {
        TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
            @Override
            public void afterCompletion(int status) {
                if (status == STATUS_COMMITTED) {
                    oldUrls.forEach(fileStorageService::delete);
                } else if (status == STATUS_ROLLED_BACK) {
                    newUrls.forEach(fileStorageService::delete);
                }
            }
        });
    }

    // Entity -> DTO (nunca devolvemos la entity)
    private ProductDtoResponse toResponse(Product product) {
        return new ProductDtoResponse(
                product.getId(),
                product.getCategory().getId(),
                product.getCategory().getName(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getStock(),
                product.getImages().stream().map(this::toImageResponse).toList(),
                product.getCreatedAt(),
                product.getUpdatedAt()
        );
    }

    private ProductImageDtoResponse toImageResponse(ProductImage image) {
        return new ProductImageDtoResponse(image.getId(), image.getPosition(), image.getImageUrl());
    }

    // toResponse(Product) y toImageResponse(ProductImage) NO cambian:
    // déjalos igual que en la versión anterior.
}
