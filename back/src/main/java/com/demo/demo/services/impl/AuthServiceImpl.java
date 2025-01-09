package com.demo.demo.services.impl;


import com.demo.demo.dtos.request.LoginRequestDto;
import com.demo.demo.dtos.request.RegisterRequestDto;
import com.demo.demo.dtos.response.AuthResponseDto;
import com.demo.demo.services.AuthService;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
    @Override
    public AuthResponseDto login(LoginRequestDto dto) {
        return null;
    }

    @Override
    public AuthResponseDto register(RegisterRequestDto dto) {
        return null;
    }
}
