package com.demo.demo.services.impl;

import com.demo.demo.dtos.response.CedearResponseDto;
import com.demo.demo.enums.Cedear;
import com.demo.demo.models.ActionResponse;
import com.demo.demo.models.CedearApiResponse;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

@Service
public class ActionsService {

    private final RestTemplate restTemplate ;
    private final ObjectMapper objectMapper;

    public ActionsService(ObjectMapper objectMapper) {
        this.restTemplate = new RestTemplate();
        this.objectMapper = objectMapper;
    }

    public List<ActionResponse> getAllActions() {
        String url = "https://analisistecnico.com.ar/services/datafeed/search?limit=30&query=&type=stock&exchange=BCBA";
        String response = restTemplate.getForObject(url, String.class);
        if (response != null) {
            try{
                List<ActionResponse> actions = objectMapper.readValue(response, objectMapper.getTypeFactory().constructCollectionType(List.class, ActionResponse.class));
                return actions;
            } catch (Exception e) {
                return null;
            }
        }
        return null;
    }

    public CedearResponseDto getActionData(String action) {
        String urlBase = "https://analisistecnico.com.ar/services/datafeed/history?symbol=%s&resolution=D&from=%d&to=%d";
        ZoneId argentinaZone = ZoneId.of("America/Argentina/Buenos_Aires");

        Instant now = Instant.now();
        long unixToday = now.getEpochSecond();

        Instant oneYearAgo = now.minus(Duration.ofDays(365));
        long unixOneYearAgo = oneYearAgo.getEpochSecond();

        LocalDate firstDayOfMonth = LocalDate.now(argentinaZone).withDayOfMonth(1);
        long unixFirstDayOfMonth = firstDayOfMonth.atStartOfDay(argentinaZone).toEpochSecond();

        String urlOneYearAgo = String.format(urlBase, action, unixOneYearAgo, unixToday);
        String urlUnixFirstDayOfMonth = String.format(urlBase, action, unixFirstDayOfMonth, unixToday);

       try {
           String responseMonth = restTemplate.getForObject(urlUnixFirstDayOfMonth, String.class);
           String responseYear = restTemplate.getForObject(urlOneYearAgo, String.class);
           CedearApiResponse cedearMonthResponseDto = objectMapper.readValue(responseMonth, new TypeReference<CedearApiResponse>() {
           });
           CedearApiResponse cedearYearResponseDto = objectMapper.readValue(responseYear, new TypeReference<CedearApiResponse>() {
           });
           BigDecimal firstYear = cedearYearResponseDto.getC().getFirst();
           BigDecimal lastYear = cedearYearResponseDto.getC().getLast();
           BigDecimal percentYear = lastYear.subtract(firstYear)
                   .divide(firstYear, 2, RoundingMode.HALF_UP)
                   .multiply(BigDecimal.valueOf(100));


           BigDecimal firstMonth = cedearMonthResponseDto.getC().getFirst();
           BigDecimal lastMonth = cedearMonthResponseDto.getC().getLast();
           BigDecimal percentMonth = lastMonth.subtract(firstMonth)
                   .divide(firstMonth, 2, RoundingMode.HALF_UP)
                   .multiply(BigDecimal.valueOf(100));

           return new CedearResponseDto(lastMonth, action,null , percentMonth, percentYear);
       }catch (Exception e) {
           return null;
       }
    }
}
