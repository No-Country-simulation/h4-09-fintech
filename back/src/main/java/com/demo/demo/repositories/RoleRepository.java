package com.demo.demo.repositories;

import com.demo.demo.entities.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface RoleRepository extends JpaRepository<RoleEntity, UUID> {
    @Query(value = "SELECT r from  RoleEntity r where r.roleName = :name")
    Optional<RoleEntity> findRoleByName(@Param("name") String name);
}
