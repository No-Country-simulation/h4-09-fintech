package com.demo.demo.controllers;

import com.demo.demo.config.security.CurrentUser;
import com.demo.demo.dtos.request.UpdateUserRequestDto;
import com.demo.demo.entities.UserEntity;
import com.demo.demo.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PatchMapping("/api/users/update")
    public ResponseEntity<UserEntity> updateUser(
            @CurrentUser UserEntity currentUser,
            @RequestBody @Valid UpdateUserRequestDto dto) {
        UserEntity updatedUser = userService.updateUser(currentUser.getUsername(), dto);
        return ResponseEntity.ok(updatedUser);
    }
}

