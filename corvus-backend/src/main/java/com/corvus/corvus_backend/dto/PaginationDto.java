package com.corvus.corvus_backend.dto;

/**  objeto "pagination" para products */
public record PaginationDto(int page, int limit, long total, int totalPages) {
}