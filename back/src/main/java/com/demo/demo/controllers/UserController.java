package com.demo.demo.controllers;

import com.demo.demo.config.security.CurrentUser;
import com.demo.demo.dtos.goal.CreateGoalDTO;
import com.demo.demo.dtos.goal.ResponseGoalDTO;
import com.demo.demo.entities.UserEntity;
import com.demo.demo.services.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user")
public class UserController {
    final UserService userService;

//    @Transactional
//    @PostMapping("/create_goal")
//    public ResponseEntity<ResponseGoalDTO> createGoal(
//            @RequestBody CreateGoalDTO createGoalDTO,
//            @CurrentUser UserEntity user
//            ) {
//        return ResponseEntity.ok(userService.createGoal(createGoalDTO, user));
//    }
}
