package com.demo.demo.controllers;


import com.demo.demo.dtos.response.CedearResponseDto;
import com.demo.demo.enums.Cedear;
import com.demo.demo.models.ActionResponse;
import com.demo.demo.models.FundProduct;
import com.demo.demo.services.impl.ActionsService;
import com.demo.demo.services.impl.CedearsService;
import com.demo.demo.services.impl.InvestmentFundService;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/market")
@RequiredArgsConstructor
public class MarketController {

    private final CedearsService cedearsService;
    private final InvestmentFundService investmentFundService;
    private final ActionsService actionsService;

    @GetMapping("/cedears")
    public ResponseEntity<List<ActionResponse>> getAllCedearNames() {
//        return ResponseEntity.ok(Arrays.stream(Cedear.values())
//                .collect(Collectors.toMap(Enum::name, Cedear::getName)));
        return ResponseEntity.ok(cedearsService.getAllCedears());
    }

    @GetMapping("/{cedear}")
    public ResponseEntity<CedearResponseDto> getCedearName(
            @PathVariable
            @NotNull(message = "Cedear is required")
            String cedear) throws ExecutionException, InterruptedException {
        return ResponseEntity.ok(cedearsService.getCedear(cedear));
    }

    @GetMapping("/investment-funds")
    public ResponseEntity<List<CedearResponseDto>> getAllFunds(@RequestParam(defaultValue = "1") int page) throws JsonProcessingException {
        ;
        return ResponseEntity.ok(investmentFundService.getAllFunds(page));
    }


    @GetMapping("/actions")
    public ResponseEntity<List<ActionResponse>> getAllActions() {
        return ResponseEntity.ok(actionsService.getAllActions());
    }

    @GetMapping("/actions/{action}")
    public ResponseEntity<CedearResponseDto> getActionData(
            @PathVariable
            @NotNull(message = "Action is required")
            String action) {
        return ResponseEntity.ok(actionsService.getActionData(action));
    }
}
