package com.demo.demo.controllers;

import com.demo.demo.config.security.JwtUtil;
import com.demo.demo.dtos.request.TokenRequestDto;
import com.demo.demo.dtos.response.AuthGoogleResponseDto;
import com.demo.demo.entities.RoleEntity;
import com.demo.demo.entities.UserEntity;
import com.demo.demo.exceptions.NotFoundException;
import com.demo.demo.repositories.GoalRepository;
import com.demo.demo.repositories.UserRepository;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class GoogleAuthController {

  @Value("${google.client-id}")
    private String CLIENT_ID;

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final GoalRepository roleRepository;

    @PostMapping("/verify-token")
    public ResponseEntity<?> verifyGoogleToken(@RequestBody TokenRequestDto tokenRequest) {
        try {
            // Configurar el verificador
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                    new NetHttpTransport(),
                    new JacksonFactory()
            )
                    .setAudience(Collections.singletonList(CLIENT_ID))
                    .build();

            // Verificar el token de Google
            GoogleIdToken idToken = verifier.verify(tokenRequest.idToken());

            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
                AuthGoogleResponseDto response = new AuthGoogleResponseDto();
                response.setFirstTime(false);
                // Obtener el email del usuario y name
                String email = payload.getEmail();
                String name = (String) payload.get("given_name");
                String lastName = (String) payload.get("family_name");

                // Verificar si el usuario existe en la base de datos
                UserEntity user = userRepository.findByUsername(email).orElseGet(() -> {
                    // Crear un nuevo usuario si no existe
                    UserEntity newUser = new UserEntity();
                    newUser.setUsername(email);
                    newUser.setName(name);
                    newUser.setLastName(lastName);

                    RoleEntity role = roleRepository.findRoleByName("ROLE_USER").orElseThrow(() -> new NotFoundException(String.format("Role not found with name %s","ROLE_USER")));
                    newUser.getRoles().add(role);
                    response.setFirstTime(true);
                    return userRepository.save(newUser);
                });
                // Generar el JWT para tu backend
                response.setToken(jwtUtil.generateToken(user));

                // Respuesta con el access token y el ID del usuario
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(400).body("Invalid ID token.");
            }
        } catch (GeneralSecurityException | IOException e) {
            return ResponseEntity.status(500).body("Error validating token: " + e.getMessage());
        }
    }

}
