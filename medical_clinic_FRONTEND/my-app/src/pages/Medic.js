import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import PacientMenu from "../components/PatientMenu";
import StarRating from "../components/StarRating";
import {useUser} from "../user/UserContext";

const Medic = () => {
    const navigate = useNavigate();
    const {setUser} = useUser();

    const [medic, setMedic] = useState(null);
    const [consultatii, setConsultatii] = useState([]);
    const {idMedic} = useParams();

    useEffect(() => {
        fetch(`http://localhost:8081/api/medic/${idMedic}`)
            .then(response => response.json())
            .then(data => {
                setMedic(data);
            });

        if (Date.now() > localStorage.getItem('jwtTokenExpiry')) {
            setUser(null);
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('jwtTokenExpiry');
            localStorage.removeItem('user');
            navigate('/login');
        }
    }, [idMedic, navigate, setUser]);

    useEffect(() => {
        fetch(`http://localhost:8081/api/consultatie/medic?idMedic=${idMedic}`)
            .then(response => response.json())
            .then(data => {
                setConsultatii(data);
            });

        if (Date.now() > localStorage.getItem('jwtTokenExpiry')) {
            setUser(null);
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('jwtTokenExpiry');
            localStorage.removeItem('user');
            navigate('/login');
        }
    }, [idMedic, navigate, setUser]);


    return (<div className="p-6">
        <PacientMenu/>
        <div className="flex flex-col md:flex-row mt-2">
            <div className="bg-white p-4 rounded shadow w-full md:w-1/2 mr-2 mb-4 md:mb-0 text-lg">
                <h2 className="text-3xl font-bold mb-4">{medic?.numeMedic} {medic?.prenumeMedic}</h2>
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
                    <div key={index}
                         className="border-gray-400 border-2 p-4 rounded-md shadow-lg transition duration-300 ease-in-out hover:shadow-2xl">
                        <StarRating rating={consultatie.rating}/>
                        <p>{consultatie.feedback}</p>
                    </div>))}
            </div>

        </div>
    </div>);
};

export default Medic;