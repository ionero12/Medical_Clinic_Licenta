package com.example.medical_clinic_project.Repository;

import com.example.medical_clinic_project.Model.Valoare;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ValoareRepository extends JpaRepository<Valoare, Long> {
}
