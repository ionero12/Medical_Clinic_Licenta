package com.example.medical_clinic_project.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "medici")
public class Medic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_medic")
    private int idMedic;

    @Column(name = "nume_medic", nullable = false, length = 64)
    private String numeMedic;

    @Column(name = "prenume_medic", nullable = false, length = 64)
    private String prenumeMedic;

    @Column(name = "data_nastere_medic", nullable = false)
    private LocalDate dataNastereMedic;

    @Column(name = "telefon_medic", nullable = false, length = 16)
    private String telefonMedic;

    @Column(name = "email_medic", nullable = false, length = 128)
    private String emailMedic;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "specializari_id_specializare", nullable = false)
    private Specializare specializare;

    @Column(name = "parola_medic", nullable = false, length = 64)
    private String parolaMedic;

    public Medic()
    {

    }

    public Medic(int idMedic, String numeMedic, String prenumeMedic, LocalDate dataNastereMedic, String telefonMedic, String emailMedic, Specializare specializare, String parolaMedic) {
        this.idMedic = idMedic;
        this.numeMedic = numeMedic;
        this.prenumeMedic = prenumeMedic;
        this.dataNastereMedic = dataNastereMedic;
        this.telefonMedic = telefonMedic;
        this.emailMedic = emailMedic;
        this.specializare = specializare;
        this.parolaMedic = parolaMedic;
    }

    public int getIdMedic() {
        return idMedic;
    }

    public void setIdMedic(int idMedic) {
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

    public Specializare getSpecializariIdSpecializare() {
        return specializare;
    }

    public void setSpecializariIdSpecializare(Specializare specializare) {
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

