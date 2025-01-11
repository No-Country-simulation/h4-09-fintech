package com.demo.demo.dto.recover_password;


import jakarta.validation.constraints.Email;

public record EmailResetPasswordDTO(
//    @Email(message = "El email no es valido")
    String email
) {
}
