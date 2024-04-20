import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useUser} from '../user/UserContext'; // import useUser
import MedicMenu from '../components/MedicMenu';
import AppointmentMedic from "../components/AppointmentMedic";

const MedicDashboard = () => {
    const [patients, setPatients] = useState([]);
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const {user} = useUser();  // get user from the user context
    const idMedic = user ? user.userData.idMedic : null;  // get medicId from the user

    console.log("user", user); // Print user to the console

    useEffect(() => {
        if (user && idMedic) {
            const urlPacient = `http://localhost:8081/api/pacient?idMedic=${idMedic}`;
            const urlConsultations = `http://localhost:8081/api/consultatie?idMedic=${idMedic}`;

            fetch(urlPacient)
                .then(response => response.json())
                .then(data => setPatients(data));

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
    }, [user, idMedic]); // Include user in the dependency array

    return (<div className="p-6">
        <MedicMenu/>
        <h1 className="text-3xl font-bold mb-4">Dashboard Medic</h1>
        <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-2xl font-bold mb-2">Pacienti</h2>
                <ul>
                    {patients.map((pacient) => (<li key={pacient.idPacient} className="border-sky-500 border-2 mb-1 p-2">
                        <Link to={`/pacient/${pacient.idPacient}`}>
                            {pacient.numePacient} {pacient.prenumePacient}
                        </Link>
                        <br/>
                        Varsta: {pacient.varstaPacient}
                    </li>))}
                </ul>
            </div>
            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-2xl font-bold mb-2">Consultatii Viitoare</h2>
                <ul>
                    {upcomingAppointments.map(appointment => (<div key={appointment.idConsultatie} className="border-sky-500 border-2 mb-1 p-2">
                        <AppointmentMedic appointment={appointment}/>
                    </div>))}
                </ul>
            </div>
        </div>
    </div>);
};

export default MedicDashboard;
