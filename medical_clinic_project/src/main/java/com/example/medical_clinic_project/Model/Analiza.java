package com.example.medical_clinic_project.Model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "analize")
public class Analiza {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_analiza")
    private int idAnaliza;

    @Column(name = "data_analiza", nullable = false)
    private Date dataAnaliza;

    @ManyToOne
    @JoinColumn(name = "pacienti_id_pacient", nullable = false)
    private Pacient pacient;

    public int getIdAnaliza() {
        return idAnaliza;
    }

    public void setIdAnaliza(int idAnaliza) {
        this.idAnaliza = idAnaliza;
    }

    public Date getDataAnaliza() {
        return dataAnaliza;
    }

    public void setDataAnaliza(Date dataAnaliza) {
        this.dataAnaliza = dataAnaliza;
    }

    public Pacient getPacientiIdPacient() {
        return pacient;
    }

    public void setPacientiIdPacient(Pacient pacient) {
        this.pacient = pacient;
    }
}
