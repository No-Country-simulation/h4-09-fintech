package com.demo.demo.repositories;

import com.demo.demo.entities.DepositoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface DepositoRepository extends JpaRepository<DepositoEntity,UUID> {
}
