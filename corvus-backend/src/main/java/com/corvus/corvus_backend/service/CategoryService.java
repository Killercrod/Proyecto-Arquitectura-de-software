package com.corvus.corvus_backend.service;

import com.corvus.corvus_backend.dto.CategoryDtoRequest;
import com.corvus.corvus_backend.dto.CategoryDtoResponse;
import com.corvus.corvus_backend.model.Category;
import com.corvus.corvus_backend.repository.CategoryRepository;
import com.corvus.corvus_backend.repository.CategoryRepository.CategoryWithCount;
import com.corvus.corvus_backend.repository.ProductRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    public CategoryService(CategoryRepository categoryRepository, ProductRepository productRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }

    @Transactional(readOnly = true)
    public List<CategoryDtoResponse> findAll() {
        return categoryRepository.findAllWithProductCount().stream().map(this::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public CategoryDtoResponse findById(Long id) {
        return toResponse(categoryRepository.findByIdWithProductCount(id)
                .orElseThrow(this::notFound));
    }

    @Transactional
    public CategoryDtoResponse create(CategoryDtoRequest request) {
        String name = request.name().trim();

        if (categoryRepository.existsByNameIgnoreCase(name)) {
            throw nameTaken();
        }

        Category saved = categoryRepository.save(new Category(name));
        return findById(saved.getId());
    }

    @Transactional
    public CategoryDtoResponse update(Long id, CategoryDtoRequest request) {
        Category category = categoryRepository.findById(id).orElseThrow(this::notFound);
        String name = request.name().trim();

        if (categoryRepository.existsByNameIgnoreCaseAndIdNot(name, id)) {
            throw nameTaken();
        }

        category.setName(name);
        categoryRepository.save(category);
        return findById(id);
    }

    @Transactional
    public void delete(Long id) {
        Category category = categoryRepository.findById(id).orElseThrow(this::notFound);

        // Productos activos o no: la llave foránea impediría borrarla
        if (productRepository.existsByCategoryId(id)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "No se puede eliminar una categoría que tiene productos");
        }

        categoryRepository.delete(category);
    }

    private ResponseStatusException notFound() {
        return new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoría no encontrada");
    }

    private ResponseStatusException nameTaken() {
        return new ResponseStatusException(HttpStatus.CONFLICT, "Ya existe una categoría con ese nombre");
    }

    private CategoryDtoResponse toResponse(CategoryWithCount c) {
        return new CategoryDtoResponse(c.getId(), c.getName(), c.getProductCount());
    }
}
