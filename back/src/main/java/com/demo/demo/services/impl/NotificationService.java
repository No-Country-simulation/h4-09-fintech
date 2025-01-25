package com.demo.demo.services.impl;

import com.demo.demo.config.mappers.NotificationMapper;
import com.demo.demo.dtos.notification.NotificationResponseDTO;
import com.demo.demo.entities.Goal;
import com.demo.demo.entities.Notification;
import com.demo.demo.entities.UserEntity;
import com.demo.demo.services.UserService;
import com.demo.demo.services.api.OpenIA;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationMapper notificationMapper;
    private final OpenIA openAiApi;

    public List<Notification> accordingToProgress(List<Goal> goals, UserEntity user) {

        goals.stream().forEach(goal -> {

            Notification notification = new Notification();
            if (goal.getLastNotificationProgress() + 20 <= ((user.getFunds()*100)/goal.getTargetAmount())
            && !(goal.getLastNotificationProgress() > 100)) {
                notification.setTitle("Avance en tu objetivo: " + goal.getName());
                ChatResponse response = openAiApi.getChatModelNotification().call(new Prompt(createPrompt(user)));
                notification.setMessage(response.getResults().getFirst().getOutput().getContent());
                notification.setType("goal");
                notification.setIsRead(false);
                goal.setLastNotificationProgress(goal.getLastNotificationProgress() + 20);
                notification.setUser(user);
                user.getNotifications().add(notification);
            }
        });
        return user.getNotifications();
    }

    private String createPrompt(UserEntity user) {
        // Crear un prompt dinámico

        return String.format(
                "Crea un mensaje de notificación personalizado para un usuario que está alcanzando una meta financiera.\n" +
                        "Datos del usuario:\n" +
                        "- Nombre: %s\n" +
                        "- Conocimiento financiero: %s\n" +
                        "- Meta principal: %s\n" +
                        "- Preferencia de riesgo: %s\n" +
                        "- Progreso actual: %d%%\n" +
                        "- Mensaje motivador y educativo:\n"+
                        "- Respondeme en menos de 250 caracteres.\n"+
                        "- mostrando el porcentage del progreso en el mensaje.",
                user.getName(), user.getFinancialKnowledge(), user.getMainGoal(), user.getRiskPreference(), (int)((user.getFunds() * 100) / user.getGoals().get(0).getTargetAmount()));
    }

    public NotificationResponseDTO notificationIsRead(
            UserEntity user,
            Long notificationId) {

        Notification notification = user.getNotifications().stream()
                .filter(n -> n.getId().equals(notificationId))
                .findFirst().get();
        notification.setIsRead(true);

        return notificationMapper.toNotificationResponseDTO(notification);
    }

    public List<NotificationResponseDTO> getAllNotifications(UserEntity user) {
        System.out.println(user.getNotifications());
        return notificationMapper.toNotificationResponseDTOList(user.getNotifications());
    }
}
