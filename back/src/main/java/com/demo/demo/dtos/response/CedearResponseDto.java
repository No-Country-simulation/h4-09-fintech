package com.demo.demo.dtos.response;

import java.math.BigDecimal;

public record CedearResponseDto(
        BigDecimal price,
        String cedear,
        String name,
        BigDecimal percentageLastMonth,
        BigDecimal percentageLastYear
) {
}
