package com.demo.demo.dtos.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public record BuyStockRequestDto(
        @NotBlank(message = "Stock symbol is required") String stockSymbol,
        @NotBlank(message = "Stock name is required") String stockName,
        @Positive(message = "Quantity must be greater than 0") int quantity,
        @Positive(message = "Price per unit must be greater than 0") float pricePerUnit
) {}
