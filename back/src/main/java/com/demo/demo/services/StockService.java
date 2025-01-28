package com.demo.demo.services;

import com.demo.demo.dtos.response.StockTransactionResponseDto;
import com.demo.demo.entities.StockTransaction;
import com.demo.demo.entities.UserEntity;
import com.demo.demo.exceptions.NotFoundException;
import com.demo.demo.repositories.StockTransactionRepository;
import com.demo.demo.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StockService {
    private final UserRepository userRepository;
    private final StockTransactionRepository stockTransactionRepository;

    public String buyStock(String username, String stockSymbol, String stockName, int quantity, float pricePerUnit) {
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("User not found"));

        float totalCost = pricePerUnit * quantity;

        if (user.getFunds() < totalCost) {
            throw new IllegalArgumentException("Insufficient funds to buy the stock.");
        }

        // Deduce funds
        user.setFunds(user.getFunds() - totalCost);

        // Save transaction
        StockTransaction transaction = new StockTransaction();
        transaction.setUser(user);
        transaction.setStockSymbol(stockSymbol);
        transaction.setStockName(stockName);
        transaction.setQuantity(quantity);
        transaction.setPricePerUnit(pricePerUnit);
        transaction.setTotalCost(totalCost);
        transaction.setTransactionDate(LocalDateTime.now());

        stockTransactionRepository.save(transaction);
        userRepository.save(user);

        return "Stock purchased successfully!";
    }

    public List<StockTransactionResponseDto> getUserTransactions(String username) {
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("User not found"));

        return stockTransactionRepository.findByUser(user).stream()
                .map(transaction -> new StockTransactionResponseDto(
                        transaction.getStockSymbol(),
                        transaction.getStockName(),
                        transaction.getQuantity(),
                        transaction.getPricePerUnit(),
                        transaction.getTotalCost(),
                        transaction.getTransactionDate()
                ))
                .toList();
    }
}
