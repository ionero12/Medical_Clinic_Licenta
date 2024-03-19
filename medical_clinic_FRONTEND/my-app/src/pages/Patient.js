import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Patient = () => {
    const [patient, setPatient] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:8081/api/pacient/${id}`)
            .then(response => response.json())
            .then(data => setPatient(data));
    }, [id]);

    if (!patient) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="p-6 bg-blue-700 min-h-screen text-white">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold mb-4 text-center">Patient Details</h1>
                <div className="bg-white p-4 rounded shadow-md text-black border border-gray-300">
                    <h2 className="text-2xl font-bold mb-2">{patient.numePacient} {patient.prenumePacient}</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2 p-10">
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
                        <div className="space-y-2 p-5">
                            <p><strong>Analize:</strong></p>
                            <ul>
                                {patient.analize.map((analiza, index) => (
                                    <li key={index}>
                                        <p><strong>ID Analiza:</strong> {analiza.idAnaliza}</p>
                                        <p><strong>Data Analiza:</strong> {analiza.dataAnaliza}</p>
                                    </li>
                                ))}
                            </ul>
                            <br/>
                            <p><strong>Consultatii:</strong></p>
                            <ul>
                                {patient.consultatii.map((consultatie, index) => (
                                    <li key={index}>
                                        <p><strong>ID Consultatie:</strong> {consultatie.idConsultatie}</p>
                                        <p><strong>Data Consultatie:</strong> {consultatie.dataConsultatiei}</p>
                                        <p><strong>Nume consultatie:</strong> {consultatie.numeConsultatie}</p>
                                    </li>
                                ))}
                            </ul>
                            <br/>
                            <p><strong>Fisa Medicala:</strong></p>
                            <ul>
                                {patient.fiseMedicale.map((fisa, index) => (
                                    <li key={index}>
                                        <p><strong>ID Fisa:</strong> {fisa.idFisaMedicala}</p>
                                        <p><strong>Data:</strong> {fisa.dataInvestigatie}</p>
                                        <p><strong>Descriere:</strong> {fisa.descriereInvestigatie}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Patient;
