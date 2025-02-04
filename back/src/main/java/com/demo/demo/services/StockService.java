package com.demo.demo.services;

import com.demo.demo.dtos.response.StockTransactionResponseDto;
import com.demo.demo.entities.FinancialAssetEntity;
import com.demo.demo.entities.StockTransaction;
import com.demo.demo.entities.UserEntity;
import com.demo.demo.exceptions.NotFoundException;
import com.demo.demo.repositories.FinancialAssetRepository;
import com.demo.demo.repositories.StockTransactionRepository;
import com.demo.demo.repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StockService {
    private final UserRepository userRepository;
    private final StockTransactionRepository stockTransactionRepository;
    private final FinancialAssetRepository financialAssetRepository;

    public String buyStock(String username, int quantity, Long idSymbol) {
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("User not found"));
        FinancialAssetEntity stockSymbol = financialAssetRepository.findById(idSymbol)
                .orElseThrow(() -> new NotFoundException("Stock not found"));

        float totalCost = stockSymbol.getPrice().floatValue() * quantity;
        float pricePerUnit = stockSymbol.getPrice().floatValue();

        if (user.getFunds() < totalCost) {
            throw new IllegalArgumentException("Insufficient funds to buy the stock.");
        }

        // Deduce funds
        user.setFunds(user.getFunds() - totalCost);

        // Save transaction
        StockTransaction transaction = new StockTransaction();
        transaction.setUser(user);
        transaction.setIdSymbol(idSymbol);
        transaction.setQuantity(quantity);
        transaction.setPriceBuy(pricePerUnit);
        transaction.setTotalCostBuy(totalCost);
        transaction.setTransactionDate(LocalDateTime.now());
        transaction.setId(transaction.getId());

        stockTransactionRepository.save(transaction);
        userRepository.save(user);
        user.getFinancialAssets().add(stockSymbol);

        return "Stock purchased successfully!";
    }

    public List<StockTransactionResponseDto> getUserTransactions(String username) {
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("User not found"));

        return stockTransactionRepository.findByUser(user).stream()
                .map(transaction -> new StockTransactionResponseDto(
                        user.getFinancialAssets().stream().filter(fa -> fa.getId().equals(transaction.getIdSymbol())).findFirst().get().getName(),
                        user.getFinancialAssets().stream().filter(fa -> fa.getId().equals(transaction.getIdSymbol())).findFirst().get().getDescription(),
                        transaction.getQuantity(),
                        transaction.getPriceBuy(),
                        transaction.getTotalCostBuy(),
                        user.getFinancialAssets().stream().filter(fa -> fa.getId().equals(transaction.getIdSymbol())).findFirst().get().getPrice().floatValue(),
                        transaction.getQuantity() * user.getFinancialAssets().stream().filter(fa -> fa.getId().equals(transaction.getIdSymbol())).findFirst().get().getPrice().floatValue(),
                        transaction.getTransactionDate(),
                        transaction.getId()
                ))
                .toList();
    }

    @Transactional
    public void sellStock(String username, Long transactionId, int sellQuantity) {
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("User not found"));

        StockTransaction transaction = stockTransactionRepository.findById(transactionId)
                .orElseThrow(() -> new NotFoundException("Transaction not found"));

        // Verifica que la transacción pertenece al usuario
        if (!transaction.getUser().getUserId().equals(user.getUserId())) {
            throw new IllegalArgumentException("You do not have permission to modify this transaction.");
        }

        // Verificar que la cantidad a vender no sea mayor a la cantidad disponible
        if (sellQuantity > transaction.getQuantity()) {
            throw new IllegalArgumentException("You cannot sell more than you own.");
        }

        // Restar la cantidad y actualizar el costo total
        int remainingQuantity = transaction.getQuantity() - sellQuantity;

        if (remainingQuantity == 0) {
            // Eliminar la transacción si ya no quedan acciones y quitar la relacion con el simbolo
            stockTransactionRepository.delete(transaction);
            user.getFinancialAssets().removeIf(fa -> fa.getId().equals(transaction.getIdSymbol()));
        } else {
            // Actualizar la transacción
            transaction.setQuantity(remainingQuantity);
            transaction.setTotalCostBuy(transaction.getPriceBuy() * remainingQuantity);
            transaction.setTransactionDate(LocalDateTime.now());
            stockTransactionRepository.save(transaction);
        }
    }
}
