package com.demo.demo.controllers;

import com.demo.demo.enums.FinancialKnowledge;
import com.demo.demo.enums.MainGoal;
import com.demo.demo.enums.RiskPreference;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@RestController
public class EnumsController {

    @GetMapping("/api/enums")
    public ResponseEntity<Map<String, Object>> getEnums() {
        Map<String, Object> enums = new HashMap<>();

        enums.put("financialKnowledge", Arrays.asList(FinancialKnowledge.values()));
        enums.put("mainGoal", Arrays.asList(MainGoal.values()));
        enums.put("riskPreference", Arrays.asList(RiskPreference.values()));
        return ResponseEntity.ok(enums);
    }
}
