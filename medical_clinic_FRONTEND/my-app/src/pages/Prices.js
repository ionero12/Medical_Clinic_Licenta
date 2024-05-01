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

    return (<div className="p-6">
            <PatientMenu/>
            <div className="flex justify-center mt-2">
                <div className="bg-white p-4 rounded shadow w-full md:max-w-2xl">
                    <div className="overflow-x-auto">
                    <table className="table-auto border-collapse border border-blue-800 w-full">
                        <thead>
                        <tr>
                            <th className="border border-blue-600 p-2">Appointment</th>
                            <th className="border border-blue-600 p-2">With Subs</th>
                            <th className="border border-blue-600 p-2">Without Subs</th>
                        </tr>
                        </thead>
                        <tbody>
                        {consultatii.map(consultatie => (<tr key={consultatie.idConsultatie}>
                            <td className="border border-blue-600 p-2">{consultatie.numeConsultatie}</td>
                            <td className="border border-blue-600 p-2">{consultatie.pretCuAbonament}</td>
                            <td className="border border-blue-600 p-2">{consultatie.pretFaraAbonament}</td>
                        </tr>))}
                        </tbody>
                    </table>
                </div>
            </div>
                </div>
    </div>);

}

export default Prices;
