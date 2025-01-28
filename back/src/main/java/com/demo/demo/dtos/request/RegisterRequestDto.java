package com.demo.demo.dtos.request;
import com.demo.demo.entities.RoleEntity;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequestDto {
    @Email(message = "Correo electrónico inválido ingresado")
    @NotBlank(message = "El correo electrónico es obligatorio.")
    private String email;

    @NotBlank(message = "El nombre es obligatorio")
    @Min(value = 3,message = "El nombre ingresado debe tener al menos 3 caracteres.")
    private String name;

    @NotBlank(message = "El apellido es obligatorio")
    @Min(value = 3,message = "El apellido ingresado debe tener al menos 3 caracteres.")
    private String lastName;

    @NotBlank(message = "La contraseña no puede estar vacía.")
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
            message = "La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial."
    )
    private String password;

    private String profileImageUrl;


    private Set<RoleEntity> roles = new HashSet<>();
}
