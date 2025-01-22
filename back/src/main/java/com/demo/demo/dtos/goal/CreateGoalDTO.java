package com.demo.demo.dtos.goal;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record CreateGoalDTO(
        @NotBlank(message = "Goal name is required")
        String name,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
        LocalDateTime targetDate,
        @NotNull(message = "Target amount is required")
        float targetAmount
) {
}
