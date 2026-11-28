package com.corvus.corvus_backend.dto;
import jakarta.validation.constraints.NotBlank;

public record LoginAdminDtoRequest(

        @NotBlank(message = "El correo es obligatorio")
        String email,

        @NotBlank(message = "La contraseña es obligatoria")
        String password
) {
}
