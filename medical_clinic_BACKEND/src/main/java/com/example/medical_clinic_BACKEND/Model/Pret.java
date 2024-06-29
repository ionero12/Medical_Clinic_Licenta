package com.example.medical_clinic_BACKEND.Model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "preturi")
public class Pret {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PRET_SEQ")
    @SequenceGenerator(name = "PRET_SEQ", sequenceName = "PRET_SEQ", allocationSize = 1)
    @Column(name = "id_pret")
    private Long idPret;

    @Column(name = "pret_fara_abonament", nullable = false)
    private Double pretFaraAbonament;

    @Column(name = "pret_cu_abonament", nullable = false)
    private Double pretCuAbonament;

    @JsonManagedReference(value = "consultatie-pret")
    @OneToMany(mappedBy = "pret")
    private List<Consultatie> consultatii;

    public Pret() {
    }

    public Pret(Long idPret, Double pretFaraAbonament, Double pretCuAbonament, List<Consultatie> consultatii) {
        this.idPret = idPret;
        this.pretFaraAbonament = pretFaraAbonament;
        this.pretCuAbonament = pretCuAbonament;
        this.consultatii = consultatii;
    }

    public Long getIdPret() {
        return idPret;
    }

    public void setIdPret(Long idPret) {
        this.idPret = idPret;
    }

    public Double getPretFaraAbonament() {
        return pretFaraAbonament;
    }

    public void setPretFaraAbonament(Double pretFaraAbonament) {
        this.pretFaraAbonament = pretFaraAbonament;
    }

    public Double getPretCuAbonament() {
        return pretCuAbonament;
    }

    public void setPretCuAbonament(Double pretCuAbonament) {
        this.pretCuAbonament = pretCuAbonament;
    }

    public List<Consultatie> getConsultatii() {
        return consultatii;
    }

    public void setConsultatii(List<Consultatie> consultatii) {
        this.consultatii = consultatii;
    }
}
