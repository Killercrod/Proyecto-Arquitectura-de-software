package com.corvus.corvus_backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Datos de ENTRADA (POST y PUT). Es un "record": clase inmutable de solo datos.
 */

// peticion
public record CategoryDtoRequest(
        @NotBlank(message = "name is required")
        @Size(max = 100, message = "name must be at most 100 characters")
        String name
) {
}