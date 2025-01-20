package com.demo.demo.services;

import com.demo.demo.dtos.recover.EmailResetPasswordDTO;
import com.demo.demo.dtos.recover.ResetPasswordDTO;
import com.demo.demo.dtos.request.LoginRequestDto;
import com.demo.demo.dtos.request.RegisterRequestDto;
import com.demo.demo.dtos.response.AuthResponseDto;
import com.demo.demo.entities.UserEntity;

public interface AuthService {
    AuthResponseDto login(LoginRequestDto dto);
    AuthResponseDto register(RegisterRequestDto dto);
    //recover password
    void sendPasswordResetLink(EmailResetPasswordDTO emailResetPasswordDTO);
    String generateResetLink(UserEntity user);
    void applyNewPassword(ResetPasswordDTO resetPasswordDTO);
}
