package com.demo.demo.services.impl;

import com.demo.demo.dtos.response.CedearResponseDto;

import com.demo.demo.enums.Cedear;
import com.demo.demo.models.CedearApiResponse;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Service
//@RequiredArgsConstructor
public class CedearsService {


    private final  RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public CedearsService (ObjectMapper objectMapper) {
        this.restTemplate = new RestTemplate();
        this.objectMapper = objectMapper;
    }
    public CedearResponseDto getCedear(String cedear) {
        String cedearMod = cedear+":CEDEAR";
        ZoneId argentinaZone = ZoneId.of("America/Argentina/Buenos_Aires");

        // Hoy
        Instant now = Instant.now();
        long unixToday = now.getEpochSecond();

        Instant oneYearAgo = now.minus(Duration.ofDays(365));
        long unixOneYearAgo = oneYearAgo.getEpochSecond();

        LocalDate firstDayOfMonth = LocalDate.now(argentinaZone).withDayOfMonth(1);
        long unixFirstDayOfMonth = firstDayOfMonth.atStartOfDay(argentinaZone).toEpochSecond();


        LocalDateTime todayAt11AM = LocalDateTime.now(argentinaZone).withHour(11).withMinute(0).withSecond(0).withNano(0);
        long unixToday11AM = todayAt11AM.atZone(argentinaZone).toEpochSecond();

        String urlOneYearAgo = String.format("https://analisistecnico.com.ar/services/datafeed/history?symbol=%s&resolution=D&from=%d&to=%d", cedearMod, unixOneYearAgo, unixToday);
        String urlUnixFirstDayOfMonth = String.format("https://analisistecnico.com.ar/services/datafeed/history?symbol=%s&resolution=D&from=%d&to=%d", cedearMod, unixFirstDayOfMonth, unixToday);

        String url = String.format("https://analisistecnico.com.ar/services/datafeed/history?symbol=%s&resolution=D&from=%d&to=%d", cedearMod, unixToday11AM, unixToday);

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

            return new CedearResponseDto(lastMonth, cedear, Cedear.getNameFromCode(cedear), percentMonth, percentYear);
        } catch (Exception e) {
            return null;
        }

    }

//    public List<CedearResponseDto> getAllCedears() {
//        List Cedears = Arrays.stream(Cedear.values())
////                .collect(Collectors.toMap(Enum::name, Cedear::getName));
//
//        List<CedearResponseDto> cedears = Cedears.entrySet().stream().map(entry -> {
//            String cedear = entry.getKey();
//        return null;
//    }
}




//        // Realizar las peticiones en paralelo
//        CompletableFuture<String> requestOneYearAgo = httpRequestService.makeRequest(urlOneYearAgo);
//        CompletableFuture<String> requestFirstDayOfMonth = httpRequestService.makeRequest(urlUnixFirstDayOfMonth);
//        CompletableFuture<String> requestToday11AM = httpRequestService.makeRequest(url);
//
//
//        // Esperar a que todas las peticiones terminen
//        CompletableFuture.allOf(requestOneYearAgo, requestFirstDayOfMonth, requestToday11AM).join();
//        // Obtener los resultados
//        System.out.println("Response for 1 year ago: " + requestOneYearAgo.get());
//        System.out.println("Response for first day of month: " + requestFirstDayOfMonth.get());
//        System.out.println("Response for today at 11 AM: " + requestToday11AM.get());
//        CedearApiResponse response = restTemplate.getForObject(urlUnixFirstDayOfMonth, CedearApiResponse.class);