package com.demo.demo.entities;

import com.demo.demo.enums.FinancialKnowledge;
import com.demo.demo.enums.MainGoal;
import com.demo.demo.enums.RiskPreference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;
import java.util.stream.Collectors;

@Entity
@Table(name = "users")
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "user_id")
    private UUID userId;

    @Column(unique = true, nullable = false)
    private String username; //es el mail

    @Column()
    private String name;
    @Column()
    private String lastName;

    @Column()
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "main_goal", nullable = true)
    private MainGoal mainGoal;

    @Enumerated(EnumType.STRING)
    @Column(name = "financial_knowledge", nullable = true)
    private FinancialKnowledge financialKnowledge;

    @Enumerated(EnumType.STRING)
    @Column(name = "risk_preference", nullable = true)
    private RiskPreference riskPreference;




    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_role",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "role_id")
    )
    private Set<RoleEntity> roles = new HashSet<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.getRoleName()))
                .collect(Collectors.toList());
    }
}
