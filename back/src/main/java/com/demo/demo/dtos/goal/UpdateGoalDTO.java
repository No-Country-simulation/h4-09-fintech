package com.demo.demo.dtos.goal;

import java.time.LocalDateTime;
import java.util.UUID;

public record UpdateGoalDTO(
        UUID goalId,
        String name,
        LocalDateTime targetDate,
        float targetAmount
) {
}
