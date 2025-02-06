package com.demo.demo.dtos.request;

import jakarta.validation.constraints.NotBlank;


public record UpdateCuentaBancoDto(
        @NotBlank
        String cuit,
        @NotBlank
        String cbu,
        @NotBlank
        String alias,
        @NotBlank
        String titular
) {
}
