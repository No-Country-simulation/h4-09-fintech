package com.demo.demo.dtos.recover;


import jakarta.validation.constraints.Email;

public record EmailResetPasswordDTO(
        @Email(message = "Correo electrónico inválido ingresado")
        String email
) {
}
