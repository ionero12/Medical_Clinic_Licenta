package com.example.medical_clinic_BACKEND.Repository;

import com.example.medical_clinic_BACKEND.Model.Analiza;
import com.example.medical_clinic_BACKEND.Model.Boala;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BoalaRepository extends JpaRepository<Analiza, Long> {

    @Query("SELECT b FROM Boala b WHERE b.numeBoala = ?1")
    Boala findByName(String predictedDisease);
}
