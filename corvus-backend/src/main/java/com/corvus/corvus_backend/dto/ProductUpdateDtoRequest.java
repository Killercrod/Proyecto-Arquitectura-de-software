package com.corvus.corvus_backend.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;


public record ProductUpdateDtoRequest(

        @Positive(message = "La categoría debe ser válida")
        Long categoryId,

        // (?s).*\S.* = "tiene al menos un carácter que no sea espacio"
        @Pattern(regexp = "(?s).*\\S.*", message = "El nombre no puede estar vacío")
        @Size(max = 150, message = "El nombre no puede superar 150 caracteres")
        String name,

        @Pattern(regexp = "(?s).*\\S.*", message = "La descripción no puede estar vacía")
        @Size(max = 5000, message = "La descripción es demasiado larga")
        String description,

        @DecimalMin(value = "0.00", message = "El precio no puede ser negativo")
        @DecimalMax(value = "99999999.99", message = "El precio supera el límite permitido")
        @Digits(integer = 8, fraction = 2, message = "El precio admite máximo 2 decimales")
        BigDecimal price,

        @Min(value = 0, message = "El inventario no puede ser negativo")
        Integer stock,

        List<MultipartFile> images
) {

    // Tu refine: "Debes proporcionar al menos un campo para actualizar".
    // Aquí también cuenta enviar solo imágenes.
    public boolean hasChanges() {
        return categoryId != null || name != null || description != null
                || price != null || stock != null
                || (images != null && images.stream().anyMatch(file -> !file.isEmpty()));
    }
}