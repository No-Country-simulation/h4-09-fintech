package com.demo.demo.services.impl;

import com.demo.demo.dtos.request.CreateDepositoDto;
import com.demo.demo.dtos.request.CreateRetiroDto;
import com.demo.demo.dtos.request.UpdateDepositoDto;
import com.demo.demo.dtos.request.UpdateRetiroDto;
import com.demo.demo.dtos.response.DepositoResponseDto;
import com.demo.demo.dtos.response.RetiroResponseDto;
import com.demo.demo.entities.DepositoEntity;
import com.demo.demo.entities.RetiroEntity;
import com.demo.demo.entities.UserEntity;
import com.demo.demo.enums.Status;
import com.demo.demo.exceptions.BadRequestException;
import com.demo.demo.repositories.DepositoRepository;
import com.demo.demo.repositories.RetiroRepository;
import com.demo.demo.repositories.UserRepository;
import com.demo.demo.services.PagosService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
public class PagosServiceImpl implements PagosService {
    private final DepositoRepository depositoRepository;
    private final RetiroRepository  retiroRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public DepositoResponseDto createDeposito(CreateDepositoDto dto, UserEntity user,String comprobante) {

        DepositoEntity deposito = DepositoEntity.createDeposito(dto.monto(), user);
        deposito.setComprobante(comprobante);
        deposito = depositoRepository.save(deposito);
        return deposito.createResponseDto();
    }

    @Override
    @Transactional

    public RetiroResponseDto createRetiro(CreateRetiroDto dto, UserEntity user) {

        if(dto.monto() <= user.getFunds()) {
            RetiroEntity retiro = RetiroEntity.createRetiro(dto,user);
            retiro = retiroRepository.save(retiro);
            return retiro.createResponseDto();
        }
        throw new BadRequestException("La retiro no puede ser mayor a tu saldo actual");

    }

    @Override
    public List<DepositoResponseDto> getDepositos() {
        List<DepositoEntity> depositos = depositoRepository.findAll();
        return depositos.stream().map(DepositoEntity::createResponseDto).toList();

    }

    @Override
    public List<RetiroResponseDto> getRetiros() {
        List<RetiroEntity> retiros = retiroRepository.findAll();
        return retiros.stream().map(RetiroEntity::createResponseDto).toList();
    }

    @Override
    public Map<String, Object> upateDeposito(UpdateDepositoDto dto) {
        DepositoEntity deposito = depositoRepository.findById(dto.depositoId()).orElseThrow(() -> new BadRequestException("No existe el deposito"));
        deposito.setFechaResponse(LocalDate.now());
        deposito.setStatus(dto.status());
        depositoRepository.save(deposito);
        if(dto.status() == Status.APROBADO) {
            UserEntity user = userRepository.findById(dto.userId()).orElseThrow(() -> new BadRequestException("El usuario no existe"));
            float newFunds = deposito.getMonto() + user.getFunds();
            user.setFunds(newFunds);
            userRepository.save(user);
        }
        Map<String, Object> response = new HashMap<>();
        response.put("deposito", deposito.createResponseDto());
        response.put("message","Deposito actualizado");
        return response;
    }

    @Override
    public Map<String, Object> upateRetiro(UpdateRetiroDto dto) {
        UserEntity user = userRepository.findById(dto.userId()).orElseThrow(() -> new BadRequestException("El usuario no existe"));
        RetiroEntity retiro = retiroRepository.findById(dto.retiroId()).orElseThrow(() -> new BadRequestException("No existe el retiro"));

        Status status = dto.status();
        retiro.setFechaResponse(LocalDate.now());

        if (status == Status.APROBADO) {
            if (retiro.getMonto() <= user.getFunds()) {
                user.setFunds(user.getFunds() - retiro.getMonto());
                userRepository.save(user);
            } else {
                retiro.setStatus(Status.RECHAZADO);
                 retiroRepository.save(retiro);
                throw new BadRequestException("Los fondos del usuario son menores que el monto del retiro");
            }
        }

        retiro.setStatus(status);
        retiroRepository.save(retiro);

        return Map.of(
                "retiro", retiro.createResponseDto(),
                "message", "Retiro actualizado"
        );
    }


}
