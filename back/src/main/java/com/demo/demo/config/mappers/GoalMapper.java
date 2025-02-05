package com.demo.demo.config.mappers;

import com.demo.demo.dtos.goal.ResponseGoalDTO;
import com.demo.demo.entities.Goal;
import com.demo.demo.entities.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

import java.time.LocalDateTime;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface GoalMapper {

    @Mapping(target = "name", source = "goal.name")
    @Mapping(target = "currentAmount", source = "user.funds")
    @Mapping(target = "startDate", source = "goal.startDate", defaultExpression = "java(getDefaultStartDate(startDate))")
    @Mapping(target = "progressFunds", expression = "java(calculateProgressFunds(goal, user))")
    @Mapping(target = "progressActions", expression = "java(calculateProgressActions(goal, user))")
    @Mapping(target = "progressTotal",expression = "java((calculateProgressActions(goal, user) + calculateProgressFunds(goal, user)))")
    ResponseGoalDTO toResponseGoalDTO(Goal goal, UserEntity user);

    default LocalDateTime getDefaultStartDate(LocalDateTime startDate) {
        return startDate != null ? startDate : LocalDateTime.now();
    }

    default Float calculateProgressFunds(Goal goal, UserEntity user) {
        return (goal.getTargetAmount() > 0) ? ((user.getFunds() / goal.getTargetAmount()) * 100) : 0;
    }
    default Float calculateProgressActions(Goal goal, UserEntity user) {
        float priceActionTotal=user.getFinancialAssets().stream().map(fa ->
                fa.getPrice().floatValue() * user.getStockTransactions().stream().filter(st -> st.getIdSymbol().equals(fa.getId())).findFirst().get().getQuantity()).reduce(0f, Float::sum);
        return (priceActionTotal > 0) ? ((priceActionTotal / goal.getTargetAmount()) * 100) : 0;
    }
}
