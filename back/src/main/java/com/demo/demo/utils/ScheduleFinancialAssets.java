package com.demo.demo.utils;


import com.demo.demo.dtos.response.CedearResponseDto;
import com.demo.demo.dtos.response.FinancialResponseDto;
import com.demo.demo.entities.FinancialAssetEntity;
import com.demo.demo.enums.Accion;
import com.demo.demo.enums.Bono;
import com.demo.demo.enums.Cedear;
import com.demo.demo.enums.IFinancialAsset;
import com.demo.demo.models.CedearApiResponse;
import com.demo.demo.repositories.FinancialAssetRepository;
import com.demo.demo.services.impl.InvestmentFundService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.*;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.logging.Logger;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
@Slf4j
public class ScheduleFinancialAssets {

    private final FinancialAssetRepository financialAssetRepository;
    private final InvestmentFundService investmentFundService;
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper;
    private  Boolean isOpeningBalance = true;
    private final String urlBase = "https://analisistecnico.com.ar/services/datafeed/history?symbol=%s&resolution=D&from=%d&to=%d";
    public ScheduleFinancialAssets(ObjectMapper objectMapper,InvestmentFundService investmentFundService, FinancialAssetRepository financialAssetRepository) {
        this.objectMapper = objectMapper;
        this.financialAssetRepository = financialAssetRepository;
        this.investmentFundService = investmentFundService;
    }

    @Async
    protected CompletableFuture<FinancialResponseDto> fetchFinancialAssets(String urlYear, String urlMonth, String symbol, String name, String typeAsset) {
        String responseMonth = restTemplate.getForObject(urlMonth, String.class);
        String responseYear = restTemplate.getForObject(urlYear, String.class);
     try {
         CedearApiResponse cedearMonthResponseDto = objectMapper.readValue(responseMonth, new TypeReference<CedearApiResponse>() {
         });
         CedearApiResponse cedearYearResponseDto = objectMapper.readValue(responseYear, new TypeReference<CedearApiResponse>() {
         });
        if(cedearMonthResponseDto.getC() != null && cedearYearResponseDto.getC() != null) {
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
            FinancialResponseDto asset = new FinancialResponseDto(lastMonth, symbol, name, percentMonth, percentYear,typeAsset);
            return CompletableFuture.completedFuture(asset);
        }
        return CompletableFuture.completedFuture(null);

     }catch (Exception e){
         log.error("Error en fetchFinancialAssets: {}", e.getMessage(), e);

         return CompletableFuture.completedFuture(null);
     }
    }

    public void getData (Boolean isOpennin) {
        isOpeningBalance = isOpennin;
        ZoneId argentinaZone = ZoneId.of("America/Argentina/Buenos_Aires");
        Instant now = Instant.now();
        long unixToday = now.getEpochSecond();

        Instant oneYearAgo = now.minus(Duration.ofDays(365));
        long unixOneYearAgo = oneYearAgo.getEpochSecond();

        Instant firstDayOfMonth = now.minus(Duration.ofDays(30));
        long unixFirstDayOfMonth =  firstDayOfMonth.getEpochSecond();

       try {
           List<FinancialResponseDto> listFinancialDtoBonos = exectRepeat(Bono.class,"bono",unixToday,unixOneYearAgo,unixFirstDayOfMonth);
           List<FinancialResponseDto> listFinancialDtoCedears = exectRepeat(Cedear.class,"cedear",unixToday,unixOneYearAgo,unixFirstDayOfMonth);
           List<FinancialResponseDto> listFinancialDtoAcciones = exectRepeat(Accion.class,"accion",unixToday,unixOneYearAgo,unixFirstDayOfMonth);
           List<FinancialResponseDto> listFinancialDtoFondos = investmentFundService.getAllFinancials();
           financialAssetRepository.saveAll(searchExistingAssets(listFinancialDtoFondos));
           financialAssetRepository.saveAll(searchExistingAssets(listFinancialDtoBonos));
           financialAssetRepository.saveAll(searchExistingAssets(listFinancialDtoCedears));
           financialAssetRepository.saveAll(searchExistingAssets(listFinancialDtoAcciones));
           String text = "hola mundo";
       }catch (Exception e){
           log.error("Error en get all data: {}", e.getMessage(), e);

       }

    }

