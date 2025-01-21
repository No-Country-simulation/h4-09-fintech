package com.demo.demo.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;
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

    @UpdateTimestamp
    private Date startDate;
    private Date targetDate;

    private float targetAmount;
//    private long currentAmount; lo tiene el usuario

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

}
