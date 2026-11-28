package com.corvus.corvus_backend.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;


public record ProductDtoRequest(

        @NotNull(message = "La categoría es obligatoria")
        @Positive(message = "La categoría debe ser válida")
        Long categoryId,

        @NotBlank(message = "El nombre es obligatorio")
        @Size(max = 150, message = "El nombre no puede superar 150 caracteres")
        String name,

        @NotBlank(message = "La descripción es obligatoria")
        @Size(max = 5000, message = "La descripción es demasiado larga")
        String description,

        @NotNull(message = "El precio es obligatorio")
        @DecimalMin(value = "0.00", message = "El precio no puede ser negativo")
        @DecimalMax(value = "99999999.99", message = "El precio supera el límite permitido")
        @Digits(integer = 8, fraction = 2, message = "El precio admite máximo 2 decimales")
        BigDecimal price,

        @NotNull(message = "El inventario es obligatorio")
        @Min(value = 0, message = "El inventario no puede ser negativo")
        Integer stock,

        // 
        List<MultipartFile> images
) {
}
