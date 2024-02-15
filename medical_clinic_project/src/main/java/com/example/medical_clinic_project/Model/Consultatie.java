package com.example.medical_clinic_project.Model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "consultatii")
public class Consultatie {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CONSULTATIE_SEQ")
    @SequenceGenerator(name = "CONSULTATIE_SEQ", sequenceName = "CONSULTATIE_SEQ", allocationSize = 1)
    @Column(name = "id_consultatie")
    private Long idConsultatie;


    @Column(name = "data_consultatiei", nullable = false)
    private LocalDate dataConsultatiei;

    @ManyToOne
    @JoinColumn(name = "pacienti_id_pacient", nullable = false)
    private Pacient pacient;

    @ManyToOne
    @JoinColumn(name = "medici_id_medic", nullable = false)
    private Medic medic;

    @Column(name = "nume_consultatie", nullable = false, length = 64)
    private String numeConsultatie;

    public Consultatie() {
    }

    public Consultatie(Long idConsultatie, LocalDate dataConsultatiei, Pacient pacient, Medic medic, String numeConsultatie) {
        this.idConsultatie = idConsultatie;
        this.dataConsultatiei = dataConsultatiei;
        this.pacient = pacient;
        this.medic = medic;
        this.numeConsultatie = numeConsultatie;
    }

    public Long getIdConsultatie() {
        return idConsultatie;
    }

    public void setIdConsultatie(Long idConsultatie) {
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

    public LocalDate getDataConsultatiei() {
        return dataConsultatiei;
    }

    public void setDataConsultatiei(LocalDate dataConsultatiei) {
        this.dataConsultatiei = dataConsultatiei;
    }

    public Medic getMediciIdMedic() {
        return medic;
    }

    public void setMediciIdMedic(Medic medic) {
        this.medic = medic;
    }
}
