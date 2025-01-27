package com.demo.demo.controllers;

import com.demo.demo.dtos.response.CedearResponseDto;
import com.demo.demo.models.FundProduct;
import com.demo.demo.services.impl.InvestmentFundService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/investment-funds")
@RequiredArgsConstructor
public class InvestmentFundsController {

    private final InvestmentFundService investmentFundService;

    @GetMapping
    public ResponseEntity<List<CedearResponseDto>> getAllFunds(@RequestParam(defaultValue = "1") int page) throws JsonProcessingException {
        ;
        return ResponseEntity.ok(investmentFundService.getAllFunds(page));
    }
}
