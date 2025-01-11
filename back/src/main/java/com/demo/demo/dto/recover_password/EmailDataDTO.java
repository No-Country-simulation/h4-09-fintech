package com.demo.demo.dto.recover_password;

public record EmailDataDTO(
        String token,
        String name
) {
}
