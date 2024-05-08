import React, {useEffect, useState} from 'react';
import {useUser} from '../user/UserContext'; // import useUser
import PatientMenu from '../components/PatientMenu';
import {Link} from "react-router-dom";

const PatientDashboard = () => {
    const [medics, setMedics] = useState([]);
    const {user} = useUser(); // get user from the user context
    const idPacient = user ? user.userData.idPacient : null; // get patient ID from the user
    
    useEffect(() => {
        if (user && idPacient) {
            const urlMedics = `http://localhost:8081/api/medic`;

            fetch(urlMedics)
                .then(response => response.json())
                .then(data => {
                    const medicsWithSpecialization = data.map(medic => {
                        if (medic.consultatii.length > 0) {
                            const specializare = medic.consultatii[0].numeConsultatie.split(' ')[0];
                            return {...medic, specializare};
                        } else {
                            return {...medic, specializare: 'Unknown'};
                        }
                    });
                    setMedics(medicsWithSpecialization);
                });
        }
    }, [user, idPacient]);

    return (<div className="p-6">
        <PatientMenu/>
        <div className="bg-white p-4 rounded shadow w-full md:w-full mt-2 mb-4 md:mb-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {medics.map((medic) => (<div key={medic.idMedic} className="p-4">
                    <div
                        className="border-gray-400 border-2 p-4 rounded-md shadow-lg transition duration-300 ease-in-out hover:shadow-2xl">
                        <Link to={`/medic/${medic.idMedic}`}
                              className="flex flex-col items-center text-center ">
                            <h2 className="text-xl font-bold mb-2">{medic.numeMedic} {medic.prenumeMedic}</h2>
                            <p className="text-gray-700">Specialization: {medic.specializare}</p>
                            <button
                                className="mt-4 bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
                                See profile
                            </button>
                        </Link>
                    </div>
                </div>))}
            </div>
        </div>
    </div>);
}

export default PatientDashboard;
