package com.demo.demo.services;

import com.demo.demo.dtos.request.LoginRequestDto;
import com.demo.demo.dtos.request.RegisterRequestDto;
import com.demo.demo.dtos.response.AuthResponseDto;

public interface AuthService {
    AuthResponseDto login(LoginRequestDto dto);
    AuthResponseDto register(RegisterRequestDto dto);
}
