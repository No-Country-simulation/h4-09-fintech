package com.demo.demo.controllers;

import com.demo.demo.dtos.recover_password.EmailResetPasswordDTO;
import com.demo.demo.dtos.recover_password.ResetPasswordDTO;
import com.demo.demo.dtos.request.LoginRequestDto;
import com.demo.demo.dtos.request.RegisterRequestDto;
import com.demo.demo.dtos.response.AuthResponseDto;
import com.demo.demo.entities.UserEntity;
import com.demo.demo.services.AuthService;
import com.demo.demo.config.security.CurrentUser;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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
    public ResponseEntity<UserEntity> checkLogin(@CurrentUser UserEntity user) {
        return ResponseEntity.status(200).body(user);
    }

    @GetMapping
    public ResponseEntity<String> auth(@AuthenticationPrincipal OAuth2User user) {
        return ResponseEntity.ok().body(user.getName());
    }
    @PostMapping("/send_reset_password")
    public ResponseEntity<Map<String, String>> sendResetPassword(@RequestBody EmailResetPasswordDTO emailResetPasswordDTO) {
        authService.sendPasswordResetLink(emailResetPasswordDTO);
        return new ResponseEntity<>(Map.of("msg", "The email was sent to change the password"), HttpStatus.ACCEPTED);
    }

    @Transactional
    @PostMapping("/reset_password")
    public ResponseEntity<Map<String, String>> resetPassword(@RequestBody ResetPasswordDTO resetPasswordDTO) {
        authService.applyNewPassword(resetPasswordDTO);
        return new ResponseEntity<>(Map.of("msg", "The password was changed successfully"), HttpStatus.ACCEPTED);
    }
}
