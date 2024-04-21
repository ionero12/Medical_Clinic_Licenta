import React, {useEffect, useState} from 'react';
import {useUser} from '../user/UserContext'; // import useUser
import MedicMenu from '../components/MedicMenu';
import axios from "axios";
import Modal from "react-modal";
import 'animate.css/animate.min.css';
import {faEdit, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const MedicAppointments = () => {
    Modal.setAppElement('#root')

    const [pastAppointments, setPastAppointments] = useState([]);
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);

    const {user} = useUser();
    const idMedic = user ? user.userData.idMedic : null;

    const [cnpPacient, setCnpPacient] = useState('');

    const [numeConsultatie, setNumeConsultatie] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedHour, setSelectedHour] = useState('08:00');
    const [idConsultatie, setIdConsultatie] = useState('');

    const [addModalIsOpen, setAddModalIsOpen] = useState(false);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);


    useEffect(() => {
        if (idMedic) {
            fetch(`http://localhost:8081/api/consultatie/medic?idMedic=${idMedic}`)
                .then(response => response.json())
                .then(data => {
                    const currentDate = new Date();
                    const past = data.filter(appointment => new Date(appointment.dataConsultatiei) <= currentDate);
                    const upcoming = data.filter(appointment => new Date(appointment.dataConsultatiei) > currentDate);
                    setPastAppointments(past);
                    setUpcomingAppointments(upcoming);
                    setNumeConsultatie(data[0].numeConsultatie);
                });
        }
    }, [idMedic]);


    const handleAddAppointment = async (event) => {
        event.preventDefault();
        console.log('Adding appointment:', idConsultatie, selectedDate, selectedHour);

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

        const newAppointment = {
            pacient: {
                cnpPacient
            },
            medic: {
                idMedic
            },
            numeConsultatie,
            dataConsultatiei: `${selectedDate}T${selectedHour}:00`
        };
        try {
            const response = await axios.post(`http://localhost:8081/api/consultatie`, newAppointment);
            setUpcomingAppointments([...upcomingAppointments, response.data])
            toast.success('Programare adăugată cu succes');
            closeAddModal();
        } catch (error) {
            console.error('Error adding appointment:', error);
        }
    };


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
            toast.success('Programare actualizată cu succes');
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
            toast.success('Programare ștearsă cu succes');
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
            <MedicMenu/>
            <div className="flex flex-col md:flex-row mt-4">
                <div className="bg-white p-4 rounded shadow w-full md:w-1/2 mr-2 mb-4 md:mb-0">
                    <h2 className="text-2xl font-bold mb-2">Programari anterioare</h2>
                    <ul>
                        {pastAppointments.map(appointment => (
                            <div key={appointment.idConsultatie} className="border-sky-500 border-2 mb-1 p-4">
                                Nume consultatie: {appointment.numeConsultatie}
                                <br/>
                                Nume pacient: {appointment.numePacient} {appointment.prenumePacient}
                                <br/>
                                Data: {new Date(appointment.dataConsultatiei).toLocaleDateString()}, Ora: {new Date(appointment.dataConsultatiei).toLocaleTimeString()}
                                <br/>
                            </div>))}
                    </ul>
                </div>
                <div className="bg-white p-4 rounded shadow w-full md:w-1/2">
                    <h2 className="text-2xl font-bold mb-2">Programari viitoare</h2>
                    <button
                        onClick={openAddModal}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-3 rounded mt-4">
                        Adauga programare <FontAwesomeIcon icon={faPlus}/>
                    </button>
                    <Modal
                        isOpen={addModalIsOpen}
                        onRequestClose={closeAddModal}
                        contentLabel="Add AppointmentMedic"
                        className="w-80 h-80 p-4 m-4 md:w-1/2 md:h-1/2 lg:w-1/3 lg:h-2/3 mx-auto mt-36 bg-indigo-300 rounded-2xl p-5 border-2 border-indigo-700 text-center content-center animate__animated animate__zoomIn"
                    >
                        <form onSubmit={handleAddAppointment} className="flex flex-col">
                            <label className="mb-2">
                                CNP-ul pacientului:
                                <input type="text" value={cnpPacient}
                                       onChange={e => setCnpPacient(e.target.value)} required
                                       className="mt-1"/>
                            </label>
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
                            <input type="submit" value="Submit"
                                   className="mt-7 border-2 border-indigo-700 rounded-3xl w-1/2 mx-auto"/>
                        </form>
                    </Modal>
                    <h2 className="text-2xl font-bold mb-2">Programari viitoare</h2>
                    <ul>
                        {upcomingAppointments.sort((a, b) => new Date(a.data) - new Date(b.data)).map(appointment => (
                            <div key={appointment.idConsultatie} className="border-sky-500 border-2 mb-1 p-4">
                                Nume consultatie: {appointment.numeConsultatie}
                                <br/>
                                Nume pacient: {appointment.numePacient} {appointment.prenumePacient}
                                <br/>
                                Data: {new Date(appointment.dataConsultatiei).toLocaleDateString()},
                                Ora: {new Date(appointment.dataConsultatiei).toLocaleTimeString()}
                                <br/>
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
    </div>)
};

export default MedicAppointments;
