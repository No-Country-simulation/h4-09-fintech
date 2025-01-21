package com.demo.demo.enums;

import lombok.Getter;


public enum Cedear {
    AAL("American Airlines"),
    AAP("Advance Auto Parts"),
    AAPL("Apple"),
    ABBV("Abbvie Inc."),
    ABEV("Ambev"),
    ABNB("Airbnb"),
    ABT("Abbott Laboratories"),
    ACN("Accenture"),
    ADBE("Adobe System"),
    ADGO("Adecoagro"),
    ADI("Analog Devices"),
    AIG("American International Group"),
    AMAT("Applied Materials"),
    AMD("Advanced Micro Devices"),
    AMGN("Amgen"),
    AMX("America Movil"),
    AMZN("Amazon"),
    ARCO("Arcos Dorados Holdings"),
    ARKK("ARK Innovation ETF"),
    AUY("Yamana Gold");

    private final String name;

    Cedear(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public static String getNameFromCode(String code) {
        for (Cedear cedear : Cedear.values()) {
            if (cedear.name().equals(code)) {
                return cedear.getName();
            }
        }
        return null;
    }
}

