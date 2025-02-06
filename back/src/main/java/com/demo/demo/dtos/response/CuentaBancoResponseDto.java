package com.demo.demo.dtos.response;

import jakarta.validation.constraints.NotBlank;

import java.util.UUID;

public record CuentaBancoResponseDto(
        UUID id,
        String cuit,

        String cbu,

        String alias,

        String titular
) {



}
