package com.example.medical_clinic_BACKEND.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "consultatii")
public class Consultatie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_consultatie")
    private Long idConsultatie;

    @Column(name = "data_consultatiei")
    private LocalDateTime dataConsultatiei;

    @JsonBackReference(value = "pacient-consultatii")
    @ManyToOne
    @JoinColumn(name = "pacienti_id_pacient")
    private Pacient pacient;

    @JsonBackReference(value = "medic-consultatii")
    @ManyToOne
    @JoinColumn(name = "medici_id_medic")
    private Medic medic;

    @Column(name = "nume_consultatie", nullable = false, length = 64)
    private String numeConsultatie;

    @JsonBackReference(value = "consultatie-pret")
    @ManyToOne
    @JoinColumn(name = "preturi_id_pret", nullable = false)
    private Pret pret;

    @Column(name = "rating")
    private Integer rating;

    @Column(name = "feedback", length = 256)
    private String feedback;

    @OneToMany(mappedBy = "consultatie", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Payment> payments = new HashSet<>();

    public Consultatie() {
    }

    public Consultatie(Long idConsultatie, LocalDateTime dataConsultatiei, Pacient pacient, Medic medic, String numeConsultatie, Pret pret, Integer rating, String feedback, Set<Payment> payments) {
        this.idConsultatie = idConsultatie;
        this.dataConsultatiei = dataConsultatiei;
        this.pacient = pacient;
        this.medic = medic;
        this.numeConsultatie = numeConsultatie;
        this.pret = pret;
        this.rating = rating;
        this.feedback = feedback;
        this.payments = payments;
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

    public String getNumeMedic() {
        return this.medic.getNumeMedic();
    }

    public void setNumeMedic(String numeMedic) {
        this.medic.setNumeMedic(numeMedic);
    }

    public String getPrenumeMedic() {
        return this.medic.getPrenumeMedic();
    }

    public void setPrenumeMedic(String prenumeMedic) {
        this.medic.setPrenumeMedic(prenumeMedic);
    }

    public String getNumePacient() {
        return this.pacient.getNumePacient();
    }

    public void setNumePacient(String numePacient) {
        this.pacient.setNumePacient(numePacient);
    }

    public String getPrenumePacient() {
        return this.pacient.getPrenumePacient();
    }

    public void setPrenumePacient(String prenumePacient) {
        this.pacient.setPrenumePacient(prenumePacient);
    }

    public Pret getPret() {
        return pret;
    }

    public void setPret(Pret pret) {
        this.pret = pret;
    }

    public Double getPretFaraAbonament() {
        return this.pret.getPretFaraAbonament();
    }

    public void setPretFaraAbonament(Double pretFaraAbonament) {
        this.pret.setPretFaraAbonament(pretFaraAbonament);
    }

    public Double getPretCuAbonament() {
        return this.pret.getPretCuAbonament();
    }

    public void setPretCuAbonament(Double pretCuAbonament) {
        this.pret.setPretCuAbonament(pretCuAbonament);
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }
}
