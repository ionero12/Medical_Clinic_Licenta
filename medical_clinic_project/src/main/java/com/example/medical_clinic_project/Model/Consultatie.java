package com.example.medical_clinic_project.Model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "consultatii")
public class Consultatie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_consultatie")
    private int idConsultatie;

    @Column(name = "data_consultatiei", nullable = false)
    private Date dataConsultatiei;

    @ManyToOne
    @JoinColumn(name = "pacienti_id_pacient", nullable = false)
    private Pacient pacient;

    @ManyToOne
    @JoinColumn(name = "medici_id_medic", nullable = false)
    private Medic medic;

    @Column(name = "nume_consultatie", nullable = false, length = 64)
    private String numeConsultatie;

    public int getIdConsultatie() {
        return idConsultatie;
    }

    public void setIdConsultatie(int idConsultatie) {
        this.idConsultatie = idConsultatie;
    }

    public String getNumeConsultatie() {
        return numeConsultatie;
    }

    public void setNumeConsultatie(String numeConsultatie) {
        this.numeConsultatie = numeConsultatie;
    }

    public Pacient getPacientiIdPacient() {
        return pacient;
    }

    public void setPacientiIdPacient(Pacient pacient) {
        this.pacient = pacient;
    }

    public Date getDataConsultatiei() {
        return dataConsultatiei;
    }

    public void setDataConsultatiei(Date dataConsultatiei) {
        this.dataConsultatiei = dataConsultatiei;
    }

    public Medic getMediciIdMedic() {
        return medic;
    }

    public void setMediciIdMedic(Medic medic) {
        this.medic = medic;
    }
}
