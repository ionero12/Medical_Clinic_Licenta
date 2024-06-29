package com.example.medical_clinic_BACKEND.Machine_Learning;

import org.dmg.pmml.FieldName;
import org.dmg.pmml.PMML;
import org.jpmml.evaluator.*;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.LinkedHashMap;
import java.util.Map;

public class PMMLClassifier {

    public static void main(String[] args) throws Exception {
        PMML pmml;
        try (InputStream in = new FileInputStream("C:\\Users\\Ione\\Desktop\\test1\\bayes\\gaussian_nb_model_new2.pmml")) {
            pmml = org.jpmml.model.PMMLUtil.unmarshal(in);
        }

        ModelEvaluatorBuilder modelEvaluatorBuilder = new ModelEvaluatorBuilder(pmml);
        ModelEvaluator<?> modelEvaluator = modelEvaluatorBuilder.build();


        Map<FieldName, FieldValue> arguments = new LinkedHashMap<>();
        for (InputField inputField : modelEvaluator.getActiveFields()) {
            FieldName activeField = inputField.getName();
            FieldValue activeValue = inputField.prepare("I have bloody stool, constipation,my butt hurts.");
            arguments.put(activeField, activeValue);
        }

        Map<FieldName, ?> results = modelEvaluator.evaluate(arguments);

        TargetField targetField = modelEvaluator.getTargetFields().get(0);
        FieldName targetName = targetField.getName();
        Object targetValue = results.get(targetName);

        if (targetValue instanceof ProbabilityDistribution distribution) {
            String predictedDisease = (String) distribution.getResult();
            System.out.println("Predicted disease: " + predictedDisease);
        } else {
            System.out.println("The model did not return a probability distribution.");
        }
    }
}

