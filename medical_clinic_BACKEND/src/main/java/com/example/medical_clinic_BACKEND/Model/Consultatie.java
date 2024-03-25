package com.example.medical_clinic_BACKEND.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "consultatii")
public class Consultatie {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CONSULTATIE_SEQ")
    @SequenceGenerator(name = "CONSULTATIE_SEQ", sequenceName = "CONSULTATIE_SEQ", allocationSize = 1)
    @Column(name = "id_consultatie")
    private Long idConsultatie;

    @Column(name = "data_consultatiei", nullable = false)
    private LocalDateTime dataConsultatiei;

    @JsonBackReference(value = "pacient-consultatii")
    @ManyToOne
    @JoinColumn(name = "pacienti_id_pacient", nullable = false)
    private Pacient pacient;

    @JsonBackReference(value = "medic-consultatii")
    @ManyToOne
    @JoinColumn(name = "medici_id_medic", nullable = false)
    private Medic medic;

    @Column(name = "nume_consultatie", nullable = false, length = 64)
    private String numeConsultatie;

    @JsonBackReference(value="consultatie-pret")
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "preturi_id_pret", nullable = false)
    private Pret pret;

    public Consultatie() {
    }

    public Consultatie(Long idConsultatie, LocalDateTime dataConsultatiei, Pacient pacient, Medic medic, String numeConsultatie, Pret pret) {
        this.idConsultatie = idConsultatie;
        this.dataConsultatiei = dataConsultatiei;
        this.pacient = pacient;
        this.medic = medic;
        this.numeConsultatie = numeConsultatie;
        this.pret = pret;
    }

    public Long getIdConsultatie() {
        return idConsultatie;
    }

    public void setIdConsultatie(Long idConsultatie) {
        this.idConsultatie = idConsultatie;
    }

    public LocalDateTime getDataConsultatiei() {
        return dataConsultatiei;
    }

    public void setDataConsultatiei(LocalDateTime dataConsultatiei) {
        this.dataConsultatiei = dataConsultatiei;
    }

    public Pacient getPacient() {
        return pacient;
    }

    public void setPacient(Pacient pacient) {
        this.pacient = pacient;
    }

    public Medic getMedic() {
        return medic;
    }

    public void setMedic(Medic medic) {
        this.medic = medic;
    }

    public String getNumeConsultatie() {
        return numeConsultatie;
    }

    public void setNumeConsultatie(String numeConsultatie) {
        this.numeConsultatie = numeConsultatie;
    }

    public void setNumeMedic(String numeMedic) {
        this.medic.setNumeMedic(numeMedic);
    }

    public String getNumeMedic() {
        return this.medic.getNumeMedic();
    }

    public void setPrenumeMedic(String prenumeMedic) {
        this.medic.setPrenumeMedic(prenumeMedic);
    }

    public String getPrenumeMedic() {
        return this.medic.getPrenumeMedic();
    }

    public void setNumePacient(String numePacient) {
        this.pacient.setNumePacient(numePacient);
    }

    public String getNumePacient() {
        return this.pacient.getNumePacient();
    }

    public void setPrenumePacient(String prenumePacient) {
        this.pacient.setPrenumePacient(prenumePacient);
    }

    public String getPrenumePacient() {
        return this.pacient.getPrenumePacient();
    }

    public Pret getPret() {
        return pret;
    }

    public void setPret(Pret pret) {
        this.pret = pret;
    }

    public void setPretFaraAbonament(Double pretFaraAbonament) {
        this.pret.setPretFaraAbonament(pretFaraAbonament);
    }

    public Double getPretFaraAbonament() {
        return this.pret.getPretFaraAbonament();
    }

    public void setPretCuAbonament(Double pretCuAbonament) {
        this.pret.setPretCuAbonament(pretCuAbonament);
    }

    public Double getPretCuAbonament() {
        return this.pret.getPretCuAbonament();
    }
}
