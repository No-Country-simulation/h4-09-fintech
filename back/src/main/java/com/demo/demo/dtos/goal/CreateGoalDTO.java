package com.demo.demo.dtos.goal;

import java.util.Date;

public record CreateGoalDTO(
    String name,
    Date targetDate,
    long targetAmount
) {
}
