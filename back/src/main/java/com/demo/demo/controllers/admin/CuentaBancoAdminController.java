package com.demo.demo.controllers.admin;


import com.demo.demo.config.security.CurrentUser;
import com.demo.demo.dtos.request.UpdateCuentaBancoDto;
import com.demo.demo.dtos.response.CuentaBancoResponseDto;
import com.demo.demo.entities.UserEntity;
import com.demo.demo.services.CuentaBancoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/admin/cuenta-banco")
@RequiredArgsConstructor
public class CuentaBancoAdminController {
    private final CuentaBancoService cuentaBancoService;
    @PutMapping("/{cuentaId}")
    public ResponseEntity<CuentaBancoResponseDto> update (@Valid @RequestBody UpdateCuentaBancoDto  dto, @PathVariable UUID cuentaId, @CurrentUser UserEntity currentUser) {
        return ResponseEntity.ok(cuentaBancoService.updateCuentaBanco(dto,cuentaId,currentUser));
    }
}
