package com.demo.demo.repositories;

import com.demo.demo.entities.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;
@Repository
public interface RoleRepository extends JpaRepository<RoleEntity, UUID> {
    @Query(value = "SELECT r from  RoleEntity r where r.roleName = :name")
    Optional<RoleEntity> findRoleByName(@Param("name") String name);
}
