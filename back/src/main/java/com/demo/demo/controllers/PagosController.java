package com.demo.demo.controllers;

import com.demo.demo.config.security.CurrentUser;
import com.demo.demo.dtos.request.CreateDepositoDto;
import com.demo.demo.dtos.request.CreateRetiroDto;
import com.demo.demo.dtos.response.DepositoResponseDto;
import com.demo.demo.dtos.response.RetiroResponseDto;
import com.demo.demo.entities.UserEntity;
import com.demo.demo.services.PagosService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/pagos")
@RequiredArgsConstructor
public class PagosController {
    private final PagosService pagosService;

    @PostMapping("/depositos")
    public ResponseEntity<DepositoResponseDto> createDeposito (@RequestParam("file") MultipartFile file,
                                                               @RequestBody CreateDepositoDto dto, @CurrentUser UserEntity currentUser) {
        return ResponseEntity.status(201).body(pagosService.createDeposito(dto, currentUser));
    }


    @PostMapping("/retiros")
    public ResponseEntity<RetiroResponseDto> createDeposito (@RequestBody @Valid CreateRetiroDto dto, @CurrentUser UserEntity currentUser) {
        return ResponseEntity.status(201).body(pagosService.createRetiro(dto, currentUser));
    }
}
