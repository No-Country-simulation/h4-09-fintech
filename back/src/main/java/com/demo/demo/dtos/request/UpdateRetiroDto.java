package com.demo.demo.dtos.request;

import com.demo.demo.enums.Status;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.util.UUID;

public record UpdateRetiroDto(
        @NotNull(message = "El estado no puede ser nulo")
        @Pattern(regexp = "APROBADO|RECHAZADO|PENDIENTE", message = "Estado inválido")
        Status status,

        @NotNull(message = "El ID del usuario no puede ser nulo")
        UUID userId,

        @NotNull(message = "El ID del retiro no puede ser nulo")
        UUID retiroId
) {
}
