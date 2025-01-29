package com.demo.demo.config.mappers;

import com.demo.demo.dtos.request.RegisterRequestDto;
import com.demo.demo.entities.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import java.util.HashSet;
@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "username", source = "email")
    @Mapping(target = "name", source = "name")
    @Mapping(target = "lastName", source = "lastName")
    @Mapping(target = "roles", source = "roles")
    UserEntity toUserEntity(RegisterRequestDto dto);
}