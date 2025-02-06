package com.demo.demo.controllers.admin;

import com.demo.demo.dtos.request.UpdateDepositoDto;
import com.demo.demo.dtos.request.UpdateRetiroDto;
import com.demo.demo.dtos.response.DepositoResponseDto;
import com.demo.demo.dtos.response.RetiroResponseDto;
import com.demo.demo.services.PagosService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/pagos")
@RequiredArgsConstructor
public class PagosAdminController {

    private final PagosService pagosService;

    @GetMapping("/depositos")
    public ResponseEntity<List<DepositoResponseDto>> getDepositos() {
        return ResponseEntity.ok(pagosService.getDepositos());
    }

    @GetMapping("/retiros")
    public ResponseEntity<List<RetiroResponseDto>> getRetiros() {
        return ResponseEntity.ok(pagosService.getRetiros());
    }


    @PutMapping("/depositos")
    public ResponseEntity<Map<String,Object>>updateDeposito(@RequestBody UpdateDepositoDto dto) {
        return ResponseEntity.ok(pagosService.upateDeposito(dto));
    }

    @PutMapping("/retiros")
    public ResponseEntity<Map<String,Object>>updateRetiro(@RequestBody UpdateRetiroDto dto) {
        return ResponseEntity.ok(pagosService.upateRetiro(dto));
    }
}
