import React, {useEffect, useState} from 'react';
import {useUser} from '../user/UserContext';
import PatientMenu from '../components/PatientMenu';
import axios from "axios";
import Modal from "react-modal";
import AppointmentPatient from "../components/AppointmentPatient";
import 'animate.css/animate.min.css';
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {toast} from "react-toastify";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const PatientAppointments = () => {
    Modal.setAppElement('#root')

    const [pastAppointments, setPastAppointments] = useState([]);
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);

    const {user} = useUser();
    const idPacient = user ? user.userData.idPacient : null;

    const [selectedDate, setSelectedDate] = useState('');
    const [selectedHour, setSelectedHour] = useState('08:00'); // Default to 08:00
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


    const handleUpdateAppointment = async (event) => {
        event.preventDefault();
        console.log('Updating appointment:', idConsultatie, selectedDate, selectedHour);

        const date = new Date(selectedDate);
        const currentDate = new Date();

        if (date < currentDate) {
            toast.error('Nu se pot actualiza programări la o dată din trecut');
            return;
        }
        if (date.getDay() === 6 || date.getDay() === 0) {
            toast.error('Nu se pot actualiza programări în weekend');
            return;
        }

        try {
            const response = await axios.put(`http://localhost:8081/api/consultatie/${idConsultatie}`, null, {
                params: {
                    dataConsultatiei: `${selectedDate}T${selectedHour}:00`
                }
            });
            setPastAppointments(pastAppointments.map(appointment => appointment.idConsultatie === idConsultatie ? response.data : appointment));
            setUpcomingAppointments(upcomingAppointments.map(appointment => appointment.idConsultatie === idConsultatie ? response.data : appointment));
            toast.success('Programarea a fost actualizată cu succes');
            closeEditModal();
        } catch (error) {
            console.error('Error updating appointment:', error);
        }

    };


    const deleteAppointment = (idConsultatie) => {
        fetch(`http://localhost:8081/api/consultatie/${idConsultatie}`, {
            method: 'DELETE',
        }).then(() => {
            setPastAppointments(pastAppointments.filter(appointment => appointment.idConsultatie !== idConsultatie));
            setUpcomingAppointments(upcomingAppointments.filter(appointment => appointment.idConsultatie !== idConsultatie));
            toast.success('Programarea a fost ștearsă cu succes');
        });
    };


    const takenHours = new Set(upcomingAppointments
        .filter(appointment => appointment.dataConsultatiei.startsWith(selectedDate))
        .map(appointment => new Date(appointment.dataConsultatiei).getHours()));


    const hoursOptions = [];
    for (let i = 8; i <= 18; i++) {
        if (!takenHours.has(i)) {
            const hour = i < 10 ? `0${i}` : `${i}`;
            hoursOptions.push(<option key={hour} value={hour}>
                {`${hour}:00`}
            </option>);
        }
    }

    function openEditModal() {
        setEditModalIsOpen(true);
    }

    function closeEditModal() {
        setEditModalIsOpen(false);
    }

    return (<div>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            draggable
            theme="light"
        />
        <div className="p-6">
                <PatientMenu/>
                <div className="flex flex-col md:flex-row mt-4">
                    <div className="bg-white p-4 rounded shadow w-full md:w-1/2 mr-2 mb-4 md:mb-0">
                        <h2 className="text-2xl font-bold mb-2">Programari anterioare</h2>
                        {pastAppointments.map(appointment => (
                            <div key={appointment.idConsultatie} className="border-sky-500 border-2 mb-1 p-2">
                                <AppointmentPatient appointment={appointment}/>
                            </div>))}
                    </div>
                    <div className="bg-white p-4 rounded shadow w-full md:w-1/2">
                        <h2 className="text-2xl font-bold mb-2">Programari viitoare</h2>
                        <ul>
                            {upcomingAppointments.map(appointment => (
                                <div key={appointment.idConsultatie} className="border-sky-500 border-2 mb-1 p-2">
                                    <AppointmentPatient appointment={appointment}/>
                                    <button
                                        onClick={() => {
                                            setIdConsultatie(appointment.idConsultatie);
                                            openEditModal();
                                        }}
                                        className="bg-sky-500 hover:bg-sky-600 text-white rounded px-2.5 py-2 transition duration-200">
                                        Update <FontAwesomeIcon icon={faEdit}/>
                                    </button>
                                    <Modal
                                        isOpen={editModalIsOpen}
                                        onRequestClose={closeEditModal}
                                        contentLabel="Update AppointmentMedic"
                                        className="w-80 h-80 p-4 m-4 md:w-1/2 md:h-1/2 lg:w-1/3 lg:h-2/3 mx-auto mt-36 bg-indigo-300 rounded-2xl p-5 border-2 border-indigo-700 text-center content-center animate__animated animate__zoomIn"
                                    >
                                        <form onSubmit={handleUpdateAppointment} className="flex flex-col">
                                            <label className="mb-2">
                                                Selectati data:
                                                <input
                                                    type="date"
                                                    value={selectedDate}
                                                    onChange={(e) => setSelectedDate(e.target.value)}
                                                    required
                                                />
                                            </label>
                                            <label className="mb-2">
                                                Selectati ora:
                                                <select
                                                    value={selectedHour}
                                                    onChange={(e) => setSelectedHour(e.target.value)}
                                                    required
                                                >
                                                    {hoursOptions}
                                                </select>
                                            </label>
                                            <input type="submit" value="Update"
                                                   className="mt-7 border-2 border-indigo-700 rounded-3xl w-1/2 mx-auto"/>
                                        </form>
                                    </Modal>
                                    <button onClick={() => deleteAppointment(appointment.idConsultatie)}
                                            className="bg-red-500 text-white rounded px-2.5 py-2 hover:bg-red-700 ml-5 transition duration-200">
                                        Delete <FontAwesomeIcon icon={faTrash}/>
                                    </button>
                                </div>))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>);
}

export default PatientAppointments;
