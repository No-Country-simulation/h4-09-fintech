package com.demo.demo.services;

import com.demo.demo.dtos.request.UpdateCuentaBancoDto;
import com.demo.demo.dtos.response.CuentaBancoResponseDto;
import com.demo.demo.entities.UserEntity;

import java.util.UUID;

public interface CuentaBancoService {
    CuentaBancoResponseDto updateCuentaBanco(UpdateCuentaBancoDto dto, UUID cuentaId, UserEntity user);
    CuentaBancoResponseDto findCuentaBanco();
}
