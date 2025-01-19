package com.demo.demo.controllers;

import com.demo.demo.entities.UserEntity;
import com.demo.demo.repositories.UserRepository;
import com.demo.demo.utils.JwtUtil;
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

    public AuthController(UserRepository userRepository, JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
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
        String token = jwtUtil.generateToken(foundUser.getUsername());

        // Devuelve solo el token
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        return response;
    }
}
