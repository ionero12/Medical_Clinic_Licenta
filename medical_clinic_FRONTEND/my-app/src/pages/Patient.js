import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import MedicMenu from "../components/MedicMenu";
import Modal from "react-modal";
import axios from "axios";

const Patient = () => {
    const [patient, setPatient] = useState(null);
    const {idPacient} = useParams();

    const [addModalIsOpen, setAddModalIsOpen] = useState(false);
    const [dataAnaliza, setDataAnaliza] = useState('');

    useEffect(() => {
        fetch(`http://localhost:8081/api/pacient/${idPacient}`)
            .then(response => response.json())
            .then(data => setPatient(data));
    }, [idPacient]);

    if (!patient) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    const handleAddAnaliza = async (event) => {
        event.preventDefault();

        const newAnaliza = {
            pacient: {
                idPacient
            },
            dataAnaliza
        };
        console.log('Adding analiza:', newAnaliza)

        try {
            const response = await axios.post(`http://localhost:8081/api/analiza`, newAnaliza);
            console.log('Analiza added successfully:', response.data);
            closeAddModal();

            // Update patient state directly
            setPatient(prevState => ({
                ...prevState,
                analize: [...prevState.analize, response.data]
            }));
        } catch (error) {
            console.error('Error adding analiza:', error);
        }
    };

    function openAddModal() {
        setAddModalIsOpen(true);
    }

    function closeAddModal() {
        setAddModalIsOpen(false);
    }

    return (<div className="p-6 bg-blue-700 min-h-screen text-white">
        <MedicMenu/>
        <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-4 text-center">Detalii pacient</h1>
            <div className="bg-white p-4 rounded shadow-md text-black border border-gray-300">
                <h2 className="text-2xl font-bold mb-2">{patient.numePacient} {patient.prenumePacient}</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 p-10 bg-indigo-200 border-4 border-indigo-300 rounded-lg">
                        <p><strong>CNP:</strong> {patient.cnpPacient}</p>
                        <p><strong>Varsta:</strong> {patient.varstaPacient}</p>
                        <p><strong>Sex:</strong> {patient.sexPacient}</p>
                        <p><strong>Greutate:</strong> {patient.greutatePacient}</p>
                        <p><strong>Inaltime:</strong> {patient.inaltimePacient}</p>
                        <p><strong>Data nastere:</strong> {patient.dataNasterePacient}</p>
                        <p><strong>Asigurat:</strong> {patient.asigurat}</p>
                        <p><strong>Abonament:</strong> {patient.abonamentPacient}</p>
                        <p><strong>Telefon:</strong> {patient.telefonPacient}</p>
                        <p><strong>Email:</strong> {patient.emailPacient}</p>
                    </div>
                    <div className="space-y-2 p-2 bg-indigo-200 border-4 border-indigo-300 rounded-lg">
                        <div className="space-y-2 p-5 border-4 border-indigo-300 rounded-lg">
                            <h4><strong>Analize:</strong></h4>
                            <button
                                onClick={openAddModal}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-3 rounded mt-4 ml-80">Add
                            </button>
                            <Modal
                                isOpen={addModalIsOpen}
                                onRequestClose={closeAddModal}
                                contentLabel="Add analiza"
                                className="w-1/3 h-2/3 mx-auto mt-36 bg-indigo-300 rounded-2xl p-5 border-2 border-indigo-700 text-center content-center" // Apply Tailwind classes here
                            >
                                <form onSubmit={handleAddAnaliza} className="flex flex-col">
                                    <label className="mb-2">
                                        Data si ora analizei:
                                        <input type="datetime-local" value={dataAnaliza}
                                               onChange={e => setDataAnaliza(e.target.value)} required
                                               className="mt-1"/>
                                    </label>
                                    <input type="submit" value="Submit"
                                           className="mt-7 border-2 border-indigo-700 rounded-3xl w-1/2 mx-auto"/>
                                </form>
                            </Modal>
                            <ul>
                                {patient.analize.map((analiza, index) => (<li key={index}>
                                    <p><strong>ID Analiza:</strong> {analiza.idAnaliza}</p>
                                    <p><strong>Data:</strong> {analiza.dataAnaliza}</p>
                                </li>))}
                            </ul>
                        </div>
                        <br/>
                        <div className="space-y-2 p-2 border-4 border-indigo-300 rounded-lg">
                            <p><strong>Diagnostic:</strong></p>
                            <ul>
                                {patient.diagnostice.map((diagnostic, index) => (<li key={index}>
                                    <p><strong>ID Diagnostic:</strong> {diagnostic.idDiagnostic}</p>
                                    <p><strong>Data:</strong> {diagnostic.dataDiagnostic}</p>
                                    <p><strong>Nume:</strong> {diagnostic.numeDiagnostic}</p>
                                </li>))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
};

export default Patient;
