package com.demo.demo.dtos.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record BuyStockRequestDto(
    @NotNull(message = "id symbol is required") Long idSymbol,
        @Positive(message = "Quantity must be greater than 0") int quantity) {}
