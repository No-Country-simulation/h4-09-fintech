package com.demo.demo.utils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

    private final SecretKey SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public String generateTokenResetPassword(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 horas
                .signWith(SECRET_KEY) // Usa la clave generada
                .compact();
    }

    public String generateTokenResetPassword(Long idUser) {
        return Jwts.builder()
                .setSubject(String.valueOf(idUser))
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1 hora
                .signWith(SECRET_KEY) // Usa la clave generada
                .compact();
    }

    public String extractIdUser(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY) // Configura la misma clave para validación
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY) // Configura la misma clave para validación
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}