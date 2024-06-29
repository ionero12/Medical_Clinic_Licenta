package com.example.medical_clinic_BACKEND.Controller;

import com.example.medical_clinic_BACKEND.Model.Boala;
import com.example.medical_clinic_BACKEND.Model.Symptoms;
import com.example.medical_clinic_BACKEND.Repository.BoalaRepository;
import org.dmg.pmml.FieldName;
import org.dmg.pmml.PMML;
import org.jpmml.evaluator.*;
import org.jpmml.model.PMMLUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.*;

@RestController
@RequestMapping("/api/pacient/chestionar")
public class SymptomController {

    private final BoalaRepository boalaRepository;
    private final Evaluator evaluator;

    public SymptomController(BoalaRepository boalaRepository) throws Exception {
        PMML pmml;
        try (InputStream in = new FileInputStream("src/main/resources/gaussian_nb_model_new2.pmml")) {
            pmml = PMMLUtil.unmarshal(in);
        }

        ModelEvaluatorBuilder modelEvaluatorBuilder = new ModelEvaluatorBuilder(pmml);
        this.evaluator = modelEvaluatorBuilder.build();
        this.boalaRepository = boalaRepository;
    }

    @PostMapping
    public ResponseEntity<String> receiveSymptoms(@RequestBody Symptoms symptoms) throws Exception {
        Map<String, List<String>> specializationToDiseases = new HashMap<>();
        specializationToDiseases.put("Dermatology", Arrays.asList("Acne", "Psoriasis", "Fungal infection", "Impetigo"));
        specializationToDiseases.put("Cardiology", Arrays.asList("Hypertension", "Varicose Veins"));
        specializationToDiseases.put("Neurology", Arrays.asList("Migraine", "Cervical spondylosis"));
        specializationToDiseases.put("Orthopedics", List.of("Arthritis"));
        specializationToDiseases.put("Gastroenterology", Arrays.asList("gastroesophageal reflux disease", "peptic ulcer disease", "Jaundice"));
        specializationToDiseases.put("Urology", List.of("urinary tract infection"));
        specializationToDiseases.put("Pharmacology", List.of("drug reaction"));
        specializationToDiseases.put("Endocrinology", List.of("diabetes"));
        specializationToDiseases.put("Allergology", List.of("allergy"));
        specializationToDiseases.put("Infectious", Arrays.asList("Typhoid", "Malaria", "Chicken pox", "Dengue", "Common Cold"));
        specializationToDiseases.put("Pneumology", Arrays.asList("Pneumonia", "Bronchial Asthma"));
        specializationToDiseases.put("Hematology", List.of("Dimorphic Hemorrhoids"));

        if (symptoms != null && symptoms.getPatientDescriptionOfSymptoms() != null) {
            System.out.println("Received Symptom: " + symptoms.getPatientDescriptionOfSymptoms());

            Map<FieldName, FieldValue> arguments = new LinkedHashMap<>();
            for (InputField inputField : evaluator.getActiveFields()) {
                FieldName activeField = inputField.getName();
                FieldValue activeValue = inputField.prepare(symptoms.getPatientDescriptionOfSymptoms());
                arguments.put(activeField, activeValue);
            }

            Map<FieldName, ?> results = evaluator.evaluate(arguments);

            TargetField targetField = evaluator.getTargetFields().get(0);
            FieldName targetName = targetField.getName();
            Object targetValue = results.get(targetName);

            if (targetValue instanceof ProbabilityDistribution distribution) {
                String predictedDisease = (String) distribution.getResult();
                for (Map.Entry<String, List<String>> entry : specializationToDiseases.entrySet()) {
                    if (entry.getValue().contains(predictedDisease)) {
                        Boala boala = boalaRepository.findByName(predictedDisease);
                        if (boala != null) {

                            String finalResponse = "The disease that matches your symptoms is: " + boala.getNumeBoala() + "<br>" + "<br>" + "Description: " + boala.getDescriereBoala() + "<br>" + "<br>" + "Please consult a doctor from " + entry.getKey() + " for further evaluation.";


                            return ResponseEntity.ok(finalResponse);
                        }
                    }
                }
            }
        }
        return ResponseEntity.badRequest().body("Invalid input");
    }
}