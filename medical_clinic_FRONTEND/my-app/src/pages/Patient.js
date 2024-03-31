import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import MedicMenu from "../components/MedicMenu";

const Patient = () => {
    const [patient, setPatient] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        fetch(`http://localhost:8081/api/pacient/${id}`)
            .then(response => response.json())
            .then(data => setPatient(data));
    }, [id]);

    if (!patient) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
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
                            <p><strong>Analize:</strong></p>
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
