package com.demo.demo.config.security.oauth2;

import com.demo.demo.entities.RoleEntity;
import com.demo.demo.entities.UserEntity;
import com.demo.demo.exceptions.BadRequestException;
import com.demo.demo.exceptions.NotFoundException;
import com.demo.demo.repositories.RoleRepository;
import com.demo.demo.repositories.UserRepository;
import io.micrometer.common.util.StringUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepo;

    @Transactional
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        try {
            return processOAuth2User(userRequest, oAuth2User);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }
    @Transactional
    protected OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        UserInfoOAuth userInfoOAuth = new UserInfoOAuth(oAuth2User.getAttributes());
        if (StringUtils.isEmpty(userInfoOAuth.getEmail())) {
            log.error("Email not found from OAuth2 provider");
            throw new BadRequestException("Email not found from OAuth2 provider");
        }
        Optional<UserEntity> userOptional = userRepository.findByUsername(userInfoOAuth.getEmail());
        UserEntity user;
        if (userOptional.isPresent()) {
            user = userOptional.get();
        } else {
            user = new UserEntity();
            user.setUsername(userInfoOAuth.getEmail());

            RoleEntity role = roleRepo.findRoleByName("ROLE_USER").orElseThrow(() -> new NotFoundException("Role not found"));
            user.getRoles().add(role);
            userRepository.save(user);
        }

        return UserPrincipal.create(user, oAuth2User.getAttributes());
    }
}