package com.demo.demo.dtos.goal;

import java.util.Date;
import java.util.UUID;

public record ResponseGoalDTO(
    UUID goalId,
    String name,

    Date startDate,
    Date targetDate,

    long targetAmount,
    long currentAmount
) {
}
