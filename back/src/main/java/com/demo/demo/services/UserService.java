package com.demo.demo.services;

import com.demo.demo.config.mappers.GoalMapper;
import com.demo.demo.config.mappers.NotificationMapper;
import com.demo.demo.dtos.goal.CreateGoalDTO;
import com.demo.demo.dtos.goal.ResponseGoalDTO;
import com.demo.demo.dtos.goal.UpdateAmountDTO;
import com.demo.demo.dtos.goal.UpdateGoalDTO;
import com.demo.demo.dtos.request.UpdateUserPreferencesDto;
import com.demo.demo.dtos.request.UpdateUserRequestDto;
import com.demo.demo.dtos.response.AddFundsResponse;
import com.demo.demo.dtos.response.UserPreferencesResponseDto;
import com.demo.demo.entities.Goal;
import com.demo.demo.entities.Notification;
import com.demo.demo.entities.UserEntity;
import com.demo.demo.exceptions.NotFoundException;
import com.demo.demo.repositories.UserRepository;
import com.demo.demo.services.impl.NotificationService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class UserService implements UserDetailsService {

    private final GoalMapper goalMapper;
    private final UserRepository userRepository;
    private final NotificationService notificationService;
    private final NotificationMapper notificationMapper;


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
        user.setOnboardingComplete(dto.isOnbardingComplete()); //se agrego el booleano para verificar si es la primera vez.
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

    @Transactional
    public UserEntity updateUser(String username, UpdateUserRequestDto dto) {
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("Usuario no encontrado"));

        user.setName(dto.getName());
        user.setLastName(dto.getLastName());



        return userRepository.save(user);
    }

    public UserEntity getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("User not found"));
    }

    public ResponseGoalDTO createGoal(CreateGoalDTO createGoalDTO, UserEntity user) {
        Goal goal = new Goal();
        goal.setName(createGoalDTO.name());
        goal.setTargetDate(createGoalDTO.targetDate());
        goal.setTargetAmount(createGoalDTO.targetAmount());

        UserEntity userEntity = getUserByUsername(user.getUsername());
        goal.setUser(userEntity);
        userEntity.getGoals().add(goal);

        userRepository.save(userEntity);

        return goalMapper.toResponseGoalDTO(userEntity.getGoals().getLast(), userEntity);
    }

    public List<ResponseGoalDTO> getGoals(String username) {
        UserEntity user = getUserByUsername(username);
        return user.getGoals().stream().map(goal -> goalMapper.toResponseGoalDTO(goal, user)).toList();
    }

    public ResponseGoalDTO getGoal(UUID goalId, String username) {
        UserEntity user = getUserByUsername(username);
        Goal goal = user.getGoals().stream()
                .filter(g -> g.getGoalId().equals(goalId))
                .findFirst()
                .orElseThrow(() -> new NotFoundException("Goal not found"));
        return goalMapper.toResponseGoalDTO(goal, user);
    }

    public ResponseGoalDTO uptateGoal(String username, UpdateGoalDTO dto) {
        UserEntity user = getUserByUsername(username);
        Goal goal = user.getGoals().stream()
                .filter(g -> g.getGoalId().equals(dto.goalId()))
                .findFirst()
                .orElseThrow(() -> new NotFoundException("Goal not found"));

        goal.setName(dto.name());
        goal.setTargetDate(dto.targetDate());
        goal.setTargetAmount(dto.targetAmount());

        return goalMapper.toResponseGoalDTO(goal, user);
    }

    @Transactional
    public AddFundsResponse addFounts(String username, UpdateAmountDTO dto) {
        UserEntity user = getUserByUsername(username);
        user.setFunds(user.getFunds()+dto.amount());

        List<Goal> goals = user.getGoals();
        List<Notification> notifications =notificationService.accordingToProgress(goals, user);

        userRepository.save(user);

        return new AddFundsResponse(user.getFunds(), notificationMapper.toNotificationResponseDTOList(notifications));
    }


}

