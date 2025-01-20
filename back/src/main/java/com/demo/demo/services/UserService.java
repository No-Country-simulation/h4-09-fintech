package com.demo.demo.services;

import com.demo.demo.dtos.request.UpdateUserPreferencesDto;
import com.demo.demo.dtos.response.UserPreferencesResponseDto;
import com.demo.demo.entities.UserEntity;
import com.demo.demo.exceptions.NotFoundException;
import com.demo.demo.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return user;
    }

    @Transactional
    public UserPreferencesResponseDto updateUserPreferences(String username, UpdateUserPreferencesDto dto) {
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("Usuario no encontrado"));

        user.setMainGoal(dto.getMainGoal());
        user.setFinancialKnowledge(dto.getFinancialKnowledge());
        user.setRiskPreference(dto.getRiskPreference());
        user.setOnboardingComplete(dto.isOnboardingComplete());

        userRepository.save(user);

        return new UserPreferencesResponseDto(
                user.getUserId().toString(),
                user.getUsername(),
                user.getName(),
                user.getLastName(),
                user.getMainGoal(),
                user.getFinancialKnowledge(),
                user.getRiskPreference()
        );
    }

    public UserPreferencesResponseDto getUserPreferences(String username) {
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("Usuario no encontrado"));

        return new UserPreferencesResponseDto(
                user.getUserId().toString(),
                user.getUsername(),
                user.getName(),
                user.getLastName(),
                user.getMainGoal(),
                user.getFinancialKnowledge(),
                user.getRiskPreference()
        );
    }



}

