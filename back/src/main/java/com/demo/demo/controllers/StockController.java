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
import java.util.Map;

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

    @PatchMapping("/transactions/{transactionId}")
    public ResponseEntity<String> sellStock(
            @CurrentUser UserEntity currentUser,
            @PathVariable Long transactionId,
            @RequestBody Map<String, Integer> request) {

        if (!request.containsKey("quantity")) {
            return ResponseEntity.badRequest().body("Missing 'quantity' field");
        }

        int sellQuantity = request.get("quantity");
        stockService.sellStock(currentUser.getUsername(), transactionId, sellQuantity);

        return ResponseEntity.ok("Stock transaction updated successfully");
    }

}
