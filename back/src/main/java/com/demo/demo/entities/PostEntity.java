package com.demo.demo.entities;


import jakarta.persistence.*;
import lombok.*;
import org.springframework.context.annotation.Bean;

import java.time.LocalDateTime;

@Entity
@Table(name = "posts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity userEntity;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String subtitle;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String text;

    @Column(name = "creation_user", nullable = false)
    private LocalDateTime creationUser;

    @Column(name = "creation_date", nullable = false)
    private LocalDateTime creationDate;

    private String category;


}
