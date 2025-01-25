package com.demo.demo.config.mappers;

import com.demo.demo.dtos.notification.NotificationResponseDTO;
import com.demo.demo.entities.Notification;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE,componentModel = MappingConstants.ComponentModel.SPRING)
public interface NotificationMapper {

    NotificationResponseDTO toNotificationResponseDTO(Notification notification);

    List<NotificationResponseDTO> toNotificationResponseDTOList(List<Notification> notifications);
}
