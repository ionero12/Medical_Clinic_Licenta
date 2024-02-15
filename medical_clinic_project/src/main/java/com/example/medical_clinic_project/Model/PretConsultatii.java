package com.example.medical_clinic_project.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "consultatii_preturi")
public class PretConsultatii {

    @EmbeddedId
    private PretConsultatiiId id;

    @ManyToOne
    @MapsId("consultatiiIdConsultatie")
    @JoinColumn(name = "consultatii_id_consultatie")
    private Consultatie consultatie;

    @ManyToOne
    @MapsId("preturiIdPret")
    @JoinColumn(name = "preturi_id_pret")
    private Pret pret;

    public PretConsultatiiId getId() {
        return id;
    }

    public void setId(PretConsultatiiId id) {
        this.id = id;
    }

    public Consultatie getConsultatie() {
        return consultatie;
    }

    public void setConsultatie(Consultatie consultatie) {
        this.consultatie = consultatie;
    }

    public Pret getPret() {
        return pret;
    }

    public void setPret(Pret pret) {
        this.pret = pret;
    }
}