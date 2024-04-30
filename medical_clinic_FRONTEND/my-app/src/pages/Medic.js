import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import PacientMenu from "../components/PatientMenu";
import StarRating from "../components/StarRating";

const Medic = () => {
    const [medic, setMedic] = useState(null);
    const [consultatii, setConsultatii] = useState([]);
    const {idMedic} = useParams();

    useEffect(() => {
        fetch(`http://localhost:8081/api/medic/${idMedic}`)
            .then(response => response.json())
            .then(data => {
                setMedic(data);
                console.log(data);
            });
    }, [idMedic]);

    useEffect(() => {
        fetch(`http://localhost:8081/api/consultatie/medic?idMedic=${idMedic}`)
            .then(response => response.json())
            .then(data => {
                setConsultatii(data);
                console.log(data);
            });
    }, [idMedic]);

    if (!medic) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (<div className="p-6">
        <PacientMenu/>
        <h2 className="text-3xl font-bold mb-4 text-gray-400">{medic.numeMedic} {medic.prenumeMedic}</h2>
        <div className="flex flex-col md:flex-row">
            <div className="bg-white p-4 rounded shadow w-full md:w-1/2 mr-2 mb-4 md:mb-0 text-lg">
                <p className="mb-2"><strong>Email:</strong> {medic.emailMedic}</p>
                <p className="mb-2"><strong>Phone number:</strong> {medic.telefonMedic}</p>
                <p className="mb-2"><strong>University:</strong> {medic.universitate}</p>
                <p className="mb-2"><strong>Experience:</strong> {medic.experienta} years in the field</p>
                <div className="mb-4">
                    <table className="table-auto">
                        <thead>
                        <tr>
                            <th className="border-2 border-gray-400 px-4 py-2">Day</th>
                            <th className="border-2 border-gray-400 px-4 py-2">Schedule</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="border-2 border-gray-400 px-4 py-2 font-semibold">Monday</td>
                            <td className="border-2 border-gray-400 px-4 py-2">08:00-18:00</td>
                        </tr>
                        <tr>
                            <td className="border-2 border-gray-400 px-4 py-2 font-semibold">Tuesday</td>
                            <td className="border-2 border-gray-400 px-4 py-2">08:00-18:00</td>
                        </tr>
                        <tr>
                            <td className="border-2 border-gray-400 px-4 py-2 font-semibold">Wednesday</td>
                            <td className="border-2 border-gray-400 px-4 py-2">08:00-18:00</td>
                        </tr>
                        <tr>
                            <td className="border-2 border-gray-400 px-4 py-2 font-semibold">Thursday</td>
                            <td className="border-2 border-gray-400 px-4 py-2">08:00-18:00</td>
                        </tr>
                        <tr>
                            <td className="border-2 border-gray-400 px-4 py-2 font-semibold">Friday</td>
                            <td className="border-2 border-gray-400 px-4 py-2">08:00-18:00</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="bg-white p-4 rounded shadow w-full md:w-1/2">
                {consultatii.filter(consultatie => consultatie.rating !== null).map((consultatie, index) => (
                    <div key={index} className="p-4 border-2 border-blue-600 rounded-3xl mb-4">
                        <StarRating rating={consultatie.rating}/>
                        <p>{consultatie.feedback}</p>
                    </div>
                ))}
            </div>

        </div>
    </div>);
};

export default Medic;