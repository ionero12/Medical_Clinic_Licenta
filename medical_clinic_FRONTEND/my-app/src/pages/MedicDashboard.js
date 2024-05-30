import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useUser} from '../user/UserContext'; // import useUser
import MedicMenu from '../components/MedicMenu';
import api from '../user/api.js'


const MedicDashboard = () => {
    const [patients, setPatients] = useState([]);
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const {user} = useUser();  // get user from the user context
    const idMedic = user ? user.userData.idMedic : null;  // get medicId from the user

    useEffect(() => {
        const fetchPatients = async () => {
            if (user && idMedic) {
                try {
                    const response = await api.get(`/pacient/medic?idMedic=${idMedic}`)
                    setPatients(response.data);
                } catch (error) {
                    console.error('Failed to fetch patients', error);
                }
            }
        };

        const fetchConsultations = async () => {
            if (user && idMedic) {
                try {
                    const response = await api.get(`/consultatie/medic?idMedic=${idMedic}`);
                    const currentDate = new Date();
                    const filteredAppointments = response.data.filter(appointment => new Date(appointment.dataConsultatiei) > currentDate);
                    setUpcomingAppointments(filteredAppointments);
                } catch (error) {
                    console.error('Failed to fetch consultations', error);
                }
            }
        };

        fetchPatients();
        fetchConsultations();
    }, [user, idMedic]);

    return (<div className="p-6">
        <MedicMenu medicId={idMedic}/>
        <div className="flex flex-col md:flex-row mt-4">
            <div className="bg-white p-4 rounded shadow w-full md:w-1/2 mr-2 mb-4 md:mb-0">
                <h2 className="text-2xl font-bold mb-2 mt-2">Patients</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {patients.map((pacient) => (<div key={pacient.idPacient} className="p-4">
                        <div
                            className="border-gray-400 border-2 p-4 rounded-md shadow-lg transition duration-300 ease-in-out hover:shadow-2xl">
                            <Link
                                to={`/pacient/${pacient.idPacient}`}
                                className="flex flex-col items-center text-center"
                            >
                                <h2 className="text-xl font-bold mb-2">
                                    {pacient.numePacient} {pacient.prenumePacient}
                                </h2>
                                <button
                                    className="mt-4 bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
                                    See profile
                                </button>
                            </Link>
                        </div>
                    </div>))}
                </div>
            </div>
            <div className="bg-white p-4 rounded shadow w-full md:w-1/2">
                <h2 className="text-2xl font-bold mb-2 mt-4">Upcoming Appointments</h2>
                <ul>
                    {upcomingAppointments.map((appointment) => (<div key={appointment.idConsultatie}
                                                                     className="border-gray-400 border-2 p-4 rounded-md shadow-lg transition duration-300 ease-in-out hover:shadow-2xl mb-2">
                        Appointment name: {appointment.numeConsultatie}
                        <br/>
                        Patient name: {appointment.numePacient} {appointment.prenumePacient}
                        <br/>
                        Date: {new Date(appointment.dataConsultatiei).toLocaleDateString()}, Hour:{' '}
                        {new Date(appointment.dataConsultatiei).toLocaleTimeString()}
                        <br/>
                    </div>))}
                </ul>
            </div>
        </div>
    </div>);
}

export default MedicDashboard;
