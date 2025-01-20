package com.demo.demo.services.impl;


import com.demo.demo.config.mappers.UserMapper;
import com.demo.demo.dtos.recover.EmailResetPasswordDTO;
import com.demo.demo.dtos.recover.ResetPasswordDTO;
import com.demo.demo.dtos.request.LoginRequestDto;
import com.demo.demo.dtos.request.RegisterRequestDto;
import com.demo.demo.dtos.response.AuthResponseDto;
import com.demo.demo.entities.RoleEntity;
import com.demo.demo.entities.UserEntity;
import com.demo.demo.exceptions.BadRequestException;
import com.demo.demo.exceptions.NotFoundException;
import com.demo.demo.repositories.GoalRepository;
import com.demo.demo.repositories.UserRepository;
import com.demo.demo.services.AuthService;
import com.demo.demo.config.security.JwtUtil;
import com.demo.demo.services.EmailService;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final GoalRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserMapper userMapper;
    private final EmailService emailService;

    @Override
    public AuthResponseDto login(LoginRequestDto dto) {
        try {
            authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword()));
        } catch (Exception e) {
            throw new BadRequestException("Invalid username or password");
        }
        UserEntity user = userRepository.findByUsername(dto.getEmail())
                .orElseThrow(() -> new NotFoundException(String.format("User not found with email: %s", dto.getEmail())));
        String token = jwtUtil.generateToken(user);
        return new AuthResponseDto(token);
    }

    @Override
    @Transactional
    public AuthResponseDto register(RegisterRequestDto dto) {
        Optional<UserEntity> userFound = userRepository.findByUsername(dto.getEmail());
        if (userFound.isPresent())
            throw new BadRequestException(String.format("Email is already registered: %s", dto.getEmail()));
        RoleEntity role = roleRepository.findRoleByName("ROLE_USER").orElseThrow(() -> new NotFoundException(String.format("Role not found with name %s", "ROLE_USER")));
        UserEntity newUser = userMapper.toUserEntity(dto);
        newUser.setPassword(passwordEncoder.encode(dto.getPassword()));
        newUser.getRoles().add(role);
        userRepository.save(newUser);
        String token = jwtUtil.generateToken(newUser);
        return new AuthResponseDto(token);
    }

    //recover password
    public void sendPasswordResetLink(EmailResetPasswordDTO emailResetPasswordDTO) {
        Optional<UserEntity> user = userRepository.findByUsername(emailResetPasswordDTO.email());
        if (user.isEmpty())
            throw new RuntimeException("User not found");//crear modelo de excepciones

        String resetLink = generateResetLink(user.get());
        String subject = "Restablece tu contraseña";

        // Lista de datos para cambiar en el template
        List<Map<String, String>> emailData = List.of(
                Map.of("resetLink", resetLink),
                Map.of("name", user.get().getName())); // Lista de mapas>

        try {
            emailService.sendHtmlEmail(emailResetPasswordDTO.email(), subject, "templates/recoverPassword.html", emailData);
        } catch (MessagingException | IOException e) {
            e.printStackTrace(); // Manejar excepciones
        }

    }

    public String generateResetLink(UserEntity user) {
        String token = jwtUtil.generateToken(user);
        return "http://localhost:8080?token=" + token;
    }

    public void applyNewPassword(ResetPasswordDTO resetPasswordDTO) {
        if (!resetPasswordDTO.repeatPassword().equals(resetPasswordDTO.password()))
            throw new RuntimeException("Passwords do not match");

        UserDetails userContext = getUserContext();

        Optional<UserEntity> user = userRepository.findByUsername(userContext.getUsername());
        if (user.isEmpty())
            throw new NotFoundException("User not found");
        user.get().setPassword(passwordEncoder.encode(resetPasswordDTO.password()));

    }

    public UserDetails getUserContext() {
        return (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}

