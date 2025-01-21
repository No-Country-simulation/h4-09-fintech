package com.demo.demo.controllers;


import com.demo.demo.dtos.response.CedearResponseDto;
import com.demo.demo.enums.Cedear;
import com.demo.demo.services.impl.CedearsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/cedears")
@RequiredArgsConstructor
public class CedearsController {

    private final CedearsService cedearsService;

    @GetMapping
    public ResponseEntity<Map<String, String>> getAllCedearNames() {
        return ResponseEntity.ok(Arrays.stream(Cedear.values())
                .collect(Collectors.toMap(Enum::name, Cedear::getName)));
    }

    @GetMapping("/{cedear}")
    public ResponseEntity<CedearResponseDto> getCedearName(@PathVariable String cedear) throws ExecutionException, InterruptedException {
        return ResponseEntity.ok(cedearsService.getCedear(cedear));
    }
}
