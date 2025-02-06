package com.demo.demo.services.impl;

import com.demo.demo.dtos.request.UpdateCuentaBancoDto;
import com.demo.demo.dtos.response.CuentaBancoResponseDto;
import com.demo.demo.entities.CuentaBancoEntity;
import com.demo.demo.entities.UserEntity;
import com.demo.demo.exceptions.NotFoundException;
import com.demo.demo.repositories.CuentaBancoRepository;
import com.demo.demo.repositories.UserRepository;
import com.demo.demo.services.CuentaBancoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CuentaBancoServiceImpl implements CuentaBancoService {
    private final CuentaBancoRepository cuentaBancoRepository;
    private final UserRepository userRepository;
    @Override
    public CuentaBancoResponseDto updateCuentaBanco(UpdateCuentaBancoDto dto, UUID cuentaId, UserEntity user) {
        CuentaBancoEntity cuentaBancoEntity = cuentaBancoRepository.findById(cuentaId).orElseThrow(() -> new NotFoundException("Cuenta no encontrada"));
        UserEntity managedUser = userRepository.findById(user.getUserId())
                .orElseThrow(() -> new NotFoundException("Usuario no encontrado"));
        cuentaBancoEntity.setUserUpdated(managedUser);
        cuentaBancoEntity.setCbu(dto.cbu());
        cuentaBancoEntity.setCuit(dto.cuit());
        cuentaBancoEntity.setAlias(dto.alias());
        cuentaBancoEntity.setTitular(dto.titular());
        cuentaBancoEntity.setFechaModificacion(LocalDate.now());
         cuentaBancoRepository.save(cuentaBancoEntity);
        return cuentaBancoEntity.toDto();
    }

    @Override
    public CuentaBancoResponseDto findCuentaBanco() {
        CuentaBancoEntity cuentaBancoEntity = cuentaBancoRepository.findAll().getFirst();
        return cuentaBancoEntity.toDto();
    }
}
