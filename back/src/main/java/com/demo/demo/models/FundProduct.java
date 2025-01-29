package com.demo.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@Setter
public class FundProduct {

    @JsonProperty("familyName")
    private String familyName;

    @JsonProperty("fundName")
    private String fundName;

    @JsonProperty("lastPrice")
    private BigDecimal lastPrice;

    @JsonProperty("monthPercent")
    private BigDecimal monthPercent;

    @JsonProperty("yearPercent")
    private BigDecimal yearPercent;

    @JsonProperty("fundCurrency")
    private String fundCurrency;
    @JsonProperty("fundStrategy")
    private String fundStrategy;
    @JsonProperty("fundHorizon")
    private String fundHorizon;
    @JsonProperty("fundProfile")
    private String fundProfile;




    // Constructor vacío para Jackson
    public FundProduct() {}

}
