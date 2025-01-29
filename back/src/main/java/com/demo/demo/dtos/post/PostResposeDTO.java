package com.demo.demo.dtos.post;

import java.time.LocalDateTime;

public record PostRespoceDTO(
        Long id,
        String title,
        String subtitle,
        String text,
        LocalDateTime creationUser,
        LocalDateTime creationDate,
        String category
) {
}
