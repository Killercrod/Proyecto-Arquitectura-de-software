package com.corvus.corvus_backend.controller;

import com.corvus.corvus_backend.dto.ApiResponse;
import com.corvus.corvus_backend.dto.PaginationDto;
import com.corvus.corvus_backend.dto.ProductDtoRequest;
import com.corvus.corvus_backend.dto.ProductDtoResponse;
import com.corvus.corvus_backend.dto.ProductUpdateDtoRequest;
import com.corvus.corvus_backend.service.ProductService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // GET ejemplo: /api/products?page=1&limit=12&categoryId=2&search=luffy
    @GetMapping
    public ApiResponse<List<ProductDtoResponse>> findAll(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "12") int limit,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(defaultValue = "") String search) {

        Page<ProductDtoResponse> result = productService.findAll(page, limit, categoryId, search);

        return ApiResponse.paged(result.getContent(),
                new PaginationDto(page, limit, result.getTotalElements(), result.getTotalPages()));
    }

    @GetMapping("/{id}")
    public ApiResponse<ProductDtoResponse> findById(@PathVariable Long id) {
        return ApiResponse.ok(productService.findById(id));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<ProductDtoResponse> create(@Valid @ModelAttribute ProductDtoRequest request) {
        return ApiResponse.ok("Producto creado correctamente", productService.create(request));
    }

    @PatchMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<ProductDtoResponse> update(@PathVariable Long id,
                                                  @Valid @ModelAttribute ProductUpdateDtoRequest request) {
        return ApiResponse.ok("Producto actualizado correctamente", productService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        productService.deactivate(id);
        return ApiResponse.message("Producto desactivado correctamente");
    }
}
