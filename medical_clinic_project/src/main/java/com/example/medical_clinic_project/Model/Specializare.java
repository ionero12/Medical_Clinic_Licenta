package com.example.medical_clinic_project.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "specializari")
public class Specializare {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SPECIALIZARE_SEQ")
    @SequenceGenerator(name = "SPECIALIZARE_SEQ", sequenceName = "SPECIALIZARE_SEQ", allocationSize = 1)
    @Column(name = "id_specializare")
    private Long idSpecializare;

    @Column(name = "nume_specializare", nullable = false, length = 64)
    private String numeSpecializare;

    @JsonIgnore
    @OneToMany(mappedBy = "specializare")
    private List<Medic> mediciList;

    public Specializare() {
    }

    public Specializare(Long idSpecializare, String numeSpecializare, List<Medic> mediciList) {
        this.idSpecializare = idSpecializare;
        this.numeSpecializare = numeSpecializare;
        this.mediciList = mediciList;
    }

    public Long getIdSpecializare() {
        return idSpecializare;
    }

    public void setIdSpecializare(Long idSpecializare) {
        this.idSpecializare = idSpecializare;
    }

    public String getNumeSpecializare() {
        return numeSpecializare;
    }

    public void setNumeSpecializare(String numeSpecializare) {
        this.numeSpecializare = numeSpecializare;
    }

    public List<Medic> getMediciList() {
        return mediciList;
    }

    public void setMediciList(List<Medic> mediciList) {
        this.mediciList = mediciList;
    }
}
