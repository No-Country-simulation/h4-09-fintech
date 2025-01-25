package com.demo.demo.controllers;

import com.demo.demo.dtos.recover.EmailResetPasswordDTO;
import com.demo.demo.dtos.recover.ResetPasswordDTO;
import com.demo.demo.dtos.request.LoginRequestDto;
import com.demo.demo.dtos.request.RegisterRequestDto;
import com.demo.demo.dtos.response.AuthResponseDto;
import com.demo.demo.dtos.response.UserResponseDTO;
import com.demo.demo.entities.UserEntity;
import com.demo.demo.services.AuthService;
import com.demo.demo.config.security.CurrentUser;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {


    private final AuthService authService;


    @PostMapping("/register")
    public ResponseEntity<AuthResponseDto> register(@RequestBody RegisterRequestDto dto) {
       return ResponseEntity.status(201).body(authService.register(dto));
    }


    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody LoginRequestDto dto) {
        return ResponseEntity.status(200).body(authService.login(dto));
    }
    @PostMapping("/login/oauth2/google")
    public ResponseEntity<String> loginGoogle() {
        return ResponseEntity.status(200).body("Google Login");
    }


    @GetMapping("/check-login")
    public ResponseEntity<UserResponseDTO> checkLogin(@CurrentUser UserEntity user) {
        UserResponseDTO userResponse = new UserResponseDTO();
        userResponse.setUserId(user.getUserId());
        userResponse.setUsername(user.getUsername());
        userResponse.setName(user.getName());
        userResponse.setLastName(user.getLastName());
        userResponse.setOnboardingComplete(user.isOnboardingComplete());
        userResponse.setMainGoal(user.getMainGoal());
        userResponse.setFinancialKnowledge(user.getFinancialKnowledge());
        userResponse.setRiskPreference(user.getRiskPreference());
        userResponse.setCurrentAmount(user.getFunds());

        return ResponseEntity.status(200).body(userResponse);
    }

    @GetMapping
    public ResponseEntity<String> auth(@AuthenticationPrincipal OAuth2User user) {
        return ResponseEntity.ok().body(user.getName());
    }
    @PostMapping("/send_reset_password")
    public ResponseEntity<String> sendResetPassword(@RequestBody EmailResetPasswordDTO emailResetPasswordDTO) {
        authService.sendPasswordResetLink(emailResetPasswordDTO);
        return ResponseEntity.status(200).body("Password changed successfully");
    }

    @Transactional
    @PostMapping("/reset_password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordDTO resetPasswordDTO) {
        authService.applyNewPassword(resetPasswordDTO);
        return ResponseEntity.status(200).body("Password changed successfully");
    }
}
