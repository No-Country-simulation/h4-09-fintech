package com.demo.demo.enums;

public enum MainGoal {
    RETIRO("Retiro"),
    COMPRAR_CASA("Comprar una casa"),
    COMPRAR_AUTO("Comprar un auto"),
    VIAJE("Viaje"),
    OTRO("Otro");

    private final String descripcion;

    // Constructor del enum
    MainGoal(String descripcion) {
        this.descripcion = descripcion;
    }

    // Método para obtener la descripción del objetivo
    public String getDescripcion() {
        return descripcion;
    }
}