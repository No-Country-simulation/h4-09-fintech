package com.demo.demo.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Goal {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID goalId;

    private String name;

    private int lastNotificationProgress = 0;
    private float targetAmount;
    //    private long currentAmount; lo tiene el usuario

    @UpdateTimestamp
    private LocalDateTime startDate;
    private LocalDateTime targetDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

}
