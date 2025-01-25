package com.demo.demo.controllers;

import com.demo.demo.config.security.CurrentUser;
import com.demo.demo.dtos.notification.NotificationResponseDTO;
import com.demo.demo.entities.UserEntity;
import com.demo.demo.services.UserService;
import com.demo.demo.services.impl.NotificationService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;
    private final UserService userService;

    @Transactional
    @PatchMapping("/read/{notificationId}")
    public ResponseEntity<NotificationResponseDTO> notificationIsRead(
            @CurrentUser UserEntity userEntity,
            @PathVariable Long notificationId
    ) {
        UserEntity user = userService.getUserByUsername(userEntity.getUsername());
        return ResponseEntity.ok(notificationService.notificationIsRead(user,notificationId));
    }

    @GetMapping("/all")
    public ResponseEntity<List<NotificationResponseDTO>> getAllNotifications(@CurrentUser UserEntity userEntity ){
        UserEntity user = userService.getUserByUsername(userEntity.getUsername());
        return ResponseEntity.ok(notificationService.getAllNotifications(user));
    }

}
