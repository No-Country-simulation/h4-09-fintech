package com.demo.demo.controllers;

import com.demo.demo.dto.recover_password.EmailResetPasswordDTO;
import com.demo.demo.dto.recover_password.ResetPasswordDTO;
import com.demo.demo.entities.UserEntity;
import com.demo.demo.repositories.UserRepository;
import com.demo.demo.services.AuthServiceImpl;
import com.demo.demo.utils.JwtUtil;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final AuthServiceImpl authService;

    public AuthController(UserRepository userRepository, JwtUtil jwtUtil, PasswordEncoder passwordEncoder, AuthServiceImpl authService) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody UserEntity user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("User already exists");
        }

        // Encripta la contraseña y guarda el usuario
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        // Respuesta clara
        Map<String, String> response = new HashMap<>();
        response.put("message", "User registered successfully");
        return ResponseEntity.ok(response);
    }


    @PostMapping("/login")
    public Map<String, String> login(@RequestBody UserEntity user) {
        UserEntity foundUser = userRepository.findByUsername(user.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(user.getPassword(), foundUser.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        // Genera el token JWT
        String token = jwtUtil.generateTokenResetPassword(foundUser.getUsername());

        // Devuelve solo el token
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        return response;
    }

    @PostMapping("/send_reset_password")
    public ResponseEntity<Map<String, String>> sendResetPassword(@RequestBody EmailResetPasswordDTO emailResetPasswordDTO) {
        authService.sendPasswordResetLink(emailResetPasswordDTO);
        return new ResponseEntity<>(Map.of("msg", "The email was sent to change the password"), HttpStatus.ACCEPTED);
    }

    @Transactional
    @PostMapping("/reset_password")
    public ResponseEntity<Map<String, String>> resetPassword(@Valid @RequestBody ResetPasswordDTO resetPasswordDTO) {
        authService.applyNewPassword(resetPasswordDTO);
        return new ResponseEntity<>(Map.of("msg", "The password was changed successfully"), HttpStatus.ACCEPTED);
    }
}
