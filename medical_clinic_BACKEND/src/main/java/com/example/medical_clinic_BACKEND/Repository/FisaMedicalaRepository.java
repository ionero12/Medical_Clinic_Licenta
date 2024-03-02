package com.example.medical_clinic_BACKEND.Repository;

import com.example.medical_clinic_BACKEND.Model.FisaMedicala;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FisaMedicalaRepository extends JpaRepository<FisaMedicala, Long> {

}
