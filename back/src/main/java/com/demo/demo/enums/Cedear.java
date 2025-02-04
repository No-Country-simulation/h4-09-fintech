package com.demo.demo.enums;

import lombok.Getter;


public enum Cedear implements IFinancialAsset {
    AAL_CEDEAR("AAL:CEDEAR", "American Airlines"),
    AAP_CEDEAR("AAP:CEDEAR", "Advance Auto Parts"),
    AAPL_CEDEAR("AAPL:CEDEAR", "Apple"),
    ABBV_CEDEAR("ABBV:CEDEAR", "Abbvie Inc."),
    ABEV_CEDEAR("ABEV:CEDEAR", "Ambev"),
    ABNB_CEDEAR("ABNB:CEDEAR", "Airbnb"),
    ABT_CEDEAR("ABT:CEDEAR", "Abbott Laboratories"),
    ACN_CEDEAR("ACN:CEDEAR", "Accenture"),
    ADBE_CEDEAR("ADBE:CEDEAR", "Adobe Systems"),
    ADGO_CEDEAR("ADGO:CEDEAR", "Adecoagro"),
    ADI_CEDEAR("ADI:CEDEAR", "Analog Devices"),
    AIG_CEDEAR("AIG:CEDEAR", "American International Group"),
    AMAT_CEDEAR("AMAT:CEDEAR", "Applied Materials"),
    AMD_CEDEAR("AMD:CEDEAR", "Advanced Micro Devices"),
    AMGN_CEDEAR("AMGN:CEDEAR", "Amgen"),
    AMX_CEDEAR("AMX:CEDEAR", "America Movil"),
    AMZN_CEDEAR("AMZN:CEDEAR", "Amazon"),
    ARCO_CEDEAR("ARCO:CEDEAR", "Arcos Dorados Holdings"),
    ARKK_CEDEAR("ARKK:CEDEAR", "ARK Innovation ETF"),
    AUY_CEDEAR("AUY:CEDEAR", "Yamana Gold");

    private final String symbol;
    private final String description;

    Cedear(String symbol, String description) {
        this.symbol = symbol;
        this.description = description;
    }

    public String getSymbol() {
        return symbol;
    }

    public String getDescription() {
        return description;
    }
}

