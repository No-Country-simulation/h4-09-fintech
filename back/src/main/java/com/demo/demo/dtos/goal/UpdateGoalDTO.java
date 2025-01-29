package com.demo.demo.dtos.goal;

import java.util.Date;
import java.util.UUID;

public record UpdateGoalDTO(
        UUID goalId,
        String name,
        Date targetDate,
        float targetAmount
) {
}
