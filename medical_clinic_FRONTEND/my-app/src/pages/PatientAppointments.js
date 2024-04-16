import React, {useEffect, useState} from 'react';
import {useUser} from '../user/UserContext'; // import useUser
import PatientMenu from '../components/PatientMenu';
import Appointment from "../components/Appointment";
import axios from "axios";
import Modal from "react-modal";


const PatientAppointments = () => {
    Modal.setAppElement('#root')

    const [pastAppointments, setPastAppointments] = useState([]);
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);

    const {user} = useUser();
    const idPacient = user ? user.idPacient : null;

    const [dataConsultatiei] = useState('');
    const [newDataConsultatiei, setNewDataConsultatiei] = useState('');
    const [idConsultatie, setIdConsultatie] = useState('');

    const [editModalIsOpen, setEditModalIsOpen] = useState(false);

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

    const handleUpdateAppointment = async (event) => {
        event.preventDefault();
        if (dataConsultatiei !== newDataConsultatiei) {
            console.log('Updating appointment:', idConsultatie, newDataConsultatiei)
            try {
                const response = await axios.put(`http://localhost:8081/api/consultatie/${idConsultatie}`, null, {
                    params: {
                        dataConsultatiei: newDataConsultatiei
                    }
                });
                console.log('Appointment updated successfully:', response.data);
                setPastAppointments(pastAppointments.map(appointment => appointment.idConsultatie === idConsultatie ? response.data : appointment));
                setUpcomingAppointments(upcomingAppointments.map(appointment => appointment.idConsultatie === idConsultatie ? response.data : appointment));
            } catch (error) {
                console.error('Error updating appointment:', error);
            }
        }
    };

    function openEditModal() {
        setEditModalIsOpen(true);
    }

    function closeEditModal() {
        setEditModalIsOpen(false);
    }

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
                        <button
                            onClick={() => {
                                setIdConsultatie(appointment.idConsultatie);
                                openEditModal();
                            }}
                            className="bg-sky-500 hover:bg-sky-600 text-white rounded px-2.5 py-2 transition duration-200">Update
                        </button>
                        <Modal
                            isOpen={editModalIsOpen}
                            onRequestClose={closeEditModal}
                            contentLabel="Update Appointment"
                            className="w-1/3 h-2/3 mx-auto mt-36 bg-indigo-300 rounded-2xl p-5 border-2 border-indigo-700 text-center content-center"
                        >
                            <form onSubmit={handleUpdateAppointment} className="flex flex-col">
                                <label className="mb-2">
                                    Selectati noua data si ora a consultatiei:
                                    <input type="datetime-local" value={newDataConsultatiei}
                                           onChange={e => setNewDataConsultatiei(e.target.value)} required
                                           className="mt-1"/>
                                </label>
                                <input type="submit" value="Update"
                                       className="mt-7 border-2 border-indigo-700 rounded-3xl w-1/2 mx-auto"/>
                            </form>
                        </Modal>
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
