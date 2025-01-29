package com.demo.demo.dtos.response;

import com.demo.demo.enums.FinancialKnowledge;
import com.demo.demo.enums.MainGoal;
import com.demo.demo.enums.RiskPreference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserPreferencesResponseDto {
    private String userId;
    private String username;
    private String name;
    private String lastName;
    private String mainGoal;
    private String financialKnowledge;
    private String riskPreference;
    private String profileImageUrl;
}
