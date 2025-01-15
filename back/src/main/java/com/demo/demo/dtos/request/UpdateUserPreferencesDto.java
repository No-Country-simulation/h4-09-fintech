package com.demo.demo.dtos.request;

import com.demo.demo.enums.FinancialKnowledge;
import com.demo.demo.enums.MainGoal;
import com.demo.demo.enums.RiskPreference;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateUserPreferencesDto {
    @NotNull(message = "El objetivo principal no puede ser nulo.")
    private String mainGoal;

    @NotNull(message = "El conocimiento financiero no puede ser nulo.")
    private String financialKnowledge;

    @NotNull(message = "La preferencia de riesgo no puede ser nula.")
    private String riskPreference;
}