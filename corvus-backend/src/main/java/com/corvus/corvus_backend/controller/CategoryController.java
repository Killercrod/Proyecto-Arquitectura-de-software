package com.corvus.corvus_backend.controller;

import com.corvus.corvus_backend.dto.ApiResponse;
import com.corvus.corvus_backend.dto.CategoryDtoRequest;
import com.corvus.corvus_backend.dto.CategoryDtoResponse;
import com.corvus.corvus_backend.service.CategoryService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 * Capa de PRESENTACIÓN: recibe la petición HTTP y responde.
 * No tiene lógica: solo traduce HTTP <-> service.
 * Equivale a tus routes + controller de Node.
 */
@RestController                      // Devuelve JSON automáticamente
@RequestMapping("/api/categories")   // Prefijo de todas las rutas de esta clase
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    // GET /api/categories
    @GetMapping
    public List<CategoryDtoResponse> findAll() {
        return categoryService.findAll();
    }

    // GET /api/categories/ (@PathVariable toma el "1" de la URL)
    @GetMapping("/{id}")
    public CategoryDtoResponse findById(@PathVariable Long id) {
        return categoryService.findById(id);
    }

    // POST /api/categories
    // @RequestBody convierte el JSON en CategoryRequest.
    // @Valid ejecuta las validaciones; si fallan, responde 400 sin llegar al service.
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED) // 201 en vez de 200
    public CategoryDtoResponse create(@Valid @RequestBody CategoryDtoRequest request) {
        return categoryService.create(request);
    }

    // PUT /api/categories/
    @RequestMapping(value = "/{id}", method = {RequestMethod.PUT, RequestMethod.PATCH})
    public ApiResponse<CategoryDtoResponse> update(@PathVariable Long id,
                                                @Valid @RequestBody CategoryDtoRequest request) {
        return ApiResponse.ok("Categoría actualizada correctamente", categoryService.update(id, request));
    }

    // DELETE /api/categories/1
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT) // 204: éxito sin cuerpo
    public void delete(@PathVariable Long id) {
        categoryService.delete(id);
    }
} 