import React, {useEffect, useState} from 'react';
import axios from 'axios';
import PatientMenu from "../components/PatientMenu";

const Prices = () => {
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

    return (
        <div className="p-6">
            <PatientMenu/>
            <h1 className="text-3xl font-bold mb-4">Preturi Consultatii</h1>
            <div className="flex">
                <div className="bg-white p-4 rounded shadow w-full mr-2">
                    <h2 className="text-2xl font-bold mb-2">Preturi Cu Abonament</h2>
                    <table className="table-auto border-collapse border border-blue-800 w-full">
                        <thead>
                        <tr>
                            <th className="border border-blue-600 p-2">Consultatie</th>
                            <th className="border border-blue-600 p-2">Pret</th>
                        </tr>
                        </thead>
                        <tbody>
                        {consultatii.map(consultatie => (
                            <tr key={consultatie.id}>
                                <td className="border border-blue-600 p-2">{consultatie.numeConsultatie}</td>
                                <td className="border border-blue-600 p-2">{consultatie.pretCuAbonament}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="bg-white p-4 rounded shadow w-full ml-2">
                    <h2 className="text-2xl font-bold mb-2">Preturi Fara Abonament</h2>
                    <table className="table-auto border-collapse border border-blue-800 w-full">
                        <thead>
                        <tr>
                            <th className="border border-blue-600 p-2">Consultatie</th>
                            <th className="border border-blue-600 p-2">Pret</th>
                        </tr>
                        </thead>
                        <tbody>
                        {consultatii.map(consultatie => (
                            <tr key={consultatie.id}>
                                <td className="border border-blue-600 p-2">{consultatie.numeConsultatie}</td>
                                <td className="border border-blue-600 p-2">{consultatie.pretFaraAbonament}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Prices;
