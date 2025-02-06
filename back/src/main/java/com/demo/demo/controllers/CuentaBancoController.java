package com.demo.demo.controllers;


import com.demo.demo.dtos.response.CuentaBancoResponseDto;
import com.demo.demo.services.CuentaBancoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cuenta-banco")
@RequiredArgsConstructor
public class CuentaBancoController {
    private final CuentaBancoService cuentaBancoService;

    @GetMapping
    public ResponseEntity<CuentaBancoResponseDto> getCuentaBanco() {
        return ResponseEntity.ok(cuentaBancoService.findCuentaBanco());
    }
}
