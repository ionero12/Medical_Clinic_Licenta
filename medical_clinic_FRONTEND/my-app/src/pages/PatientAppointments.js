import React, {useEffect, useState} from 'react';
import axios from "axios";
import Modal from "react-modal";
import 'react-toastify/dist/ReactToastify.css';
import 'animate.css/animate.min.css';
import {faEdit, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {toast, ToastContainer} from "react-toastify";
import {useUser} from '../user/UserContext';
import PatientMenu from '../components/PatientMenu';
import StarRating from '../components/StarRating';

const PatientAppointments = () => {
    Modal.setAppElement('#root')

    const {user} = useUser();
    const idPacient = user ? user.userData.idPacient : null;

    //const [appointments, setAppointments] = useState([]);
    const [pastAppointments, setPastAppointments] = useState([]);
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);

    const [medics, setMedics] = useState([]);
    const [idMedic, setIdMedic] = useState("");
    const [idConsultatie, setIdConsultatie] = useState('');
    const [numeConsultatie, setNumeConsultatie] = useState("");
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedHour, setSelectedHour] = useState('08:00'); // Default to 08:00
    const [rating, setRating] = useState('');
    const [feedback, setFeedback] = useState('');

    const [addAppointmentModalIsOpen, setAddAppointmentModalIsOpen] = useState(false);
    const [addFeedbackModalIsOpen, setAddFeedbackModalIsOpen] = useState(false);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);

    const [uniqueAppointments, setUniqueAppointments] = useState([]);


    useEffect(() => {
        if (idPacient) {
            fetch(`http://localhost:8081/api/consultatie/pacient?idPacient=${idPacient}`)
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

    useEffect(() => {
        fetch('http://localhost:8081/api/consultatie')
            .then(response => response.json())
            .then(data => {
                //setAppointments(data);
                const uniqueAppointments = data.filter((appointment, index, self) => index === self.findIndex((t) => (t.numeConsultatie === appointment.numeConsultatie)));
                setUniqueAppointments(uniqueAppointments);
            })
            .catch(error => console.error('Error fetching appointments:', error));
    }, []);

    useEffect(() => {
        if (numeConsultatie) {
            const specialization = numeConsultatie.split(" ")[0];
            fetch(`http://localhost:8081/api/medic/specializare?specializare=${specialization}`)
                .then(response => response.json())
                .then(data => {
                    setMedics(data);
                })
                .catch(error => console.error('Error fetching doctors:', error));
        }
    }, [numeConsultatie]);

    const handleAddAppointment = async (event) => {
        event.preventDefault();

        const date = new Date(selectedDate);
        const currentDate = new Date();

        if (date < currentDate) {
            toast.error('Cannot update appointments to a date in the past');
            return;
        }
        if (date.getDay() === 6 || date.getDay() === 0) {
            toast.error('Weekend appointments cannot be updated');
            return;
        }

        const medicResponse = await axios.get(`http://localhost:8081/api/medic/${idMedic}`);
        const medicData = medicResponse.data;

        const newAppointment = {
            pacient: {
                cnpPacient: user.userData.cnpPacient
            }, medic: {
                idMedic, numeMedic: medicData.numeMedic, prenumeMedic: medicData.prenumeMedic
            }, numeConsultatie, dataConsultatiei: `${selectedDate}T${selectedHour}:00`
        };
        try {
            const response = await axios.post(`http://localhost:8081/api/consultatie`, newAppointment);
            setUpcomingAppointments([...upcomingAppointments, response.data])
            toast.success('Appointment added successfully');
            closeAddAppointmentModal();
        } catch (error) {
            console.error('Error adding appointment:', error);
        }
    };

    const handleAddFeedback = async (event) => {
        event.preventDefault();

        try {
            await axios.put(`http://localhost:8081/api/consultatie/${idConsultatie}`, null, {
                params: {
                    feedback: feedback, rating: rating
                }
            });
            toast.success('Feedback successfully added');
            closeAddFeedbackModal();
        } catch (error) {
            console.error('Error adding feedback:', error);
        }
    };


    const handleUpdateAppointment = async (event) => {
        event.preventDefault();

        const date = new Date(selectedDate);
        const currentDate = new Date();

        if (date < currentDate) {
            toast.error('Cannot update appointments to a date in the past');
            return;
        }
        if (date.getDay() === 6 || date.getDay() === 0) {
            toast.error('Weekend appointments cannot be updated');
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
            toast.success('The appointment has been updated successfully');
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
            toast.success('The appointment has been successfully deleted');
        });
    };

    const handleAppointmentChange = (idMedic, numeConsultatie) => {
        setNumeConsultatie(numeConsultatie);
        setIdMedic(idMedic);
    };

    const handleRatingChange = (newRating) => {
        setRating(newRating);
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

    function openAddAppointmentModal() {
        setAddAppointmentModalIsOpen(true);
    }

    function closeAddAppointmentModal() {
        setNumeConsultatie('');
        setIdMedic('');
        setSelectedDate('');
        setSelectedHour('08:00');
        setAddAppointmentModalIsOpen(false);
    }

    function openAddFeedbackModal() {
        setAddFeedbackModalIsOpen(true);
    }

    function closeAddFeedbackModal() {
        setFeedback('');
        setRating('');
        setAddFeedbackModalIsOpen(false);
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
            <PatientMenu/>
            <div className="flex flex-col md:flex-row mt-4">
                <div className="bg-white p-4 rounded shadow w-full md:w-1/2 mr-2 mb-4 md:mb-0">
                    <h2 className="text-2xl font-bold mb-2">Past Appointments</h2>
                    {pastAppointments.map(appointment => (<div key={appointment.idConsultatie}
                                                               className="border-gray-400 border-2 p-4 rounded-md shadow-lg transition duration-300 ease-in-out hover:shadow-2xl mb-2">
                        <div>
                            Appointment name: {appointment.numeConsultatie}
                            <br/>
                            Medic name: {appointment.numeMedic} {appointment.prenumeMedic}
                            <br/>
                            Date: {new Date(appointment.dataConsultatiei).toLocaleDateString()},
                            Hour: {new Date(appointment.dataConsultatiei).toLocaleTimeString()}
                        </div>
                        <button
                            onClick={() => {
                                setIdConsultatie(appointment.idConsultatie);
                                openAddFeedbackModal();
                            }}
                            className={`bg-emerald-500 hover:bg-emerald-700 text-white py-2 px-3 rounded transition duration-200`}>
                            Add feedback <FontAwesomeIcon icon={faPlus}/>
                        </button>
                        <Modal
                            isOpen={addFeedbackModalIsOpen}
                            onRequestClose={closeAddFeedbackModal}
                            contentLabel="Add Feedback Medic"
                            className="w-80 h-80 p-4 m-4 md:w-1/2 md:h-1/2 lg:w-1/3 lg:h-2/3 mx-auto mt-36 bg-blue-200 rounded-2xl  border-2 border-blue-600 text-center content-center animate__animated animate__zoomIn"
                        >
                            <form onSubmit={handleAddFeedback} className="flex flex-col">
                                <label className="mb-2">
                                    Select the rating:
                                    <StarRating onRatingChange={handleRatingChange}/>
                                </label>
                                <label className="mb-2">
                                    Add feedback:
                                    <input
                                        type="text"
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                    />
                                </label>
                                <input type="submit" value="Submit"
                                       className="mt-7 border-2 border-blue-600 rounded-3xl w-1/2 mx-auto"/>
                            </form>
                        </Modal>
                    </div>))}
                </div>
                <div className="bg-white p-4 rounded shadow w-full md:w-1/2">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold mb-2">Upcoming Appointments</h2>
                        <button
                            onClick={openAddAppointmentModal}
                            className={`bg-emerald-500 hover:bg-emerald-700 text-white py-2 px-3 rounded mb-2 transition duration-200`}>
                            Add appointment <FontAwesomeIcon icon={faPlus}/>
                        </button>
                    </div>
                    <Modal
                        isOpen={addAppointmentModalIsOpen}
                        onRequestClose={closeAddAppointmentModal}
                        contentLabel="Add AppointmentMedic"
                        className="w-80 h-80 p-4 m-4 md:w-1/2 md:h-1/2 lg:w-1/3 lg:h-2/3 mx-auto mt-36 bg-blue-300 rounded-2xl  border-2 border-blue-600 text-center content-center animate__animated animate__zoomIn"
                    >
                        <form onSubmit={handleAddAppointment} className="flex flex-col">
                            <label className="mb-2">
                                Select the appointment:
                                <select
                                    onChange={e => handleAppointmentChange(e.target.value, e.target.options[e.target.selectedIndex].text)}>
                                    <option value="">Select appointment</option>
                                    {uniqueAppointments.map(appointment => (
                                        <option key={appointment.idConsultatie} value={appointment.idConsultatie}>
                                            {appointment.numeConsultatie}
                                        </option>))}
                                </select>
                            </label>
                            <label className="mb-2">
                                Select the doctor:
                                <select onChange={e => setIdMedic(e.target.value)} value={idMedic}>
                                    <option value="">Select doctor</option>
                                    {medics.map(medic => (<option key={medic.idMedic} value={medic.idMedic}>
                                        {medic.numeMedic} {medic.prenumeMedic}
                                    </option>))}
                                </select>
                            </label>
                            <label className="mb-2">
                                Select the date:
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    required
                                />
                            </label>
                            <label className="mb-2">
                                Select the hour:
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
                        {upcomingAppointments.map(appointment => (<div key={appointment.idConsultatie}
                                                                       className="border-gray-400 border-2 p-4 rounded-md shadow-lg transition duration-300 ease-in-out hover:shadow-2xl mb-2">
                            Appointment name: {appointment.numeConsultatie}
                            <br/>
                            Doctor name: {appointment.numeMedic} {appointment.prenumeMedic}
                            <br/>
                            Date: {new Date(appointment.dataConsultatiei).toLocaleDateString()},
                            Hour: {new Date(appointment.dataConsultatiei).toLocaleTimeString()}
                            <br/>
                            <button
                                onClick={() => {
                                    setIdConsultatie(appointment.idConsultatie);
                                    openEditModal(appointment);
                                }}
                                className={`bg-blue-500 hover:bg-sky-700 text-white rounded px-2.5 py-2 transition duration-200`}>
                                Update <FontAwesomeIcon icon={faEdit}/>
                            </button>
                            <Modal
                                isOpen={editModalIsOpen}
                                onRequestClose={closeEditModal}
                                contentLabel="Update AppointmentMedic"
                                className="w-80 h-80 p-4 m-4 md:w-1/2 md:h-1/2 lg:w-1/3 lg:h-2/3 mx-auto mt-36 bg-blue-200 rounded-2xl border-2 border-blue-600 text-center content-center animate__animated animate__zoomIn"
                            >
                                <form onSubmit={handleUpdateAppointment} className="flex flex-col">
                                    <label className="mb-2">
                                        Select the date
                                        <input
                                            type="date"
                                            value={selectedDate}
                                            onChange={(e) => setSelectedDate(e.target.value)}
                                            required
                                        />
                                    </label>
                                    <label className="mb-2">
                                        Select the hour:
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
                                    className={`bg-red-500 text-white rounded px-2.5 py-2 hover:bg-red-700 ml-5 transition duration-200`}>
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