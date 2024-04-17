import React, {useEffect, useState} from 'react';
import {useUser} from '../user/UserContext'; // import useUser
import MedicMenu from '../components/MedicMenu';
import Appointment from '../components/Appointment';
import axios from "axios";
import Modal from "react-modal";


const MedicAppointments = () => {
    Modal.setAppElement('#root')

    const [pastAppointments, setPastAppointments] = useState([]);
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);

    const {user} = useUser(); // get user from the user context
    const idMedic = user ? user.idMedic : null; // get patient ID from the user

    const [idPacient, setIdPacient] = useState('');
    const [numeConsultatie, setNumeConsultatie] = useState('');
    const [dataConsultatiei, setDataConsultatiei] = useState('');
    const [newDataConsultatiei, setNewDataConsultatiei] = useState('');
    const [idConsultatie, setIdConsultatie] = useState('');

    const [addModalIsOpen, setAddModalIsOpen] = useState(false);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);


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

    const handleAddAppointment = async (event) => {
        event.preventDefault();

        const newAppointment = {
            pacient: {
                idPacient
            }, medic: {
                idMedic
            }, numeConsultatie, dataConsultatiei
        };
        console.log('Adding appointment:', newAppointment)

        try {
            const response = await axios.post(`http://localhost:8081/api/consultatie`, newAppointment);
            setUpcomingAppointments([...upcomingAppointments, response.data])
            console.log('Appointment added successfully:', response.data);
            closeAddModal();
        } catch (error) {
            console.error('Error adding appointment:', error);
        }
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

    function openAddModal() {
        setAddModalIsOpen(true);
    }

    function closeAddModal() {
        setAddModalIsOpen(false);
    }

    function openEditModal() {
        setEditModalIsOpen(true);
    }

    function closeEditModal() {
        setEditModalIsOpen(false);
    }


    return (<div className="p-6">
        <MedicMenu/>
        <h1 className="text-3xl font-bold mb-4">Programari</h1>
        <div className="flex flex-col md:flex-row">
            <div className="bg-white p-4 rounded shadow w-full md:w-1/2 mr-2 mb-4 md:mb-0">
                <h2 className="text-2xl font-bold mb-2">Programari anterioare</h2>
                {pastAppointments.map(appointment => (<div key={appointment.idConsultatie}>
                    <Appointment appointment={appointment}/>
                </div>))}
            </div>
            <div className="bg-white p-4 rounded shadow w-full md:w-1/2">
                <button
                    onClick={openAddModal}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-3 rounded mt-4 ml-60">Add
                </button>
                <Modal
                    isOpen={addModalIsOpen}
                    onRequestClose={closeAddModal}
                    contentLabel="Add Appointment"
                    className="w-80 h-80 p-4 m-4 md:w-1/2 md:h-1/2 lg:w-1/3 lg:h-2/3 mx-auto mt-36 bg-indigo-300 rounded-2xl p-5 border-2 border-indigo-700 text-center content-center"
                >
                    <form onSubmit={handleAddAppointment} className="flex flex-col">
                        <label className="mb-2">
                            ID-ul pacientului:
                            <input type="text" value={idPacient}
                                   onChange={e => setIdPacient(e.target.value)} required
                                   className="mt-1"/>
                        </label>
                        <label className="mb-2">
                            Numele consultatiei:
                            <input type="text" value={numeConsultatie}
                                   onChange={e => setNumeConsultatie(e.target.value)} required
                                   className="mt-1"/>
                        </label>
                        <label className="mb-2">
                            Data si ora consultatiei:
                            <input type="datetime-local" value={dataConsultatiei}
                                   onChange={e => setDataConsultatiei(e.target.value)} required
                                   className="mt-1"/>
                        </label>
                        <input type="submit" value="Submit"
                               className="mt-7 border-2 border-indigo-700 rounded-3xl w-1/2 mx-auto"/>
                    </form>
                </Modal>
                <h2 className="text-2xl font-bold mb-2">Programari viitoare</h2>
                <ul>
                    {upcomingAppointments.map(appointment => (<div key={appointment.idConsultatie}>
                        <Appointment appointment={appointment}/>
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
                            className="w-80 h-80 p-4 m-4 md:w-1/2 md:h-1/2 lg:w-1/3 lg:h-2/3 mx-auto mt-36 bg-indigo-300 rounded-2xl p-5 border-2 border-indigo-700 text-center content-center"
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
                                className="bg-red-500 text-white rounded px-2.5 py-2 hover:bg-red-700 ml-5 transition duration-200">Delete
                        </button>
                    </div>))}
                </ul>
            </div>
        </div>
    </div>)
};

export default MedicAppointments;
