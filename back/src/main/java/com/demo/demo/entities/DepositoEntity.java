package com.demo.demo.entities;


import com.demo.demo.dtos.response.DepositoResponseDto;
import com.demo.demo.enums.Status;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name ="depositos")
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DepositoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID depositoId;
    private float monto;
    private LocalDate fechaRequest;

    private LocalDate fechaResponse;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @Enumerated(EnumType.STRING)
    private Status status;

    private String comprobante;
    @PrePersist
    public void prePersist() {
        if (status == null) {
            status = Status.PENDIENTE;
        }
    }

    public static DepositoEntity createDeposito (float monto, UserEntity user) {
        DepositoEntity deposito = new DepositoEntity();
        deposito.monto = monto;
        deposito.user = user;
        deposito.status = Status.PENDIENTE;
        deposito.fechaRequest = LocalDate.now();
        return deposito;
    }

    public DepositoResponseDto createResponseDto( ) {
        return new DepositoResponseDto(this.depositoId,this.monto,this.fechaRequest,this.fechaResponse,this.user.getName(),this.user.getLastName(),this.user.getUsername(),this.status,this.getComprobante(),this.user.getUserId());
    }
}
