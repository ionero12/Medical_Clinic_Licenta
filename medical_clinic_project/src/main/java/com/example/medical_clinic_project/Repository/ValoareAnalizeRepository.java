package com.example.medical_clinic_project.Repository;

import com.example.medical_clinic_project.Model.ValoareAnalize;
import com.example.medical_clinic_project.Model.ValoareAnalizeId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ValoareAnalizeRepository extends JpaRepository<ValoareAnalize, ValoareAnalizeId> {
}
