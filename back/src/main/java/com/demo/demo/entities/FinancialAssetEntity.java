package com.demo.demo.entities;


import com.demo.demo.dtos.response.FinancialResponseDto;
import com.google.api.client.util.DateTime;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "financial_assets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FinancialAssetEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private BigDecimal price;
    private BigDecimal percentageLastMonth;
    private BigDecimal percentageLastYear;
    private String typeAsset;
    private LocalDateTime lastUpdate;
    private BigDecimal openingBalance;

    @ManyToMany(mappedBy = "financialAssets")
    private List<UserEntity> users;

    public static FinancialAssetEntity mapper (FinancialResponseDto dto) {
        FinancialAssetEntity financialAssetEntity = new FinancialAssetEntity();
        financialAssetEntity.setTypeAsset(dto.typeAsset());
        financialAssetEntity.setDescription(dto.description());
        financialAssetEntity.setPrice(dto.price());
        financialAssetEntity.setPercentageLastMonth(dto.percentageLastMonth());
        financialAssetEntity.setPercentageLastYear(dto.percentageLastYear());
        financialAssetEntity.setName(dto.symbol());
        return financialAssetEntity;
    }
}
