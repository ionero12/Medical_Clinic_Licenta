import React, {useEffect, useState} from 'react';
import {useUser} from '../user/UserContext'; // import useUser
import PatientMenu from '../components/PatientMenu';
import AppointmentPatient from "../components/AppointmentPatient";
import {Link} from "react-router-dom";

const PatientDashboard = () => {
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [medics, setMedics] = useState([]);
    const {user} = useUser(); // get user from the user context
    const idPacient = user ? user.userData.idPacient : null; // get patient ID from the user

    console.log('User from context:', user);

    useEffect(() => {
        if (user && idPacient) {
            const urlConsultations = `http://localhost:8081/api/consultatie?idPacient=${idPacient}`;
            const urlMedics = `http://localhost:8081/api/medic`;

            fetch(urlMedics)
                .then(response => response.json())
                .then(data => {
                    // Add a new property 'specializare' to each medic object
                    const medicsWithSpecialization = data.map(medic => {
                        if (medic.consultatii.length > 0) {
                            // Assuming the 'numeConsultatie' field contains the specialization
                            const specializare = medic.consultatii[0].numeConsultatie.split(' ')[1];
                            return { ...medic, specializare };
                        } else {
                            return { ...medic, specializare: 'Unknown' };
                        }
                    });
                    setMedics(medicsWithSpecialization);
                });

            fetch(urlConsultations)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Failed to fetch data');
                })
                .then(data => {
                    const currentDate = new Date();
                    const filteredAppointments = data.filter(appointment => new Date(appointment.dataConsultatiei) > currentDate);
                    setUpcomingAppointments(filteredAppointments);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [user, idPacient]);

    return (<div className="p-6">
        <PatientMenu/>
        <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-white p-4 rounded-2xl shadow">
                <h2 className="text-2xl font-bold mb-2">Medici</h2>
                <div className="flex flex-wrap -m-4">
                    {medics.map((medic) => (
                        <div key={medic.idMedic} className="w-1/2 p-4">
                            <div className="border-sky-500 border-2 p-4 rounded-md shadow-lg">
                                <Link to={`/medic/${medic.idMedic}`} className="flex flex-col items-center text-center">
                                    <h2 className="text-xl font-bold mb-2">{medic.numeMedic} {medic.prenumeMedic}</h2>
                                    <p className="text-gray-700">Specializare: {medic.specializare}</p>
                                    <button
                                        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Vezi profilul
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow">
                <h2 className="text-2xl font-bold mb-2">Consultatii Viitoare</h2>
                <ul>
                    {upcomingAppointments.map(appointment => (
                        <div key={appointment.idConsultatie} className="border-sky-500 border-2 mb-1 p-2">
                            <AppointmentPatient appointment={appointment}/>
                        </div>))}
                </ul>
            </div>
        </div>
    </div>);
};

export default PatientDashboard;
