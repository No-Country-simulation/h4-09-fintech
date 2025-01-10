package com.demo.demo.services.impl;


import com.demo.demo.config.mappers.UserMapper;
import com.demo.demo.dtos.request.LoginRequestDto;
import com.demo.demo.dtos.request.RegisterRequestDto;
import com.demo.demo.dtos.response.AuthResponseDto;
import com.demo.demo.entities.RoleEntity;
import com.demo.demo.entities.UserEntity;
import com.demo.demo.exceptions.BadRequestException;
import com.demo.demo.exceptions.NotFoundException;
import com.demo.demo.repositories.RoleRepository;
import com.demo.demo.repositories.UserRepository;
import com.demo.demo.services.AuthService;
import com.demo.demo.config.security.JwtUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserMapper userMapper;
    @Override
    public AuthResponseDto login(LoginRequestDto dto) {
        try {
            authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword()));
        } catch (Exception e) {
            throw new BadRequestException("Invalid username or password");
        }
        UserEntity user = userRepository.findByUsername(dto.getEmail())
                .orElseThrow(() -> new NotFoundException(String.format("User not found with email: %s",dto.getEmail())));
        String token = jwtUtil.generateToken(user);
        return new AuthResponseDto(token);
    }

    @Override
    @Transactional
    public AuthResponseDto register(RegisterRequestDto dto) {
        Optional<UserEntity> userFound = userRepository.findByUsername(dto.getEmail());
        if(userFound.isPresent()) throw new BadRequestException(String.format("Email is already registered: %s",dto.getEmail()));
        RoleEntity role = roleRepository.findRoleByName("ROLE_USER").orElseThrow(() -> new NotFoundException(String.format("Role not found with name %s","ROLE_USER")));
        UserEntity newUser = userMapper.toUserEntity(dto);
        newUser.setPassword(passwordEncoder.encode(dto.getPassword()));
        newUser.getRoles().add(role);
        userRepository.save(newUser);
        String token = jwtUtil.generateToken(newUser);
        return new AuthResponseDto(token);
    }
}
