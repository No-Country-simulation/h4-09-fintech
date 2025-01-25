package com.demo.demo.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
public class UserResponseDTO {
    private UUID userId;
    private String username;
    private String name;
    private String lastName;
    private boolean onboardingComplete;
    private String mainGoal;
    private String financialKnowledge;
    private String riskPreference;
    private float currentAmount;

    public UserResponseDTO() {}
}
