package com.demo.demo.dtos.response;

import com.demo.demo.enums.Status;
import org.springframework.cglib.core.Local;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

public record RetiroResponseDto(
        UUID retiroId,
        float monto,
        LocalDate fechaDeposito,
        LocalDate fechaEntrega,
        String name,
        String lastName,
        String email,
        String cbu,
        Status status,
        UUID userId
) {
}
