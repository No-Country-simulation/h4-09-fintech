package com.demo.demo.repositories;

import com.demo.demo.entities.RetiroEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;



public interface RetiroRepository extends JpaRepository<RetiroEntity,UUID> {
}
