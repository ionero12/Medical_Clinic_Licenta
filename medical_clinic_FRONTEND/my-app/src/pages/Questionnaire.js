import React, {useState} from "react";
import PatientMenu from "../components/PatientMenu";
import DiseaseModal from "../components/DiseaseModal";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import api from '../user/api.js'


const Questionnaire = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [responseData, setResponseData] = useState(null);
    const [patientSymptoms, setPatientSymptoms] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const fever = document.querySelector('input[name="fever"]:checked')?.value === "yes" ? "fever" : null;
        const bloodystool = document.querySelector('input[name="bloody stool"]:checked')?.value === "yes" ? "bloody stool" : null;
        const runnynose = document.querySelector('input[name="runny nose"]:checked')?.value === "yes" ? "runny nose" : null;
        const headache = document.querySelector('input[name="headache"]:checked')?.value === "yes" ? "headache" : null;
        const cough = document.querySelector('input[name="cough"]:checked')?.value === "yes" ? "cough" : null;

        const symptomsArray = [fever, bloodystool, runnynose, headache, cough].filter(Boolean);

        const symptomsText = symptomsArray.length ? ` Symptoms ${symptomsArray.join(', ')}.` : '';

        const symptoms = patientSymptoms + symptomsText;

        api.post('/pacient/chestionar', symptoms, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                setResponseData(response.data);
                setModalOpen(true);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (<div>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            draggable
            theme="light"
        />
        <div className="pt-5 pb-12 px-4 md:px-0">
            <PatientMenu/>
            <div className="max-w-full md:max-w-md mx-auto bg-white p-5 rounded-2xl shadow-md text-center mt-4">
                <h2 className="text-3xl font-bold mt-2 mb-2 text-center">Diagnose Symptoms</h2>
                <div className="text-center p-3 rounded-lg shadow-md">
                    <p className="text-gray-700  leading-relaxed mb-4">
                        Welcome to our symptom diagnosis tool. Please describe your symptoms below to receive
                        personalized medical advice.
                    </p>
                    <p className="text-gray-700  leading-relaxed mb-4">
                        Please provide detailed information about how you feel, any discomfort or pain you're
                        experiencing, and any other relevant details that can assist in accurately diagnosing
                        your condition.
                    </p>
                </div>

                <div className="text-center mt-4">
                    <p className="text-gray-700 leading-relaxed mb-2">Do you have fever?</p>
                    <div className="flex justify-center mb-4">
                        <label className="mr-4">
                            <input type="radio" name="fever" value="yes" className="mr-1"/> Yes
                        </label>
                        <label>
                            <input type="radio" name="fever" value="no" className="mr-1"/> No
                        </label>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-2">Do you have bloody stool?</p>
                    <div className="flex justify-center mb-4">
                        <label className="mr-4">
                            <input type="radio" name="bloody stool" value="yes" className="mr-1"/> Yes
                        </label>
                        <label>
                            <input type="radio" name="bloody stool" value="no" className="mr-1"/> No
                        </label>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-2">Do you have runny nose?</p>
                    <div className="flex justify-center mb-4">
                        <label className="mr-4">
                            <input type="radio" name="runny nose" value="yes" className="mr-1"/> Yes
                        </label>
                        <label>
                            <input type="radio" name="runny nose" value="no" className="mr-1"/> No
                        </label>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-2">Do you have a headache?</p>
                    <div className="flex justify-center mb-4">
                        <label className="mr-4">
                            <input type="radio" name="headache" value="yes" className="mr-1"/> Yes
                        </label>
                        <label>
                            <input type="radio" name="headache" value="no" className="mr-1"/> No
                        </label>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-2">Do you have a cough?</p>
                    <div className="flex justify-center mb-4">
                        <label className="mr-4">
                            <input type="radio" name="cough" value="yes" className="mr-1"/> Yes
                        </label>
                        <label>
                            <input type="radio" name="cough" value="no" className="mr-1"/> No
                        </label>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
          <textarea
              className="block w-full h-32 bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              placeholder="Enter your symptoms here"
              value={patientSymptoms}
              onChange={(event) => setPatientSymptoms(event.target.value)}
          />
                    <div className="flex justify-center">
                        <input
                            type="submit"
                            value="Submit"
                            className="block mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
                        />
                    </div>
                </form>
            </div>
            <div>
                <DiseaseModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                    {responseData}
                </DiseaseModal>
            </div>
        </div>
    </div>);
}

export default Questionnaire;