package com.example.medical_clinic_BACKEND.Repository;

import com.example.medical_clinic_BACKEND.Model.PretConsultatii;
import com.example.medical_clinic_BACKEND.Model.PretConsultatiiId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PretConsultatiiRepository extends JpaRepository<PretConsultatii, PretConsultatiiId> {
}
