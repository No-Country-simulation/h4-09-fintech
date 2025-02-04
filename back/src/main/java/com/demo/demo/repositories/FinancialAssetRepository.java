package com.demo.demo.repositories;

import com.demo.demo.entities.FinancialAssetEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface FinancialAssetRepository extends JpaRepository<FinancialAssetEntity,Long> {
    List<FinancialAssetEntity> findByTypeAsset(String typeAsset);
    List<FinancialAssetEntity> findAllByNameIn(List<String> names);
}
