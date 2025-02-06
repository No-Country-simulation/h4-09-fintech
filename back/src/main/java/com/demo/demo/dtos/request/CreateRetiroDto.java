package com.demo.demo.dtos.request;

import java.math.BigDecimal;

public record CreateRetiroDto(
        float monto,
        String cbu
) {
}
