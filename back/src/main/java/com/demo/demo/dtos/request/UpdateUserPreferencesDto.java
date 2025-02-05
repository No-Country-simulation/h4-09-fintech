package com.demo.demo.dtos.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateUserPreferencesDto {
    //@NotNull(message = "El objetivo principal no puede ser nulo.")
    private String mainGoal;

    //@NotNull(message = "El conocimiento financiero no puede ser nulo.")
    private String financialKnowledge;

    //@NotNull(message = "La preferencia de riesgo no puede ser nula.")
    private String riskPreference;

    //@NotNull(message = "onbarding")
    private boolean onboardingComplete;


}