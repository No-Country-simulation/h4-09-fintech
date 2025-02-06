package com.demo.demo.dtos.recover;

import jakarta.validation.constraints.Pattern;

public record ResetPasswordDTO(
        @Pattern(
                regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
                message = "La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial."
        )
        String password,
        String repeatPassword
) {
}
