package com.demo.demo.dtos.notification;

public record NotificationResponseDTO(
        Long id,
        String title,
        String message,
        boolean isRead,
        String createdAt,
        String type
) {
}
