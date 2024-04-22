import React, {useState} from "react";
import axios from 'axios';
import PatientMenu from "../components/PatientMenu";
import DiseaseModal from "../components/DiseaseModal";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Questionnaire = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [responseData, setResponseData] = useState(null);
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

        const allSymptomsSelected = symptomNames.every(symptom => symptoms.symptoms[symptom] !== undefined);
        if (!allSymptomsSelected) {
            toast.error('Nu ai selectat toate simptomele');
            return;
        }

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

    const symptomNames = ["mancarime", "eruptii_cutanate", "stranut_continuu", "frisoane", "dureri_articulare", "durere_de_stomac", "aciditate", "varsaturi", "mictiune_dureroasa", "oboseala", "schimbari_de_stare", "pierdere_in_greutate", "neliniste", "letargie", "tuse", "febra_ridicata", "dispnee", "transpiratii", "indigestie", "durere_de_cap", "piele_galbuie", "urina_inchisa_la_culoare", "greata", "pierderea_apetitului", "durere_de_spate", "constipatie", "durere_abdominala", "diaree", "febra_usoara", "ochi_galbui", "ganglioni_limfatici_umflati", "stare_de_rau", "vedere_incetosata", "flegma", "nas_infundat", "durere_in_piept", "ritm_cardiac_crescut", "durere_in_gat", "ameteala", "obezitate", "apetit_crescut", "slabiciune_musculara", "gat_intepenit", "pierderea_echilibrului", "depresie", "iritabilitate", "durere_de_muschi", "pete_rosii_pe_corp", "menstruatii_anormale", "istoric_de_familie", "durere_la_mers"];

    return (<div><ToastContainer
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
            <div className="max-w-full md:max-w-md mx-auto bg-white p-5 rounded shadow-md text-center mt-4">
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
                                /> Da
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name={symptom}
                                    value="0"
                                    checked={symptoms.symptoms[symptom] === 0}
                                    onChange={handleSymptomChange}
                                    className="mr-2 text-blue-500 focus:ring-blue-500"
                                /> Nu
                            </label>
                        </div>
                    </div>))}
                    <div className="flex justify-center">
                        <input type="submit" value="Submit"
                               className="block mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "/>
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