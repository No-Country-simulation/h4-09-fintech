package com.demo.demo.utils;


import com.demo.demo.repositories.FinancialAssetRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {
    private final FinancialAssetRepository financialAssetRepository;
    private final ScheduleFinancialAssets scheduleFinancialAssets;
    @Override
    public void run(String... args) throws Exception {
        if(financialAssetRepository.count() == 0) {
            scheduleFinancialAssets.seedDb();
            log.info("Financial assets have been added to the database");
        }else {
            log.info("Financial assets have already been added to the database");
        }
    }
}
