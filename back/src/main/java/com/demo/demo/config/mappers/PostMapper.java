package com.demo.demo.config.mappers;

import com.demo.demo.dtos.post.PostResposeDTO;
import com.demo.demo.entities.PostEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE,componentModel = MappingConstants.ComponentModel.SPRING)
public interface PostMapper {
    PostResposeDTO toPostResposeDTO(PostEntity postEntity);

    List<PostResposeDTO> toPostResposeDTOList(List<PostEntity> postsEntity);
}
