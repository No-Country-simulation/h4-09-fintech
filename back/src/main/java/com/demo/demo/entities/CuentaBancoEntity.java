package com.demo.demo.entities;


import com.demo.demo.dtos.request.UpdateCuentaBancoDto;
import com.demo.demo.dtos.response.CuentaBancoResponseDto;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Table
@Entity(name = "cuentas_banco")
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CuentaBancoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String titular;
    private String cbu;
    private String alias;
    private String cuit;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_created_id", nullable = false)
    private UserEntity userCreated;

    private LocalDate fechaCreacion;
    private LocalDate fechaModificacion;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="user_updated_id", nullable = false)
    private UserEntity userUpdated;

    public CuentaBancoResponseDto toDto() {
        return new CuentaBancoResponseDto(this.id,this.cuit,this.cbu,this.alias,this.titular);
    }

    public CuentaBancoEntity update (UpdateCuentaBancoDto dto,UserEntity user) {
        this.alias = dto.alias();
        this.cbu = dto.cbu();
        this.cuit = dto.cuit();
        this.titular = dto.titular();
        this.setUserUpdated(user);
        this.fechaModificacion = LocalDate.now();
        return this;
    }
}
