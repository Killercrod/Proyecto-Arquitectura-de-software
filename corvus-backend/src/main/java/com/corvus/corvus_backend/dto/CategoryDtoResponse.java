package com.corvus.corvus_backend.dto;

/**
 * Datos de para el front
 */
public record CategoryDtoResponse(
    Long id, 
    String name,
    Long productCount
) {
}
