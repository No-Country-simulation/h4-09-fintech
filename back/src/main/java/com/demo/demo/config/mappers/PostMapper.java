package com.demo.demo.config.mappers;

import com.demo.demo.dtos.post.PostResposeDTO;
import com.demo.demo.entities.PostEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE,componentModel = MappingConstants.ComponentModel.SPRING)
public interface PostMapper {
    @Mapping(target = "userEntity.name", source = "userEntity.name")
    @Mapping(target = "userEntity.lastName", source = "userEntity.lastName")
    @Mapping(target = "userEntity.username", source = "userEntity.username")
    @Mapping(target = "userEntity.userId", source = "userEntity.userId")
    PostResposeDTO toPostResposeDTO(PostEntity postEntity);

    List<PostResposeDTO> toPostResposeDTOList(List<PostEntity> postsEntity);
}
