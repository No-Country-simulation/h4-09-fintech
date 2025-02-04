package com.demo.demo.services.impl;

import com.demo.demo.dtos.response.CedearResponseDto;

import com.demo.demo.dtos.response.FinancialResponseDto;
import com.demo.demo.models.FundProduct;
import com.demo.demo.models.FundsResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.util.List;

@Service
@Slf4j
public class InvestmentFundService {

    private ObjectMapper objectMapper;
    private RestTemplate restTemplate;

    public InvestmentFundService(ObjectMapper objectMapper) {
        this.restTemplate = new RestTemplate();
        this.objectMapper = objectMapper;
    }

    public List<CedearResponseDto> getAllFunds(int page) throws JsonProcessingException {
        Instant now = Instant.now();
        long unixToday = now.getEpochSecond();
        String url = String.format("https://www.fondosonline.com/Operations/Funds/GetFundsProducts?_ts=%d&sortColumn=YearPercent&isAscending=false&PageSize=15&searchFundName=&searchCurrency=-1&searchFocus=-1&searchStrategy=&warning=true&searchHorizon=-1&searchProfile=-1&isActive=false&searchMinInvestment=&page=%d", unixToday, page);
        String jsonResponse = restTemplate.getForObject(url, String.class);
        FundsResponse fundsResponse = objectMapper.readValue(jsonResponse, FundsResponse.class);
        List<FundProduct> records = fundsResponse.getRecords();
        List<CedearResponseDto> cedearResponseDtos = records.stream().map(f -> new CedearResponseDto(f.getLastPrice(),f.getFamilyName(),f.getFundName(),f.getMonthPercent(),f.getYearPercent())).toList();
        return cedearResponseDtos;
    }

    public List<FinancialResponseDto> getAllFinancials() {
       try {
           return this.getAllFunds(1).stream().map(c -> new FinancialResponseDto(c.price(),c.name(),c.cedear(),c.percentageLastMonth(),c.percentageLastYear(),"fondo-inversion")).toList();

       }catch (JsonProcessingException e) {
           log.info("Get All Financials {}", e.getMessage());
           return null;
       }
    }
}
