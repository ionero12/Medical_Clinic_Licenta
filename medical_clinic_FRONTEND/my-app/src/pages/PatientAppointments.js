import React, {useEffect, useState} from 'react';
import {useUser} from '../user/UserContext'; // import useUser
import PatientMenu from '../components/PatientMenu';
import Appointment from "../components/Appointment";
import axios from "axios";


const PatientAppointments = () => {
    const [pastAppointments, setPastAppointments] = useState([]);
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const {user} = useUser();
    const idPacient = user ? user.idPacient : null;


    useEffect(() => {
        if (idPacient) {
            fetch(`http://localhost:8081/api/consultatie?idPacient=${idPacient}`)
                .then(response => response.json())
                .then(data => {
                    const currentDate = new Date();
                    const past = data.filter(appointment => new Date(appointment.dataConsultatiei) <= currentDate);
                    const upcoming = data.filter(appointment => new Date(appointment.dataConsultatiei) > currentDate);
                    setPastAppointments(past);
                    setUpcomingAppointments(upcoming);
                });
        }
    }, [idPacient]);

    const deleteAppointment = (idConsultatie) => {
        fetch(`http://localhost:8081/api/consultatie/${idConsultatie}`, {
            method: 'DELETE',
        }).then(() => {
            // Refresh the appointments after deletion
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

    return (<div className="p-6">
        <PatientMenu/>
        <h1 className="text-3xl font-bold mb-4">Programari</h1>
        <div className="flex">
            <div className="bg-white p-4 rounded shadow w-1/2 mr-2">
                <h2 className="text-2xl font-bold mb-2">Programari anterioare</h2>
                {pastAppointments.map(appointment => (
                    <Appointment key={appointment.idConsultatie} appointment={appointment}/>))}
            </div>
            <div className="bg-white p-4 rounded shadow w-1/2 ml-2">
                <h2 className="text-2xl font-bold mb-2">Programari viitoare</h2>
                <ul>
                    {upcomingAppointments.map(appointment => (<li key={appointment.idConsultatie}>
                        <ul>
                            <Appointment appointment={appointment}/>
                        </ul>
                        <button onClick={() => openUpdateModal(appointment.idConsultatie)}
                                className="bg-sky-500 hover:bg-sky-600 text-white rounded px-2.5 py-2 transition duration-200">Update
                        </button>
                        <button onClick={() => deleteAppointment(appointment.idConsultatie)}
                                className="bg-red-500 text-white rounded px-2.5 py-2 hover:bg-red-700 ml-56 transition duration-200">Delete
                        </button>
                    </li>))}
                </ul>
            </div>
        </div>
    </div>);
}

export default PatientAppointments;
