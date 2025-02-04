package com.demo.demo.enums;

public enum Bono implements IFinancialAsset {
    AA37("AA37", "Bonar 2037"),
    AA37D("AA37D", "Bonar 2037 en dólares"),
    AE38("AE38", "Bono Argentina Usd Step Up 2038"),
    AE38C("AE38C", "Bono Argentina Usd Step Up 2038"),
    AE38D("AE38D", "Bono Argentina Usd Step Up 2038"),
    AL29("AL29", "Bono Rep Argentina Usd 1% 2029"),
    AL29C("AL29C", "Bono Rep Argentina Usd 1% 2029"),
    AL29D("AL29D", "Bono Rep Argentina Usd 1% 2029"),
    AL30("AL30", "Bono Argentina Usd Step Up 2030"),
    AL30C("AL30C", "Bono Argentina Usd Step Up 2030"),
    AL30D("AL30D", "Bono Argentina Usd Step Up 2030"),
    AL35("AL35", "Bono Argentina Usd Step Up 2035"),
    AL35C("AL35C", "Bono Argentina Usd Step Up 2035"),
    AL35D("AL35D", "Bono Argentina Usd Step Up 2035"),
    AL41("AL41", "Bono Argentina Usd Step Up 2041"),
    AL41C("AL41C", "Bono Argentina Usd Step Up 2041"),
    AL41D("AL41D", "Bono Argentina Usd Step Up 2041"),
    AO20("AO20", "Bonar 2020"),
    AO20D("AO20D", "Bonar 2020 USD"),
    AY24("AY24", "Bonar 2024");

    private final String symbol;
    private final String description;

    Bono(String symbol, String description) {
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