package com.demo.demo.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "users") // Define el nombre de la tabla en la base de datos
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false) // El nombre de usuario debe ser único y no nulo
    private String username;

    @Column(nullable = false) // La contraseña no debe ser nula
    private String password;

    // Getters y setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
