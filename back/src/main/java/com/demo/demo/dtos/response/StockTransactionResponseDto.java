package com.demo.demo.dtos.response;

import java.time.LocalDateTime;

public record StockTransactionResponseDto(
        String stockSymbol,
        String stockName,
        int quantity,
        float pricePerUnit,
        float totalCost,
        LocalDateTime transactionDate
) {}
