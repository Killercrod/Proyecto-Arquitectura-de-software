package com.corvus.corvus_backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalTime;

// date formato: "2026-12-05". Horas: "17:00" o "17:00:00"
public record EventDtoRequest(

        @NotBlank(message = "El título es obligatorio")
        @Size(min = 3, max = 150, message = "El título debe tener entre 3 y 150 caracteres")
        String title,

        @NotNull(message = "La fecha es obligatoria")
        LocalDate date,

        @NotBlank(message = "El lugar es obligatorio")
        @Size(min = 2, max = 200, message = "El lugar debe tener entre 2 y 200 caracteres")
        String location,

        @NotNull(message = "La hora de inicio es obligatoria")
        LocalTime startTime,

        @NotNull(message = "La hora de finalización es obligatoria")
        LocalTime endTime
) {
}