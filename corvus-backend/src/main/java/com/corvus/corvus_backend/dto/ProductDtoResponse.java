package com.corvus.corvus_backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record ProductDtoResponse (
    Long id,
    Long categoryId,
    String categoryName,
    String name,
    String description,
    BigDecimal price,
    int stock,
    List<ProductImageDtoResponse> images,
    LocalDateTime createdAt,
    LocalDateTime updatedAt // null si nunca se editó
) {
}
