package com.demo.demo.dtos.response;

import java.util.UUID;

public record UserAdminResponseDTO(
        UUID id,
        String name,
        String lastName,
        String email,
        String roleName
) {
}
