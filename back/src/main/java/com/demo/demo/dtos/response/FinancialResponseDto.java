package com.demo.demo.dtos.response;

import java.math.BigDecimal;

public record FinancialResponseDto(
        BigDecimal price,
        String symbol,
        String description,
        BigDecimal percentageLastMonth,
        BigDecimal percentageLastYear,
        String typeAsset
) {
}
