package com.demo.demo.repositories;

import com.demo.demo.entities.StockTransaction;
import com.demo.demo.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StockTransactionRepository extends JpaRepository<StockTransaction, Long> {
    List<StockTransaction> findByUser(UserEntity user);

    Optional<StockTransaction> findById(Long id);

}


