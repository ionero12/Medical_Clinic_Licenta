import React, { useEffect, useState } from 'react';
import { useUser } from '../user/UserContext'; // import useUser
import MedicMenu from '../components/MedicMenu';
import axios from "axios";

const MedicAppointments = () => {
    const [pastAppointments, setPastAppointments] = useState([]);
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const { user } = useUser(); // get user from the user context
    const idMedic = user ? user.idMedic : null; // get patient ID from the user

    const [idPacient, setIdPacient] = useState('');
    const [numeConsultatie, setNumeConsultatie] = useState('');
    const [dataConsultatiei, setDataConsultatiei] = useState('');

    useEffect(() => {
        if (idMedic) {
            fetch(`http://localhost:8081/api/consultatie?idMedic=${idMedic}`)
                .then(response => response.json())
                .then(data => {
                    const currentDate = new Date();
                    const past = data.filter(appointment => new Date(appointment.dataConsultatiei) <= currentDate);
                    const upcoming = data.filter(appointment => new Date(appointment.dataConsultatiei) > currentDate);
                    setPastAppointments(past);
                    setUpcomingAppointments(upcoming);
                });
        }
    }, [idMedic]);

    const deleteAppointment = (idConsultatie) => {
        fetch(`http://localhost:8081/api/consultatie/${idConsultatie}`, {
            method: 'DELETE',
        }).then(() => {
            setPastAppointments(pastAppointments.filter(appointment => appointment.idConsultatie !== idConsultatie));
            setUpcomingAppointments(upcomingAppointments.filter(appointment => appointment.idConsultatie !== idConsultatie));
        });
    };

    const updateAppointment = async (idConsultatie, dataConsultatiei) => {
        try {
            const response = await axios.put(`http://localhost:8081/api/consultatie/${idConsultatie}`, null, {
                params: {
                    dataConsultatiei
                }
            });
            console.log('Appointment updated successfully:', response.data);
            setPastAppointments(pastAppointments.map(appointment => appointment.idConsultatie === idConsultatie ? response.data : appointment));
            setUpcomingAppointments(upcomingAppointments.map(appointment => appointment.idConsultatie === idConsultatie ? response.data : appointment));
        } catch (error) {
            console.error('Error updating appointment:', error);
        }
    };

    const openUpdateModal = (idConsultatie) => {
        const appointment = upcomingAppointments.find(app => app.idConsultatie === idConsultatie);
        if (appointment) {
            const appointmentDate = appointment.dataConsultatiei;
            const newDate = prompt("Please enter the new date for the appointment:", appointmentDate);
            if (newDate) {
                updateAppointment(idConsultatie, newDate);
            }
        } else {
            console.error('Appointment not found');
        }
    };

    const handleAddAppointment = async (event) => {
        event.preventDefault();

        const newAppointment = {
            idPacient,
            idMedic,
            numeConsultatie,
            dataConsultatiei
        };

        try {
            const response = await axios.post(`http://localhost:8081/api/consultatie`, newAppointment);
            console.log('Appointment added successfully:', response.data);
        } catch (error) {
            console.error('Error adding appointment:', error);
        }
    };

    return (
        <div className="p-6">
            <MedicMenu/>
            <h1 className="text-3xl font-bold mb-4">Programari</h1>
            <div className="flex">
                <div className="bg-white p-4 rounded shadow w-1/2 mr-2">
                    <h2 className="text-2xl font-bold mb-2">Programari anterioare</h2>
                    <ul>
                        {pastAppointments.map((appointment) => (
                            <li key={appointment.idConsultatie} className="border-b py-2">
                                Nume consultatie: {appointment.numeConsultatie}
                                <br/>
                                Nume pacient: {appointment.numePacient} {appointment.prenumePacient}
                                <br/>
                                ID Consutlatie: {appointment.idConsultatie}, Data: {appointment.dataConsultatiei}
                                <br/>
                                <button onClick={() => deleteAppointment(appointment.idConsultatie)}
                                        className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-700 transition duration-200">Delete
                                </button>

                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-white p-4 rounded shadow w-1/2 ml-2">
                    <h2 className="text-2xl font-bold mb-2">Programari viitoare</h2>
                    <ul>
                        {upcomingAppointments.map((appointment) => (
                            <li key={appointment.idConsultatie} className="border-b py-2">
                                Nume consultatie: {appointment.numeConsultatie}
                                <br/>
                                Nume pacient: {appointment.numePacient} {appointment.prenumePacient}
                                <br/>
                                ID Consutlatie: {appointment.idConsultatie}, Data: {appointment.dataConsultatiei}
                                <br/>
                                <button onClick={() => openUpdateModal(appointment.idConsultatie)}
                                        className="bg-blue-500 text-white rounded px-4 py-2 mr-4 hover:bg-blue-700 transition duration-200">Update
                                </button>
                                <button onClick={() => deleteAppointment(appointment.idConsultatie)}
                                        className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-700 transition duration-200">Delete
                                </button>
                                <br/>
                                <button
                                    onClick={() => document.getElementById('addAppointmentForm').style.display = 'block'}>Add
                                    Appointment
                                </button>

                                <form id="addAppointmentForm" style={{display: 'none'}} onSubmit={handleAddAppointment}>
                                    <label>
                                        Patient ID:
                                        <input type="text" value={idPacient}
                                               onChange={e => setIdPacient(e.target.value)} required/>
                                    </label>
                                    <label>
                                        Appointment Name:
                                        <input type="text" value={numeConsultatie}
                                               onChange={e => setNumeConsultatie(e.target.value)} required/>
                                    </label>
                                    <label>
                                        Appointment Date:
                                        <input type="datetime-local" value={dataConsultatiei}
                                               onChange={e => setDataConsultatiei(e.target.value)} required/>
                                    </label>
                                    <input type="submit" value="Submit"/>
                                </form>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MedicAppointments;
