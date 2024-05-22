package com.example.medical_clinic_BACKEND.Model;


import jakarta.persistence.*;

@Entity
@Table(name = "boli")
public class Boala {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "BOALA_SEQ")
    @SequenceGenerator(name = "BOALA_SEQ", sequenceName = "BOALA_SEQ", allocationSize = 1)
    @Column(name = "id_boala")
    private Long idBoala;

    @Column(name = "nume_boala", nullable = false, length = 64)
    private String numeBoala;

    @Column(name = "descriere_boala", nullable = false, length = 1024)
    private String descriereBoala;

    public Boala() {
    }

    public Boala(Long idBoala, String numeBoala, String descriereBoala) {
        this.idBoala = idBoala;
        this.numeBoala = numeBoala;
        this.descriereBoala = descriereBoala;
    }

    public Long getIdBoala() {
        return idBoala;
    }

    public void setIdBoala(Long idBoala) {
        this.idBoala = idBoala;
    }

    public String getNumeBoala() {
        return numeBoala;
    }

    public void setNumeBoala(String numeBoala) {
        this.numeBoala = numeBoala;
    }

    public String getDescriereBoala() {
        return descriereBoala;
    }

    public void setDescriereBoala(String descriereBoala) {
        this.descriereBoala = descriereBoala;
    }
}
