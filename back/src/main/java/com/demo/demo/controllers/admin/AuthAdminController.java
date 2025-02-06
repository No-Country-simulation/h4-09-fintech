package com.demo.demo.controllers.admin;


import com.demo.demo.config.security.CurrentUser;
import com.demo.demo.dtos.request.LoginRequestDto;
import com.demo.demo.dtos.response.AuthResponseDto;
import com.demo.demo.dtos.response.UserAdminResponseDTO;
import com.demo.demo.entities.RoleEntity;
import com.demo.demo.entities.UserEntity;
import com.demo.demo.exceptions.BadRequestException;
import com.demo.demo.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/auth/login")
@RequiredArgsConstructor
public class AuthAdminController {
    private final AuthService authService;
    @PostMapping
    public ResponseEntity<AuthResponseDto> login (@RequestBody LoginRequestDto loginRequestDto) {

        return ResponseEntity.ok(authService.loginAdmin(loginRequestDto));
    }

    @GetMapping("/check-login")
    public ResponseEntity<UserAdminResponseDTO> getCurrentUser (@CurrentUser UserEntity currentUser) {
        String role = currentUser.getRoles().stream()
                .map(RoleEntity::getRoleName)
                .filter("ROLE_ADMIN"::equals)
                .findFirst()
                .orElseThrow(() -> new BadRequestException("User does not have ROLE_ADMIN"));

        UserAdminResponseDTO user = new UserAdminResponseDTO(currentUser.getUserId(),currentUser.getName(),currentUser.getLastName(),currentUser.getUsername(),role);
        return ResponseEntity.ok(user);
    }
}