    private List<FinancialAssetEntity> searchExistingAssets(List<FinancialResponseDto> listDto) {
        if (listDto.isEmpty()) {
            return Collections.emptyList();
        }
        List<FinancialAssetEntity>existingAssetsBonos = financialAssetRepository.findAllByNameIn(listDto.stream().map(FinancialResponseDto::symbol).collect(Collectors.toList()));
        Map<String, FinancialAssetEntity> existingAssetsMap = existingAssetsBonos.stream()
                .collect(Collectors.toMap(FinancialAssetEntity::getName, entity -> entity));

        return  listDto.stream()
                .map(dto -> updateOrCreateEntity(existingAssetsMap, dto))
                .toList();

    }

    private FinancialAssetEntity updateOrCreateEntity(Map<String, FinancialAssetEntity> existingAssetsMap, FinancialResponseDto dto) {
        FinancialAssetEntity entity = existingAssetsMap.getOrDefault(dto.symbol(), new FinancialAssetEntity());
        entity.setName(dto.symbol());
        entity.setDescription(dto.description());
        entity.setPrice(dto.price());
        entity.setPercentageLastMonth(dto.percentageLastMonth());
        entity.setPercentageLastYear(dto.percentageLastYear());
        entity.setTypeAsset(dto.typeAsset());
        entity.setLastUpdate(LocalDateTime.now());
        if(isOpeningBalance) {
            entity.setOpeningBalance(dto.price());
        }
        return entity;
    }

    private  <T extends Enum<T> & IFinancialAsset> List<FinancialResponseDto> exectRepeat (Class<T> enumCustom,String typeAsset,long today,long year,long month  ) throws Exception {
        List<CompletableFuture<FinancialResponseDto>> listBonds = Stream.of(enumCustom.getEnumConstants()).map( bono -> {
            String urlOneYearAgo = String.format(urlBase, bono.getSymbol(), year, today);
            String urlUnixFirstDayOfMonth = String.format(urlBase, bono.getSymbol(), month, today);
            return fetchFinancialAssets(urlOneYearAgo,urlUnixFirstDayOfMonth,bono.getSymbol(),bono.getDescription(),typeAsset);
        }).toList();
        CompletableFuture<Void> allFutures = CompletableFuture.allOf(listBonds.toArray(new CompletableFuture[0]));

        try {
            allFutures.get();
        } catch (InterruptedException | ExecutionException e) {
            log.error("Error en exectRepeat: {}", e.getMessage(), e);

            throw new Exception(String.format("Error al traer la data de %s", typeAsset));
        }
        return listBonds.stream()
                .map(CompletableFuture::join)
                .filter(Objects::nonNull)
                .toList();

    }

    @Scheduled(cron = "0 0 11 * * ?", zone = "America/Argentina/Buenos_Aires")
    public  void openingMarket () {
        this.getData(true);
        log.info("Opening market");
    }

    @Scheduled(cron = "0 */30 11-23 * * ?", zone = "America/Argentina/Buenos_Aires")
    public void updateDb() {
        LocalTime currentTime = LocalTime.now(ZoneId.of("America/Argentina/Buenos_Aires"));
        LocalTime thresholdTime = LocalTime.of(11, 10); // 11:10 AM

        // Solo ejecuta getData si la hora actual es >= 11:10 AM
        if (currentTime.isAfter(thresholdTime) || currentTime.equals(thresholdTime)) {
            this.getData(false);
        }
    }

    public void seedDb() {
        this.getData(true);
    }
}

