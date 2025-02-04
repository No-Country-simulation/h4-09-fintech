package com.demo.demo.dtos.response;

import java.time.LocalDateTime;

public record StockTransactionResponseDto(

        String stockSymbol,
        String stockName,
        int quantity,
        float pricePerUnitBuy,
        float totalCostBuy,
        float pricePorUnitNow,
        float totalCostNow,
        LocalDateTime transactionDate,
        Long id
) {}
