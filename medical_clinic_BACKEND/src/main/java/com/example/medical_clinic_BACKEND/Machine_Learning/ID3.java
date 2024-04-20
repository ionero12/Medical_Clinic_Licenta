package com.example.medical_clinic_BACKEND.Machine_Learning;

import weka.attributeSelection.ASEvaluation;
import weka.attributeSelection.ASSearch;
import weka.attributeSelection.AttributeSelection;
import weka.attributeSelection.InfoGainAttributeEval;
import weka.attributeSelection.Ranker;
import weka.classifiers.Evaluation;
import weka.classifiers.trees.J48;
import weka.core.SerializationHelper;
import weka.core.Instances;
import weka.core.converters.CSVLoader;

import java.io.File;
import java.util.Random;

public class ID3 {
    public static void main(String[] args) throws Exception {
        // Load training data
        CSVLoader loader = new CSVLoader();
        loader.setSource(new File("D:\\Facultate\\Licenta\\Medical_Clinic_Licenta\\medical_clinic_BACKEND\\src\\main\\java\\com\\example\\medical_clinic_BACKEND\\Machine_Learning\\training_data1.csv"));
        Instances trainData = loader.getDataSet();
        trainData.setClassIndex(trainData.numAttributes() - 1);

        // Load testing data
        loader.setSource(new File("D:\\Facultate\\Licenta\\Medical_Clinic_Licenta\\medical_clinic_BACKEND\\src\\main\\java\\com\\example\\medical_clinic_BACKEND\\Machine_Learning\\test_data1.csv"));
        Instances testData = loader.getDataSet();
        testData.setClassIndex(testData.numAttributes() - 1);

        // Create the AttributeSelection object
        AttributeSelection selector = new AttributeSelection();
        ASEvaluation evaluator = new InfoGainAttributeEval();
        ASSearch search = new Ranker();
        selector.setEvaluator(evaluator);
        selector.setSearch(search);
        selector.SelectAttributes(trainData);

        // Print the attribute rankings
        int[] indices = selector.selectedAttributes();
        System.out.println("Ranked attributes:");
        for (int index : indices) {
            System.out.println(index + " " + trainData.attribute(index).name());
        }

        // Initialize and train J48 (an implementation of ID3)
        J48 model = new J48();
        model.buildClassifier(trainData);

        // Evaluate model
        Evaluation eval = new Evaluation(trainData);
        eval.evaluateModel(model, testData);
        System.out.println("Accuracy: " + (1.0 - eval.errorRate()));

        SerializationHelper.write("D:\\Facultate\\Licenta\\Medical_Clinic_Licenta\\medical_clinic_BACKEND\\src\\main\\resources\\trained_model.model", model);

    }
}
