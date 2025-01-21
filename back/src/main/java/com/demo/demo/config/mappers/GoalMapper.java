package com.demo.demo.config.mappers;

import com.demo.demo.dtos.goal.ResponseGoalDTO;
import com.demo.demo.entities.Goal;
import com.demo.demo.entities.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE,componentModel = MappingConstants.ComponentModel.SPRING)
public interface GoalMapper {

    @Mapping(target = "name", source = "goal.name")
    @Mapping(target = "currentAmount", source = "user.currentAmount")
    @Mapping(target = "progress", expression =
            "java((goal.getTargetAmount() > 0) ? " +
                    "((user.getCurrentAmount() / goal.getTargetAmount()) * 100) : 0)")
    ResponseGoalDTO toResponseGoalDTO(Goal goal, UserEntity user);


}
