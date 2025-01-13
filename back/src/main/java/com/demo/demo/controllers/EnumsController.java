package com.demo.demo.controllers;

import com.demo.demo.config.security.CurrentUser;
import com.demo.demo.dtos.request.UpdateUserPreferencesDto;
import com.demo.demo.dtos.response.UserPreferencesResponseDto;
import com.demo.demo.entities.UserEntity;
import com.demo.demo.enums.FinancialKnowledge;
import com.demo.demo.enums.MainGoal;
import com.demo.demo.enums.RiskPreference;
import com.demo.demo.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class EnumsController {

    private final UserService userService;

    /*@GetMapping("/api/enums")
    public ResponseEntity<Map<String, Object>> getEnums() {
        Map<String, Object> enums = new HashMap<>();

        enums.put("financialKnowledge", Arrays.asList(FinancialKnowledge.values()));
        enums.put("mainGoal", Arrays.stream(MainGoal.values())
                .map(MainGoal::getDescripcion)
                .collect(Collectors.toList()));
        enums.put("riskPreference", Arrays.asList(RiskPreference.values()));
        return ResponseEntity.ok(enums);
    }*/

    @PatchMapping("/preferences")
    public ResponseEntity<UserPreferencesResponseDto> updatePreferences(
            @CurrentUser UserEntity currentUser,
            @RequestBody @Valid UpdateUserPreferencesDto dto) {
        UserPreferencesResponseDto updatedUser = userService.updateUserPreferences(currentUser.getUsername(), dto);
        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping("/preferences")
    public ResponseEntity<UserPreferencesResponseDto> getUserPreferences(@CurrentUser UserEntity currentUser) {
        UserPreferencesResponseDto userPreferences = userService.getUserPreferences(currentUser.getUsername());
        return ResponseEntity.ok(userPreferences);
    }
}
