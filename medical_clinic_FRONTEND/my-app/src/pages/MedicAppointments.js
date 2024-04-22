import React, {useEffect, useState} from 'react';
import axios from "axios";
import Modal from "react-modal";
import 'react-toastify/dist/ReactToastify.css';
import 'animate.css/animate.min.css';
import {faEdit, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {toast, ToastContainer} from "react-toastify";
import {useUser} from '../user/UserContext';
import MedicMenu from '../components/MedicMenu';


const MedicAppointments = () => {
    Modal.setAppElement('#root')

    const {user} = useUser();
    const idMedic = user ? user.userData.idMedic : null;

    const [pastAppointments, setPastAppointments] = useState([]);
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);


    const [cnpPacient, setCnpPacient] = useState('');
    const [idConsultatie, setIdConsultatie] = useState('');
    const [numeConsultatie, setNumeConsultatie] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedHour, setSelectedHour] = useState('08:00');

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

        const patientResponse = await axios.get(`http://localhost:8081/api/pacient/cnp?cnpPacient=${cnpPacient}`);
        const patientData = patientResponse.data;

        const newAppointment = {
            pacient: {
                cnpPacient,
                numePacient: patientData.numePacient,
                prenumePacient: patientData.prenumePacient
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
        setCnpPacient('');
        setSelectedDate('');
        setSelectedHour('08:00');
        setAddModalIsOpen(false);
    }

    const openEditModal = (appointment) => {
        setSelectedDate(appointment.dataConsultatiei.split('T')[0]);
        setSelectedHour(appointment.dataConsultatiei.split('T')[1].slice(0, 5));
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
                            <div key={appointment.idConsultatie} className="border-gray-400 border-2 mb-1 p-4">
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
                    <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold mb-2">Programari viitoare</h2>
                    <button
                        onClick={openAddModal}
                        className="bg-emerald-500 hover:bg-emerald-700 text-white py-2 px-3 rounded mb-2">
                        Adauga programare <FontAwesomeIcon icon={faPlus}/>
                    </button>
                    </div>
                    <Modal
                        isOpen={addModalIsOpen}
                        onRequestClose={closeAddModal}
                        contentLabel="Add AppointmentMedic"
                        className="w-80 h-80 p-4 m-4 md:w-1/2 md:h-1/2 lg:w-1/3 lg:h-2/3 mx-auto mt-36 bg-blue-300 rounded-2xl p-5 border-2 border-blue-600 text-center content-center animate__animated animate__zoomIn"
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
                                   className="mt-7 border-2 border-blue-600 rounded-3xl w-1/2 mx-auto"/>
                        </form>
                    </Modal>
                    <ul>
                        {upcomingAppointments.sort((a, b) => new Date(a.data) - new Date(b.data)).map(appointment => (
                            <div key={appointment.idConsultatie} className="border-gray-400 border-2 mb-1 p-4">
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
                                        openEditModal(appointment);
                                    }}
                                    className="bg-sky-500 hover:bg-sky-600 text-white rounded px-2.5 py-2 transition duration-200">
                                    Update <FontAwesomeIcon icon={faEdit}/>
                                </button>
                                <Modal
                                    isOpen={editModalIsOpen}
                                    onRequestClose={closeEditModal}
                                    contentLabel="Update AppointmentMedic"
                                    className="w-80 h-80 p-4 m-4 md:w-1/2 md:h-1/2 lg:w-1/3 lg:h-2/3 mx-auto mt-36 bg-blue-200 rounded-2xl p-5 border-2 border-blue-600 text-center content-center animate__animated animate__zoomIn"
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
                                               className="mt-7 border-2 border-blue-600 rounded-3xl w-1/2 mx-auto"/>
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
