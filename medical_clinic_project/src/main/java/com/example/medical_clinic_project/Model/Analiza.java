package com.example.medical_clinic_project.Model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "analize")
public class Analiza {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ANALIZA_SEQ")
    @SequenceGenerator(name = "ANALIZA_SEQ", sequenceName = "ANALIZA_SEQ", allocationSize = 1)
    @Column(name = "id_analiza")
    private Long idAnaliza;


    @Column(name = "data_analiza", nullable = false)
    private LocalDate dataAnaliza;

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

    public Pacient getPacientiIdPacient() {
        return pacient;
    }

    public void setPacientiIdPacient(Pacient pacient) {
        this.pacient = pacient;
    }
}
