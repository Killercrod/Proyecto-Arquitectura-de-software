package com.corvus.corvus_backend.dto;

import java.time.LocalDateTime;

public record AdminDtoResponse(Long id, String email, LocalDateTime createdAt) {
}
