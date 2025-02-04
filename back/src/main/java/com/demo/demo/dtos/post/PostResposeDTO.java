package com.demo.demo.dtos.post;

import com.demo.demo.dtos.response.UserResponseDTO;

import java.time.LocalDateTime;

public record PostResposeDTO(
        Long id,
        String title,
        String subtitle,
        String text,
        LocalDateTime creationUser,
        LocalDateTime creationDate,
        String category,
        UserResponseDTO userEntity
) {
}
