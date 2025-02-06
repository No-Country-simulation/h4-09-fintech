package com.demo.demo.repositories;

import com.demo.demo.entities.DepositoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface DepositoRepository extends JpaRepository<DepositoEntity,UUID> {
}
