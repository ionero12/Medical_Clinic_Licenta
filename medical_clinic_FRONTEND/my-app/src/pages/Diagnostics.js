import {useUser} from "../user/UserContext";
import React, {useEffect, useState} from 'react';
import PatientMenu from "../components/PatientMenu";
import TemperatureChart from "../components/ChartComponent";
// import TemperatureCharts from "../components/ChartsComponent";

const Diagnostics = () => {
    const {user} = useUser();
    const idPacient = user ? user.userData.idPacient : null;

    const [data, setData] = useState([]);
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
            fetch(`http://localhost:8081/api/valoare_analize/${idPacient}`)
                .then(response => response.json())
                .then(data => {
                    setData(data);
                    let valoareAnalizeData = data.filter(item => item.valoare.numeValoare !== "Temperatura" && item.valoare.numeValoare !== "Ritm cardiac" && item.valoare.numeValoare !== "Glucoza" && item.valoare.numeValoare !== "Presiune sistolica" && item.valoare.numeValoare !== "Presiune diastolica");
                    setValoareAnalize(valoareAnalizeData);
                });
        }
    }, [idPacient]);

    return (<div className="p-6">
        <PatientMenu/>
        <div className="mt-2 flex flex-col md:flex-row">
            <div className="bg-white p-4 rounded shadow w-full md:w-1/2 mr-2 mb-4 md:mb-0">
                <h2 className="text-2xl font-bold mb-2">Diagnostics</h2>
                <ul>
                    {diagnostics.map((diagnostic) => (
                        <li key={diagnostic.idDiagnostic} className="border-gray-400 border-2 mb-1 p-2">
                            Diagnostic name: {diagnostic.numeDiagnostic}
                            <br/>
                            ID: {diagnostic.idDiagnostic}, Date: {diagnostic.dataDiagnostic}
                        </li>))}
                </ul>
            </div>
            <div className="bg-white p-4 rounded shadow w-full md:w-1/2">
                <h2 className="text-2xl font-bold mb-2">Analyses</h2>
                <ul>
                    {valoariAnalize.map((valoareAnaliza) => (
                        <li key={`${valoareAnaliza.analizeIdAnaliza}-${valoareAnaliza.valoare.idValoare}`}
                            className="border-gray-400 border-2 mb-1 p-2">
                            Analysis name: {valoareAnaliza.valoare.numeValoare}
                            <br/>
                            Analysis value: {valoareAnaliza.valoare.rezultatValoare}
                            <br/>
                            Date: {valoareAnaliza.analiza.dataAnaliza}
                        </li>))}
                </ul>
            </div>
        </div>
        <TemperatureChart data={data}/>
    </div>);
};

export default Diagnostics;

//todo: pacientu isi poate adauga date in charts