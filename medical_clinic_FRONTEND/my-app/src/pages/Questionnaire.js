import React, {useState} from "react";
import axios from 'axios';
import PatientMenu from "../components/PatientMenu";


const Questionnaire = () => {
    const [symptoms, setSymptoms] = useState({symptoms: {}});

    const handleSymptomChange = (event) => {
        const {name, value} = event.target;
        setSymptoms(prevState => ({
            ...prevState, symptoms: {
                ...prevState.symptoms, [name]: parseInt(value)
            }
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(symptoms)
        axios.post('http://localhost:8081/api/pacient/chestionar', symptoms, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                // Handle successful response
                console.log('Response:', response.data);
                // Further processing of response data if needed
            })
            .catch(error => {
                // Handle error
                console.error('Error:', error);
            });
    };

    const symptomNames = ["fatigue", "vomiting", "high_fever", "loss_of_appetite", "nausea", "headache", "abdominal_pain", "yellowish_skin", "yellowing_of_eyes", "chills", "skin_rash", "chest_pain", "sweating", "itching", "dark_urine", "cough", "diarrhoea", "irritability", "muscle_pain", "excessive_hunger", "weight_loss", "mild_fever", "loss_of_balance", "blurred_and_distorted_vision", "dizziness", "abnormal_menstruation", "fast_heart_rate", "constipation", "neck_pain", "obesity", "burning_micturition", "increased_appetite", "runny_nose", "cold_hands_and_feets"];

    return (<div className="pt-5">
        <PatientMenu/>
        <div className="max-w-md mx-auto bg-white p-5 rounded shadow-md text-center">
                <h2 className="text-center text-2xl font-bold text-gray-800 pb-8">Symptoms Form</h2>
                <form onSubmit={handleSubmit}>
                    {symptomNames.map(symptom => (<div key={symptom} className="mb-4">
                            <label className="mb-2 text-gray-700">
                                {symptom.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}:
                            </label>
                            <div className="">
                                <label className="mr-4">
                                    <input
                                        type="radio"
                                        name={symptom}
                                        value="1"
                                        checked={symptoms.symptoms[symptom] === 1}
                                        onChange={handleSymptomChange}
                                        className="mr-2 text-blue-500 focus:ring-blue-500"
                                    /> Yes
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name={symptom}
                                        value="0"
                                        checked={symptoms.symptoms[symptom] === 0}
                                        onChange={handleSymptomChange}
                                        className="mr-2 text-blue-500 focus:ring-blue-500"
                                    /> No
                                </label>
                            </div>
                    </div>))}
                    <input type="submit" value="Submit"
                           className="block mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"/>
                </form>
            </div>
    </div>);
}

export default Questionnaire;