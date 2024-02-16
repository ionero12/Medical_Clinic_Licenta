package com.example.medical_clinic_project.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "medici")
public class Medic {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "MEDIC_SEQ")
    @SequenceGenerator(name = "MEDIC_SEQ", sequenceName = "MEDIC_SEQ", allocationSize = 1)
    @Column(name = "id_medic")
    private Long idMedic;

    @Column(name = "nume_medic", nullable = false, length = 64)
    private String numeMedic;

    @Column(name = "prenume_medic", nullable = false, length = 64)
    private String prenumeMedic;

    @Column(name = "data_nastere_medic", nullable = false)
    private LocalDate dataNastereMedic;

    @Column(name = "cnp_medic", nullable = false)
    private String cnpMedic;

    @Column(name = "telefon_medic", nullable = false, length = 16)
    private String telefonMedic;

    @Column(name = "email_medic", nullable = false, length = 128)
    private String emailMedic;

    @JsonBackReference
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "specializari_id_specializare", nullable = false)
    private Specializare specializare;

    @Column(name = "parola_medic", nullable = false, length = 64)
    private String parolaMedic;

    public Medic() {

    }

    public Medic(Long idMedic, String numeMedic, String prenumeMedic, LocalDate dataNastereMedic, String cnpMedic, String telefonMedic, String emailMedic, Specializare specializare, String parolaMedic) {
        this.idMedic = idMedic;
        this.numeMedic = numeMedic;
        this.prenumeMedic = prenumeMedic;
        this.dataNastereMedic = dataNastereMedic;
        this.cnpMedic = cnpMedic;
        this.telefonMedic = telefonMedic;
        this.emailMedic = emailMedic;
        this.specializare = specializare;
        this.parolaMedic = parolaMedic;
    }

    public Long getIdMedic() {
        return idMedic;
    }

    public void setIdMedic(Long idMedic) {
        this.idMedic = idMedic;
    }

    public String getNumeMedic() {
        return numeMedic;
    }

    public void setNumeMedic(String numeMedic) {
        this.numeMedic = numeMedic;
    }

    public String getPrenumeMedic() {
        return prenumeMedic;
    }

    public void setPrenumeMedic(String prenumeMedic) {
        this.prenumeMedic = prenumeMedic;
    }

    public LocalDate getDataNastereMedic() {
        return dataNastereMedic;
    }

    public void setDataNastereMedic(LocalDate dataNastereMedic) {
        this.dataNastereMedic = dataNastereMedic;
    }

    public String getCnpMedic() {
        return cnpMedic;
    }

    public void setCnpMedic(String cnpMedic) {
        this.cnpMedic = cnpMedic;
    }

    public Specializare getSpecializare() {
        return specializare;
    }

    public void setSpecializare(Specializare specializare) {
        this.specializare = specializare;
    }

    public String getParolaMedic() {
        return parolaMedic;
    }

    public void setParolaMedic(String parolaMedic) {
        this.parolaMedic = parolaMedic;
    }

    public String getTelefonMedic() {
        return telefonMedic;
    }

    public void setTelefonMedic(String telefonMedic) {
        this.telefonMedic = telefonMedic;
    }

    public String getEmailMedic() {
        return emailMedic;
    }

    public void setEmailMedic(String emailMedic) {
        this.emailMedic = emailMedic;
    }
}

