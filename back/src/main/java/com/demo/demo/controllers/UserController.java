package com.demo.demo.controllers;

import com.demo.demo.config.security.CurrentUser;
import com.demo.demo.dtos.goal.CreateGoalDTO;
import com.demo.demo.dtos.goal.ResponseGoalDTO;
import com.demo.demo.dtos.goal.UpdateAmountDTO;
import com.demo.demo.dtos.goal.UpdateGoalDTO;
import com.demo.demo.dtos.request.UpdateUserRequestDto;
import com.demo.demo.dtos.response.AddFundsResponse;
import com.demo.demo.entities.UserEntity;
import com.demo.demo.repositories.UserRepository;
import com.demo.demo.services.UserService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {
    final UserService userService;
    final UserRepository   userRepository;
    @PatchMapping("/update")
    public ResponseEntity<UserEntity> updateUser(
            @CurrentUser UserEntity currentUser,
            @RequestBody @Valid UpdateUserRequestDto dto) {
        UserEntity updatedUser = userService.updateUser(currentUser.getUsername(), dto);
        return ResponseEntity.ok(updatedUser);
    }
    @Transactional
    @PostMapping("/create_goal")
    public ResponseEntity<ResponseGoalDTO> createGoal(
            @RequestBody CreateGoalDTO createGoalDTO,
            @CurrentUser UserEntity user
            ) {
        return ResponseEntity.ok(userService.createGoal(createGoalDTO, user));
    }

    @GetMapping("/goals")
    public ResponseEntity<List<ResponseGoalDTO>> getGoals(@CurrentUser UserEntity user) {
        return ResponseEntity.ok(userService.getGoals(user.getUsername()));
    }
    @GetMapping("/{goalId}")
    public ResponseEntity<ResponseGoalDTO> getGoal(@PathVariable UUID goalId, @CurrentUser UserEntity user) {
        return ResponseEntity.ok(userService.getGoal(goalId, user.getUsername()));
    }
    @Transactional
    @PatchMapping("/update_goal")
    public ResponseEntity<ResponseGoalDTO> updatePreferences(
            @CurrentUser UserEntity user,
            @RequestBody @Valid UpdateGoalDTO dto) {
        return ResponseEntity.ok(userService.uptateGoal(user.getUsername(), dto));
    }
    @Transactional
    @DeleteMapping("/delete_goal/{goalId}")
    public ResponseEntity<ResponseGoalDTO> deleteGoal(@PathVariable UUID goalId, @CurrentUser UserEntity user) {
        return ResponseEntity.ok(userService.deleteGoal(goalId, user.getUsername()));
    }
    @Transactional
    @PatchMapping("/add_funds")
    public ResponseEntity<AddFundsResponse> addFounts(
            @CurrentUser UserEntity user,
            @RequestBody @Valid UpdateAmountDTO dto) {
        return ResponseEntity.ok(userService.addFounts(user.getUsername(), dto));
    }

    @PatchMapping("/update-profile-image")
    public ResponseEntity<UserEntity> updateProfileImage(
            @CurrentUser UserEntity currentUser,
            @RequestParam String profileImageUrl) {
        currentUser.setProfileImageUrl(profileImageUrl);
        UserEntity updatedUser = userRepository.save(currentUser);
        return ResponseEntity.ok(updatedUser);
    }
}
