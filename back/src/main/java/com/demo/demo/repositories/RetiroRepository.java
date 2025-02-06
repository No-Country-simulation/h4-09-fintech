package com.demo.demo.repositories;

import com.demo.demo.entities.RetiroEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;


@Repository
public interface RetiroRepository extends JpaRepository<RetiroEntity,UUID> {
}
