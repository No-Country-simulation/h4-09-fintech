package com.demo.demo.dtos.recover_password;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record ResetPasswordDTO(
//        @NotEmpty
//        String token,//deberia pasarse por header
        String password,
        String repeatPassword
) {
}
