package com.demo.demo.controllers;

import com.demo.demo.config.security.CurrentUser;
import com.demo.demo.dtos.request.BuyStockRequestDto;
import com.demo.demo.dtos.response.StockTransactionResponseDto;
import com.demo.demo.entities.StockTransaction;
import com.demo.demo.entities.UserEntity;
import com.demo.demo.services.StockService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stocks")
@RequiredArgsConstructor
public class StockController {
    private final StockService stockService;

    @PostMapping("/buy")
    public ResponseEntity<String> buyStock(
            @CurrentUser UserEntity currentUser,
            @RequestBody @Valid BuyStockRequestDto requestDto) {
        String message = stockService.buyStock(
                currentUser.getUsername(),
                requestDto.stockSymbol(),
                requestDto.stockName(),
                requestDto.quantity(),
                requestDto.pricePerUnit()
        );
        return ResponseEntity.ok(message);
    }

    @GetMapping("/transactions")
    public ResponseEntity<List<StockTransactionResponseDto>> getUserTransactions(@CurrentUser UserEntity currentUser) {
        List<StockTransactionResponseDto> transactions = stockService.getUserTransactions(currentUser.getUsername());
        return ResponseEntity.ok(transactions);
    }

    @DeleteMapping("/transactions/{transactionId}")
    public ResponseEntity<String> deleteTransaction(
            @CurrentUser UserEntity currentUser,
            @PathVariable Long transactionId) {
        stockService.deleteTransaction(currentUser.getUsername(), transactionId);
        return ResponseEntity.ok("Stock transaction sold successfully");
    }

}
