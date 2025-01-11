package com.demo.demo.services;


import com.demo.demo.dto.recover_password.EmailResetPasswordDTO;
import com.demo.demo.dto.recover_password.ResetPasswordDTO;
import com.demo.demo.entities.UserEntity;
import com.demo.demo.repositories.UserRepository;
import com.demo.demo.utils.JwtUtil;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final EmailService emailService;
    private final JwtUtil jwtUtil;

    public void sendPasswordResetLink(EmailResetPasswordDTO emailResetPasswordDTO)  {
        Optional<UserEntity> user = userRepository.findByEmail(emailResetPasswordDTO.email());
        if (user.isEmpty())
            throw new RuntimeException("User not found");//crear modelo de excepciones

        String resetLink = generateResetLink(user.get());
        String subject = "Restablece tu contraseña";

        // Lista de datos para cambiar en el template
        List<Map<String, String>> emailData = List.of(
                Map.of("resetLink", resetLink),
                Map.of("name", user.get().getUsername())); // Lista de mapas>

        try {
            emailService.sendHtmlEmail(emailResetPasswordDTO.email(), subject, "templates/recoverPassword.html", emailData);
        } catch (MessagingException | IOException e) {
            e.printStackTrace(); // Manejar excepciones
        }

    }

    public String generateResetLink(UserEntity user) {
        String token = jwtUtil.generateTokenResetPassword(user.getId());
        return "http://localhost:8080?token=" + token;
    }
    
    public void applyNewPassword(ResetPasswordDTO resetPasswordDTO) {
        if (!resetPasswordDTO.repeatPassword().equals(resetPasswordDTO.password()))
            throw new RuntimeException("Passwords do not match");

        String idUser = jwtUtil.extractIdUser(resetPasswordDTO.token());

        Optional<UserEntity> user = userRepository.findById(Long.parseLong(idUser));
        if (user.isEmpty())
            throw new RuntimeException("User not found");

        user.get().setPassword(passwordEncoder.encode(resetPasswordDTO.password()));}
}
