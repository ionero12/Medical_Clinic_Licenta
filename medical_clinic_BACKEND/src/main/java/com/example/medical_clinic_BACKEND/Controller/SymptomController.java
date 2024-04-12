package com.example.medical_clinic_BACKEND.Controller;

import com.example.medical_clinic_BACKEND.Service.SymptomService;
import com.example.medical_clinic_BACKEND.Model.Symptoms;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import weka.classifiers.trees.J48;
import weka.core.Instances;
import weka.core.SerializationHelper;
import weka.core.Instance;
import weka.core.DenseInstance;
import weka.core.converters.CSVLoader;

import java.io.File;
import java.util.Map;

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
        loader.setSource(new File("D:\\Facultate\\Licenta\\Medical_Clinic_Licenta\\medical_clinic_BACKEND\\src\\main\\java\\com\\example\\medical_clinic_BACKEND\\Machine_Learning\\training_data.csv"));
        this.trainData = loader.getDataSet();
        this.trainData.setClassIndex(this.trainData.numAttributes() - 1);
    }

    @PostMapping
    public ResponseEntity<String> receiveSymptoms(@RequestBody Symptoms symptoms) throws Exception {
        if (symptoms != null && symptoms.getSymptoms() != null) {
            // Check if symptoms object and symptoms map are not null
            System.out.println("Received Symptoms: " + symptoms);
            // Create a new instance for the received symptoms
            Instance newInstance = new DenseInstance(symptoms.getSymptoms().size());
            // Set the values of the instance to the received symptoms
            for (Map.Entry<String, Integer> entry : symptoms.getSymptoms().entrySet()) {
                newInstance.setValue(trainData.attribute(entry.getKey()), entry.getValue());
            }
            // Create a new Instances object with the same structure as trainData and add newInstance to it
            Instances instances = new Instances(trainData, 0);
            instances.add(newInstance);
            instances.setClassIndex(instances.numAttributes() - 1);
            // Predict the disease
            double predictedClass = model.classifyInstance(instances.firstInstance());
            String predictedDisease = trainData.classAttribute().value((int) predictedClass);
            return ResponseEntity.ok(predictedDisease);
        } else {
            System.out.println("Received Symptoms: null");
            return ResponseEntity.badRequest().build(); // Return bad request if symptoms are null
        }
    }
}