package com.example.medical_clinic_BACKEND.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "analize")
public class Analiza {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_analiza")
    private Long idAnaliza;

    @Column(name = "data_analiza", nullable = false)
    private LocalDate dataAnaliza;

    @JsonBackReference(value = "pacient-analize")
    @ManyToOne
    @JoinColumn(name = "pacienti_id_pacient", nullable = false)
    private Pacient pacient;

    public Analiza() {
    }

    public Analiza(Long idAnaliza, LocalDate dataAnaliza, Pacient pacient) {
        this.idAnaliza = idAnaliza;
        this.dataAnaliza = dataAnaliza;
        this.pacient = pacient;
    }

    public Long getIdAnaliza() {
        return idAnaliza;
    }

    public void setIdAnaliza(Long idAnaliza) {
        this.idAnaliza = idAnaliza;
    }

    public LocalDate getDataAnaliza() {
        return dataAnaliza;
    }

    public void setDataAnaliza(LocalDate dataAnaliza) {
        this.dataAnaliza = dataAnaliza;
    }

    public Pacient getPacient() {
        return pacient;
    }

    public void setPacient(Pacient pacient) {
        this.pacient = pacient;
    }
}
