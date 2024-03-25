import React, {useEffect, useState} from 'react';
import axios from 'axios';
import PatientMenu from "../components/PatientMenu";

const ConsultatiePreturi = () => {
    const [consultatii, setConsultatii] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/api/consultatie/preturi')
            .then(response => {
                setConsultatii(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    console.log(consultatii)

    return (<div className="p-6">
            <PatientMenu/>
            <h1 className="text-3xl font-bold mb-4">Preturi Consultatii</h1>
            <div className="flex">
                <div className="bg-white p-4 rounded shadow w-1/2 mr-2">
                    <h2 className="text-2xl font-bold mb-2">Preturi Cu Abonament</h2>
                    {consultatii.map(consultatie => (<div key={consultatie.id}>
                            <h3>{consultatie.numeConsultatie} {consultatie.pretCuAbonament}</h3>
                        </div>))}
                </div>
                <div className="bg-white p-4 rounded shadow w-1/2 ml-2">
                    <h2 className="text-2xl font-bold mb-2">Preturi Fara Abonament</h2>
                    {consultatii.map(consultatie => (<div key={consultatie.id}>
                            <h3>{consultatie.numeConsultatie} {consultatie.pretFaraAbonament}</h3>
                        </div>))}
                </div>
            </div>
        </div>);
};

export default ConsultatiePreturi;
