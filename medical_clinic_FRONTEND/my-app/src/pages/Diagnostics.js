import {useUser} from "../user/UserContext";
import React, {useEffect, useState} from 'react';
import PatientMenu from "../components/PatientMenu";


const Diagnostics = () => {
    const {user} = useUser();
    const idPacient = user ? user.idPacient : null;

    const [diagnostics, setDiagnostics] = useState([]);
    const [valoariAnalize, setValoareAnalize] = useState([]);

    useEffect(() => {
        if (idPacient) {
            fetch(`http://localhost:8081/api/diagnostic?idPacient=${idPacient}`)
                .then(response => response.json())
                .then(data => {
                    setDiagnostics(data);
                });
        }
    }, [idPacient]);

    useEffect(() => {
        if (idPacient) {
            fetch(`http://localhost:8081/api/valoare_analize?idPacient=${idPacient}`)
                .then(response => response.json())
                .then(data => {
                    setValoareAnalize(data);
                });
        }
    }, [idPacient]);

    return (<div className="p-6">
        <PatientMenu/>
        <h1 className="text-3xl font-bold mb-4">Detalii pacient</h1>
        <div className="flex">
            <div className="bg-white p-4 rounded shadow w-1/2 mr-2">
                <h2 className="text-2xl font-bold mb-2">Diagnostice</h2>
                <ul>
                    {diagnostics.map((diagnostic) => (
                        <li key={diagnostic.idDiagnostic} className="border-b py-2">
                            Nume diagnostic: {diagnostic.numeDiagnostic}
                            <br/>
                            ID diagnostic: {diagnostic.idDiagnostic}, Data: {diagnostic.dataDiagnostic}
                        </li>))}
                </ul>
            </div>
            <div className="bg-white p-4 rounded shadow w-1/2 mr-2">
                <h2 className="text-2xl font-bold mb-2">Analize</h2>
                <ul>
                    {valoariAnalize.map((valoareAnaliza) => (
                        <li key={`${valoareAnaliza.analizeIdAnaliza}-${valoareAnaliza.valoare.idValoare}`} className="border-b py-2">
                            Nume analiza: {valoareAnaliza.valoare.numeValoare}
                            <br/>
                            Valoare analiza: {valoareAnaliza.valoare.rezultatValoare}, Data: {valoareAnaliza.analiza.dataAnaliza}
                        </li>
                    ))}

                </ul>
            </div>
        </div>
    </div>);
};

export default Diagnostics;