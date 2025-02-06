package com.demo.demo.services;

import com.demo.demo.dtos.request.CreateDepositoDto;
import com.demo.demo.dtos.request.CreateRetiroDto;
import com.demo.demo.dtos.request.UpdateDepositoDto;
import com.demo.demo.dtos.request.UpdateRetiroDto;
import com.demo.demo.dtos.response.DepositoResponseDto;
import com.demo.demo.dtos.response.RetiroResponseDto;
import com.demo.demo.entities.UserEntity;
import com.demo.demo.enums.Status;

import java.util.List;
import java.util.Map;
import java.util.UUID;

public interface PagosService {
    DepositoResponseDto createDeposito(CreateDepositoDto dto, UserEntity user,String comprobante);
    RetiroResponseDto createRetiro(CreateRetiroDto dto, UserEntity user);
    List<DepositoResponseDto> getDepositos();
    List<RetiroResponseDto> getRetiros();

    Map<String, Object> upateDeposito(UpdateDepositoDto dto);

    Map<String, Object> upateRetiro(UpdateRetiroDto dto);
}
