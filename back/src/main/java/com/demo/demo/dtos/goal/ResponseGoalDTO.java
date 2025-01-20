package com.demo.demo.dtos.goal;

import java.util.Date;
import java.util.UUID;

public record ResponseGoalDTO(
    UUID goalId,
    String name,
    Date targetDate,

    int targetAmount,
    int currentAmount
) {
}
