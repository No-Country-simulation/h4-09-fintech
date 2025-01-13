package com.demo.demo.config.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class JwtUtil {

//    private final SecretKey SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    @Value("${jwt.secret}")
    private  String JWT_SECRET ;
    public Date expiration() {
        return new Date(System.currentTimeMillis() + 1000 * 60 * 60);
    }

    private SecretKey getKey() {
        return Keys.secretKeyFor(SignatureAlgorithm.HS256);
    }
    public String createToken(String username, Map<String, Object> claims) {

        return Jwts.builder()
                .addClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(expiration())
                .signWith(getKey())
                .compact();
    }

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList()));

        return createToken(userDetails.getUsername(), claims);
    }

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 horas
                .signWith(getKey()) // Usa la clave generada
                .compact();
    }

    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getKey()) // Configura la misma clave para validación
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }


    public <T> T getClaim(String token, Function<Claims, T> claimsResolver) {
        Claims claimis = getAllClaims(token);
        return claimsResolver.apply(claimis);
    }

    private Claims getAllClaims(String token) {

        try {

            return Jwts.parserBuilder()
                    .setSigningKey(getKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            System.out.println("Token has expired"+ e);
            // manejar la excepción de token expirado
        } catch (UnsupportedJwtException e) {
            System.out.println("Token is not supported"+ e);
            // manejar la excepción de token no compatible
        } catch (SignatureException e) {
            System.out.println("Token signature is invalid"+ e);
            // manejar la excepción de firma inválida
        } catch (Exception e) {
            System.out.println("Error parsing token"+ e);
            // manejar otras excepciones
        }

        return null;
        }

    public String getUsernameFromToken(String token) {
        String username=getClaim(token, Claims::getSubject);
        return getClaim(token, Claims::getSubject);
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = getUsernameFromToken(token);

        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    public Date getExpiration(String token) {
        return getClaim(token, Claims::getExpiration);
    }

    public boolean isTokenExpired(String token) {
        return getExpiration(token).before(new Date());
    }
}