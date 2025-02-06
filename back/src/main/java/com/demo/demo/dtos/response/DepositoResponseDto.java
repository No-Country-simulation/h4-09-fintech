package com.demo.demo.dtos.response;

import com.demo.demo.enums.Status;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

public record DepositoResponseDto(
        UUID depositoId,
        float monto,
        LocalDate fechaDeposito,
        LocalDate fechaEntrega,
        String name,
        String lastName,
        String email,
        Status status,
        String comprobante,
        UUID userId
) {
}
