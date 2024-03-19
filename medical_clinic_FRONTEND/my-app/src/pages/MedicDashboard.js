import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useUser} from '../user/UserContext'; // import useUser
import MedicMenu from '../components/MedicMenu';

const MedicDashboard = () => {
    const [patients, setPatients] = useState([]);
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const {user} = useUser();  // get user from the user context
    const idMedic = user ? user.idMedic : null;  // get medicId from the user

    console.log(user);  // print user to the console

    useEffect(() => {
        if (idMedic) {
            const urlPacient = `http://localhost:8081/api/pacient?medicId=${idMedic}`;
            const urlConsultations = `http://localhost:8081/api/consultatie?medicId=${idMedic}`;

            fetch(urlPacient)
                .then(response => response.json())
                .then(data => setPatients(data));

            fetch(urlConsultations)
                .then(response => response.json())
                .then(data => {
                    const currentDate = new Date();
                    const filteredAppointments = data.filter(appointment => new Date(appointment.dataConsultatiei) > currentDate);
                    setUpcomingAppointments(filteredAppointments);
                });
        }
    }, [idMedic]);


    return (<div className="p-6">
            <MedicMenu/>
            <h1 className="text-3xl font-bold mb-4">Dashboard Medic</h1>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-2xl font-bold mb-2">Pacienti</h2>
                    <ul>
                        {patients.map((pacient) => (<li key={pacient.idPacient} className="border-b py-2">
                                <Link to={`/patient/${pacient.idPacient}`}>
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
                        {upcomingAppointments.map((appointment) => (
                            <li key={appointment.idConsultatie} className="border-b py-2">
                                Nume consultatie: {appointment.numeConsultatie}
                                <br/>
                                Nume pacient: {appointment.numePacient} {appointment.prenumePacient}
                                <br/>
                                ID Consultatie: {appointment.idConsultatie}, Data: {appointment.dataConsultatiei}
                            </li>))}
                    </ul>
                </div>
            </div>
        </div>);
};

export default MedicDashboard;
