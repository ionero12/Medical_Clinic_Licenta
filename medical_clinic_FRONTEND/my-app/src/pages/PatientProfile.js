import React, {useState} from 'react';
import {useUser} from "../user/UserContext";
import axios from "axios";
import PatientMenu from "../components/PatientMenu";
import profilePic from '../assets/images/profilePic.png';

//TODO: repair css for the profile page

function PatientProfile() {
    const {user} = useUser();
    const idPacient = user ? user.userData.idPacient : null;
    const [emailPacient, setEmailPacient] = useState(user ? user.userData.emailPacient : '');
    const [parolaPacient, setParolaPacient] = useState(user ? user.userData.parolaPacient : '');
    const [numePacient, setNumePacient] = useState(user ? user.userData.numePacient : '');
    const [prenumePacient, setPrenumePacient] = useState(user ? user.userData.prenumePacient : '');
    const [telefonPacient, setTelefonPacient] = useState(user ? user.userData.telefonPacient : '');
    const [greutatePacient, setGreutatePacient] = useState(user ? user.userData.greutatePacient : '');
    const [inaltimePacient, setInaltimePacient] = useState(user ? user.userData.inaltimePacient : '');
    const [varstaPacient, setVarstaPacient] = useState(user ? user.userData.varstaPacient : '');
    const [asigurat, setAsigurat] = useState(user ? user.userData.asigurat : '');
    const [abonamentPacient, setAbonamentPacient] = useState(user ? user.userData.abonamentPacient : '');

    const updatePacientProfile = async () => {
        try {
            const response = await axios.put(`http://localhost:8081/api/pacient/${idPacient}`, null, {
                params: {
                    emailPacient,
                    parolaPacient,
                    numePacient,
                    prenumePacient,
                    telefonPacient,
                    greutatePacient,
                    inaltimePacient,
                    varstaPacient,
                    asigurat,
                    abonamentPacient
                }
            });

            console.log('Patient profile updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating patient profile:', error);
        }
    };

    return (<div className="p-6">
            <PatientMenu/>
            <div className="pt-5 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-screen">
                <div className="flex flex-col md:flex-row items-start mt-8 space-x-0 md:space-x-4">
                    <div
                        className="flex flex-col items-center max-w-md bg-white p-5 rounded shadow-md mb-4 md:mb-0 w-full md:w-1/2">
                        <h2 className="text-2xl p-3">{numePacient} {prenumePacient}</h2>
                        <div
                            className="w-32 h-32 rounded-full border border-cyan-300 flex items-center justify-center mb-4">
                            <img src={profilePic} alt="Profile" className="w-28 h-28 rounded-full"/>
                        </div>
                        <label className="block mb-2 p-2">
                            Asigurat:
                            <select value={asigurat} onChange={e => setAsigurat(e.target.value)}>
                                <option value="Y">Da</option>
                                <option value="N">Nu</option>
                            </select>
                        </label>
                        <label className="block mb-2 p-2">
                            Abonament:
                            <select value={abonamentPacient} onChange={e => setAbonamentPacient(e.target.value)}>
                                <option value="Y">Da</option>
                                <option value="N">Nu</option>
                            </select>
                        </label>
                        <label className="block mb-2">
                            Email:
                            <input
                                type="email"
                                value={emailPacient}
                                onChange={e => setEmailPacient(e.target.value)}
                                className="w-full px-2 py-1 mb-2 border border-cyan-300"
                            />
                        </label>
                        <label className="block mb-2">
                            Parola:
                            <input
                                type="password"
                                value={parolaPacient}
                                onChange={e => setParolaPacient(e.target.value)}
                                className="w-full px-2 py-1 mb-2 border border-cyan-300"
                            />
                        </label>
                    </div>
                    <div className="flex flex-col max-w-md bg-white p-5 rounded shadow-md mt-4 md:mt-0 w-full md:w-1/2">
                        <label className="block mb-2">
                            Nume:
                            <input
                                type="text"
                                value={numePacient}
                                onChange={e => setNumePacient(e.target.value)}
                                className="w-full px-2 py-1 mb-2 border border-cyan-300"
                            />
                        </label>
                        <label className="block mb-2">
                            Prenume:
                            <input
                                type="text"
                                value={prenumePacient}
                                onChange={e => setPrenumePacient(e.target.value)}
                                className="w-full px-2 py-1 mb-2 border border-cyan-300"
                            />
                        </label>
                        <label className="block mb-2">
                            Greutate:
                            <input
                                type="number"
                                value={greutatePacient}
                                onChange={e => setGreutatePacient(e.target.value)}
                                className="w-full px-2 py-1 mb-2 border border-cyan-300"
                            />
                        </label>
                        <label className="block mb-2">
                            Inaltime:
                            <input
                                type="number"
                                value={inaltimePacient}
                                onChange={e => setInaltimePacient(e.target.value)}
                                className="w-full px-2 py-1 mb-2 border border-cyan-300"
                            />
                        </label>
                        <label className="block mb-2">
                            Varsta:
                            <input
                                type="number"
                                value={varstaPacient}
                                onChange={e => setVarstaPacient(e.target.value)}
                                className="w-full px-2 py-1 mb-2 border border-cyan-300"
                            />
                        </label>

                        <label className="block mb-2">
                            Telefon:
                            <input
                                type="phone"
                                value={telefonPacient}
                                onChange={e => setTelefonPacient(e.target.value)}
                                className="w-full px-2 py-1 mb-2 border border-cyan-300"
                            />
                        </label>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button onClick={updatePacientProfile}
                            className="mt-4 px-4 py-2 bg-gray-800 text-white border-none cursor-pointer">Update Profile
                    </button>
                </div>
            </div>
        </div>

    );
}

export default PatientProfile;
