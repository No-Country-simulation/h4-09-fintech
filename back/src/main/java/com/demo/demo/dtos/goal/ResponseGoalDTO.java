package com.demo.demo.dtos.goal;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

public record ResponseGoalDTO(
    UUID goalId,
    String name,

    LocalDateTime startDate,
    LocalDateTime targetDate,

    float targetAmount,
    float currentAmount,
    float progress,

    boolean isCompleted
) {
}
