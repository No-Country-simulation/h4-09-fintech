package com.demo.demo.entities;

import com.demo.demo.dtos.request.CreateRetiroDto;
import com.demo.demo.dtos.response.RetiroResponseDto;
import com.demo.demo.enums.Status;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "retiros")
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RetiroEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID retiroId;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;
    private float monto;
    private LocalDate fechaRequest;
    private LocalDate fechaResponse;
    private String cbu;
    @Enumerated(EnumType.STRING)
    private Status status;

    @PrePersist
    public void prePersist() {
        if (status == null) {
            status = Status.PENDIENTE;
        }
    }

    public static RetiroEntity createRetiro(CreateRetiroDto d, UserEntity u) {
        RetiroEntity r = new RetiroEntity();
        r.setMonto(d.monto());
        r.setCbu(d.cbu());
        r.setStatus(Status.PENDIENTE);
        r.setUser(u);
        r.setFechaRequest(LocalDate.now());
        return r;
    }

    public RetiroResponseDto createResponseDto( ) {
        return new RetiroResponseDto(this.retiroId,this.monto,this.fechaRequest,this.fechaResponse,this.user.getName(),this.user.getLastName(),this.user.getUsername(),this.cbu,this.status,this.user.getUserId());
    }
}
