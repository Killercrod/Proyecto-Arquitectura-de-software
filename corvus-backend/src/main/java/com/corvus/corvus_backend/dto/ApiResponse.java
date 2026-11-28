package com.corvus.corvus_backend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * Estandar para los JSON
 * - GET devuelve { success, data }                (sin message)
 * - GET paginado devuelve { success, data, pagination }
 * - error devuelve { success: false, message }    (sin data)
 * Por cuestiones de migración de Node.js
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public record ApiResponse<T>(boolean success, String message, T data, PaginationDto pagination) {

    // success solo con datos (estructura) -> { success: true, data }
    public static <T> ApiResponse<T> ok(T data) {
        return new ApiResponse<>(true, null, data, null);
    }

    // success con mensaje y datos(estructura)-> { success: true, message, data }
    public static <T> ApiResponse<T> ok(String message, T data) {
        return new ApiResponse<>(true, message, data, null);
    }

    // estructura para products -> { success: true, data, pagination }
    public static <T> ApiResponse<T> paged(T data, PaginationDto pagination) {
        return new ApiResponse<>(true, null, data, pagination);
    }

    // success solo con mensaje (delete) -> { success: true, message }
    public static ApiResponse<Void> message(String message) {
        return new ApiResponse<>(true, message, null, null);
    }

    // Error                           -> { success: false, message }
    public static ApiResponse<Void> error(String message) {
        return new ApiResponse<>(false, message, null, null);
    }
}