package com.example.medical_clinic_BACKEND.Controller;

import com.example.medical_clinic_BACKEND.Service.SymptomService;
import com.example.medical_clinic_BACKEND.Model.Symptoms;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import weka.classifiers.trees.J48;
import weka.core.*;
import weka.core.converters.CSVLoader;

import java.io.File;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/pacient/chestionar")
public class SymptomController {

    private final SymptomService symptomService;
    private J48 model;
    private Instances trainData;

    @Autowired
    public SymptomController(SymptomService symptomService) throws Exception {
        this.symptomService = symptomService;
        this.model = (J48) SerializationHelper.read("D:\\Facultate\\Licenta\\Medical_Clinic_Licenta\\medical_clinic_BACKEND\\src\\main\\java\\com\\example\\medical_clinic_BACKEND\\Machine_Learning\\trained_model.model");

        // Load training data
        CSVLoader loader = new CSVLoader();
        loader.setSource(new File("D:\\Facultate\\Licenta\\Medical_Clinic_Licenta\\medical_clinic_BACKEND\\src\\main\\java\\com\\example\\medical_clinic_BACKEND\\Machine_Learning\\training_data1.csv"));
        this.trainData = loader.getDataSet();
        this.trainData.setClassIndex(this.trainData.numAttributes() - 1);
    }

    @PostMapping
    public ResponseEntity<String> receiveSymptoms(@RequestBody Symptoms symptoms) throws Exception {
        Map<String, List<String>> diseasesBySpecialization = new HashMap<>();
        diseasesBySpecialization.put("Dermatologie", Arrays.asList("Acnee", "Psoriazis", "Impetigo", "Infectie fungica"));
        diseasesBySpecialization.put("Gastroenterologie", Arrays.asList("Boala de reflux gastroesofagian", "Colestaza cronica", "Boala ulcerului peptic", "Gastroenterita", "Hepatita A", "Hepatita B", "Hepatita C", "Hepatita D", "Hepatita E", "Hepatita alcoolica"));
        diseasesBySpecialization.put("Cardiologie", Arrays.asList("Hipertensiune", "Atac de cord", "Varice"));
        diseasesBySpecialization.put("Endocrinologie", Arrays.asList("Diabet", "Hipotiroidism", "Hipertiroidism", "Hipoglicemie"));
        diseasesBySpecialization.put("Reumatologie", Arrays.asList("Osteoartrita", "Artrita"));
        diseasesBySpecialization.put("Neurologie", Arrays.asList("Migrena", "Spondiloza cervicala", "Paralizie", "Vertij pozițional paroxistic"));
        diseasesBySpecialization.put("Infectioase", Arrays.asList("HIV", "Icter", "Malarie", "Varicela", "Dengue", "Tifoida", "Tuberculoza", "Raceala comuna", "Pneumonie"));
        diseasesBySpecialization.put("Urologie", List.of("Infectii ale tractului urinar"));
        diseasesBySpecialization.put("Pneumologie", List.of("Astm bronsic"));
        diseasesBySpecialization.put("Hematologie", List.of("Hemoroizi dimorfi"));
        diseasesBySpecialization.put("Alergologie", List.of("Alergie"));
        diseasesBySpecialization.put("Farmacologie", List.of("Reactie la medicamente"));

        if (symptoms != null && symptoms.getSymptoms() != null) {
            System.out.println("Received Symptoms: " + symptoms);
            Instance newInstance = new DenseInstance(symptoms.getSymptoms().size());
            for (Map.Entry<String, Integer> entry : symptoms.getSymptoms().entrySet()) {
                Attribute att = trainData.attribute(entry.getKey());
                if (att != null) {
                    newInstance.setValue(att, entry.getValue());
                } else {
                    System.out.println("Atributul nu există în trainData: " + entry.getKey());
                }
            }
            Instances instances = new Instances(trainData, 0);
            instances.add(newInstance);
            instances.setClassIndex(instances.numAttributes() - 1);
            double predictedClass = model.classifyInstance(instances.firstInstance());
            String predictedDisease = trainData.classAttribute().value((int) predictedClass);

            for (Map.Entry<String, List<String>> entry : diseasesBySpecialization.entrySet()) {
                if (entry.getValue().contains(predictedDisease)) {
                    return ResponseEntity.ok("Boala care se potriveste cu simpotomele tale este " +  predictedDisease + ". Te rugam sa consulti un medic de la specializarea " + entry.getKey() + ".");
                }
            }

            return ResponseEntity.ok("Boala prezisa: " + predictedDisease);
        } else {
            System.out.println("Received Symptoms: null");
            return ResponseEntity.badRequest().build();
        }
    }
}