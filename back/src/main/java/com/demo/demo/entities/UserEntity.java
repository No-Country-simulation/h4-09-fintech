package com.demo.demo.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
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

    @Column(unique = true, nullable = false)
    private String email;

}
