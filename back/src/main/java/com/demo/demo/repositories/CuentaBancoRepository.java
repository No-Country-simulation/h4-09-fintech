package com.demo.demo.repositories;

import com.demo.demo.entities.CuentaBancoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CuentaBancoRepository extends JpaRepository<CuentaBancoEntity, UUID> {
}
