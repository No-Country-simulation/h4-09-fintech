package com.demo.demo.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    @Column(length = 400)
    private String message;
    private Boolean isRead;
    @UpdateTimestamp
    private String createdAt;
    private String type;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;


}
