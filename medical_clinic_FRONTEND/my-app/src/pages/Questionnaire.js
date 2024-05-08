import React, {useState} from "react";
import axios from 'axios';
import PatientMenu from "../components/PatientMenu";
import DiseaseModal from "../components/DiseaseModal";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Questionnaire = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [responseData, setResponseData] = useState(null);
    const [symptoms, setSymptoms] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:8081/api/pacient/chestionar', symptoms, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log('Response:', response.data);
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
                    <form onSubmit={handleSubmit}>
          <textarea
              className="block w-full h-32 bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              placeholder="Enter your symptoms here"
              value={symptoms}
              onChange={(event) => setSymptoms(event.target.value)}
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