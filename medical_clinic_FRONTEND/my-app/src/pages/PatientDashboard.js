import React, { useEffect, useState } from 'react';
import { useUser } from '../user/UserContext'; // import useUser

const PatientDashboard = () => {
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const { user } = useUser(); // get user from the user context
    const idPacient = user ? user.idPacient : null; // get patient ID from the user

    console.log(user); // print user to the console

    useEffect(() => {
        if (idPacient) {
            const urlConsultations = `http://localhost:8081/api/consultatie?pacientId=${idPacient}`;

            fetch(urlConsultations)
                .then(response => response.json())
                .then(data => {
                    const currentDate = new Date();
                    const filteredAppointments = data.filter(appointment => new Date(appointment.dataConsultatiei) > currentDate);
                    setUpcomingAppointments(filteredAppointments);
                });
        }
    }, [idPacient]);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Dashboard Pacient</h1>
            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-2xl font-bold mb-2">Consultatii Viitoare</h2>
                <ul>
                    {upcomingAppointments.map((appointment) => (
                        <li key={appointment.idConsultatie} className="border-b py-2">
                            Nume consultatie: {appointment.numeConsultatie}
                            <br/>
                            Nume medic: {appointment.numeMedic} {appointment.prenumeMedic}
                            <br/>
                            ID Consutlatie: {appointment.idConsultatie}, Data: {appointment.dataConsultatiei}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PatientDashboard;
