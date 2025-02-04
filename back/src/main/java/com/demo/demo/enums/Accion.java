package com.demo.demo.enums;

public enum Accion implements IFinancialAsset {
    AA("AA", "Alcoa"),
    AAL("AAL", "Amr Corporation"),
    AAP("AAP", "Advance Auto Parts"),
    AAPL("AAPL", "Apple"),
    ABBV("ABBV", "Abbvie Inc."),
    ABEV("ABEV", "Ambev"),
    ABNB("ABNB", "Airbnb Inc"),
    ABT("ABT", "Abbott Laboratories"),
    ACB("ACB", "Aurora Cannabis Inc"),
    ACH("ACH", "Aluminum Of China"),
    ADBE("ADBE", "Adobe Systems"),
    AGRO("AGRO", "Agrometal"),
    AIG("AIG", "American International Group"),
    ALUA("ALUA", "Aluar"),
    AMAT("AMAT", "Applied Materials"),
    AMD("AMD", "Advanced Micro Devices"),
    AMGN("AMGN", "Amgen"),
    AMX("AMX", "America Movil"),
    AMZN("AMZN", "Amazon"),
    ARCO("ARCO", "Arcos Dorados Holdings");

    private final String symbol;
    private final String description;

    Accion(String symbol, String description) {
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
