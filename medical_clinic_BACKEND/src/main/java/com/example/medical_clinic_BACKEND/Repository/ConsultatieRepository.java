package com.example.medical_clinic_BACKEND.Repository;

import com.example.medical_clinic_BACKEND.Model.Consultatie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConsultatieRepository extends JpaRepository<Consultatie, Long> {

    @Query("SELECT c FROM Consultatie c WHERE c.medic.idMedic = ?1")
    List<Consultatie> findByIdMedic(Long idMedic);

    @Query("SELECT c FROM Consultatie c WHERE c.pacient.idPacient = ?1")
    List<Consultatie> findByIdPacient(Long idPacient);

    @Query("SELECT c FROM Consultatie c WHERE c.numeConsultatie = ?1")
    List<Consultatie> findByName(String numeConsultatie);
}
