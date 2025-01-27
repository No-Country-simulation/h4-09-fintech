package com.demo.demo.controllers;


import com.demo.demo.dtos.response.CedearResponseDto;
import com.demo.demo.enums.Cedear;
import com.demo.demo.models.ActionResponse;
import com.demo.demo.models.FundProduct;
import com.demo.demo.services.impl.*;
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

    private final InvestmentFundService investmentFundService;
    private final MarketService marketService;
    @GetMapping("/cedears")
    public ResponseEntity<List<ActionResponse>> getAllCedearNames() {
        return ResponseEntity.ok(marketService.getAll("cedears"));
    }

    @GetMapping("/cedears/{cedear}")
    public ResponseEntity<CedearResponseDto> getCedearName(
            @PathVariable
            @NotNull(message = "Cedear is required")
            String cedear) throws ExecutionException, InterruptedException {
        return ResponseEntity.ok(marketService.getData(cedear));
    }

    @GetMapping("/investment-funds")
    public ResponseEntity<List<CedearResponseDto>> getAllFunds(@RequestParam(defaultValue = "1") int page) throws JsonProcessingException {
        ;
        return ResponseEntity.ok(investmentFundService.getAllFunds(page));
    }


    @GetMapping("/actions")
    public ResponseEntity<List<ActionResponse>> getAllActions() {
        return ResponseEntity.ok(marketService.getAll("stock"));
    }

    @GetMapping("/actions/{action}")
    public ResponseEntity<CedearResponseDto> getActionData(
            @PathVariable
            @NotNull(message = "Action is required")
            String action) {
        return ResponseEntity.ok(marketService.getData(action));
    }


    @GetMapping("/bonds")
    public ResponseEntity<List<ActionResponse>> getAllBonds() {
        return ResponseEntity.ok(marketService.getAll("bond"));
    }

    @GetMapping("/bonds/{bond}")
    public ResponseEntity<CedearResponseDto> getBondData(
            @PathVariable
            @NotNull(message = "Bond is required")
            String bond) {
        return ResponseEntity.ok(marketService.getData(bond));
    }
}
