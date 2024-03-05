import React, { useEffect, useState } from 'react';

const Dashboard = () => {
    const [patients, setPatients] = useState([]);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8081/api/pacient')
            .then(response => response.json())
            .then(data => setPatients(data));

        fetch('http://localhost:8081/api/consultatie')
            .then(response => response.json())
            .then(data => setAppointments(data));
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Medic Dashboard</h1>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-2xl font-bold mb-2">Patients</h2>
                    <ul>
                        {patients.map((pacient) => (
                            <li key={pacient.idPacient} className="border-b py-2">
                                {pacient.numePacient} {pacient.prenumePacient} <br/>
                                Varsta: {pacient.varstaPacient}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-2xl font-bold mb-2">Appointments</h2>
                    <ul>
                        {appointments.map((appointment) => (
                            <li key={appointment.idConsultatie} className="border-b py-2">
                                Patient ID: {appointment.pacient}, Date: {appointment.dataConsultatiei}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
