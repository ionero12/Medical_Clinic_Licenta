import React, {useEffect, useState} from 'react';
import axios from 'axios';
import PatientMenu from "../components/PatientMenu";
import {useNavigate} from "react-router-dom";
import {useUser} from "../user/UserContext";


const Prices = () => {
    const navigate = useNavigate();
    const {setUser} = useUser();

    const [consultatii, setConsultatii] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/api/consultatie/preturi')
            .then(response => {
                setConsultatii(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });

        if (Date.now() > localStorage.getItem('jwtTokenExpiry')) {
            setUser(null);
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('jwtTokenExpiry');
            localStorage.removeItem('user');
            navigate('/login');
        }
    }, [navigate, setUser]);

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
