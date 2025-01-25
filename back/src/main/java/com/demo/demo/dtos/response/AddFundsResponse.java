package com.demo.demo.dtos.response;

import com.demo.demo.dtos.notification.NotificationResponseDTO;

import java.util.List;

public record AddFundsResponse(
        float funds,
        List<NotificationResponseDTO> notifications
) {
}
