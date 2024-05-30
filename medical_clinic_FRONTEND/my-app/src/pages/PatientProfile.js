import React, {useEffect, useState} from 'react';
import {useUser} from "../user/UserContext";
import PatientMenu from "../components/PatientMenu";
import profilePic from '../assets/images/profilePic.png';
import api from '../user/api.js'
import {toast, ToastContainer} from "react-toastify";


function PatientProfile() {
    const {user} = useUser();
    const idPacient = user ? user.userData.idPacient : null;

    const [emailPacient, setEmailPacient] = useState('');
    const [parolaPacient, setParolaPacient] = useState('');
    const [numePacient, setNumePacient] = useState('');
    const [prenumePacient, setPrenumePacient] = useState('');
    const [telefonPacient, setTelefonPacient] = useState('');
    const [greutatePacient, setGreutatePacient] = useState('');
    const [inaltimePacient, setInaltimePacient] = useState('');
    const [varstaPacient, setVarstaPacient] = useState('');
    const [asigurat, setAsigurat] = useState('');
    const [abonamentPacient, setAbonamentPacient] = useState('');

    useEffect(() => {
        const fetchPacient = async () => {
            if (idPacient) {
                try {
                    const response = await api.get(`/pacient/${idPacient}`);
                    const data = response.data;
                    setEmailPacient(data.emailPacient || '');
                    setParolaPacient(data.parolaPacient || '');
                    setNumePacient(data.numePacient || '');
                    setPrenumePacient(data.prenumePacient || '');
                    setTelefonPacient(data.telefonPacient || '');
                    setGreutatePacient(data.greutatePacient || '');
                    setInaltimePacient(data.inaltimePacient || '');
                    setVarstaPacient(data.varstaPacient || '');
                    setAsigurat(data.asigurat || '');
                    setAbonamentPacient(data.abonamentPacient || '');
                } catch (error) {
                    console.error('Error fetching patient:', error);
                }
            }
        };

        fetchPacient();
    }, [idPacient]);

    const updatePacientProfile = async () => {
        try {
            const response = await api.put(`/pacient/${idPacient}`, null, {
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

            toast.success('Medic profile updated successfully');
        } catch (error) {
            if (error.response && error.response.data) {
                const errorData = error.response.data;
                for (const [field, message] of Object.entries(errorData)) {
                    toast.error(`Error: ${message}`);
                }
            } else {
                toast.error('Error updating medic profile');
            }
            console.error('Error updating medic profile:', error);
        }
    };

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
            <div className="pt-5 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-screen">
                <div className="bg-white grid md:grid-cols-3 grid-cols-1 gap-4 p-2">
                    <div className="flex flex-col max-w-md p-5 shadow-md mt-4 md:mt-0 w-full border border-gray-400">
                        <label className="block mb-2">
                            Email:
                            <input
                                type="email"
                                value={emailPacient}
                                onChange={e => setEmailPacient(e.target.value)}
                                className="w-full px-2 py-1 mb-2 border border-gray-400"
                            />
                        </label>
                        <label className="block mb-2">
                            Password:
                            <input
                                type="password"
                                value={parolaPacient}
                                onChange={e => setParolaPacient(e.target.value)}
                                className="w-full px-2 py-1 mb-2 border border-gray-400"
                            />
                        </label>
                        <label className="block mb-2">
                            Phone number:
                            <input
                                type="phone"
                                value={telefonPacient}
                                onChange={e => setTelefonPacient(e.target.value)}
                                className="w-full px-2 py-1 mb-2 border border-gray-400"
                            />
                        </label>
                        <label className="block mb-2">
                            Age:
                            <input
                                type="number"
                                value={varstaPacient}
                                onChange={e => setVarstaPacient(e.target.value)}
                                className="w-full px-2 py-1 mb-2 border border-gray-400"
                            />
                        </label>
                    </div>
                    <div
                        className="flex flex-col items-center max-w-md p-5 shadow-md mb-4 md:mb-0 w-full border border-gray-400">
                        <h2 className="text-2xl p-3">{numePacient} {prenumePacient}</h2>
                        <div
                            className="w-32 h-32 rounded-full border border-gray-400 flex items-center justify-center mb-4">
                            <img src={profilePic} alt="Profile" className="w-28 h-28 rounded-full"/>
                        </div>
                        <label className="block mb-2 p-2">
                            Assured:
                            <select value={asigurat} onChange={e => setAsigurat(e.target.value)}>
                                <option value="Y">Da</option>
                                <option value="N">Nu</option>
                            </select>
                        </label>
                        <label className="block mb-2 p-2">
                            Subscription:
                            <select value={abonamentPacient} onChange={e => setAbonamentPacient(e.target.value)}>
                                <option value="Y">Yes</option>
                                <option value="N">No</option>
                            </select>
                        </label>
                        <div className="flex justify-center items-end text-lg w-full">
                            <button onClick={updatePacientProfile}
                                    className="mt-4 mb-4 p-3 bg-blue-700 hover:bg-blue-900 text-white cursor-pointer rounded">
                                Update Profile
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col max-w-md p-5 shadow-md mt-4 md:mt-0 w-full border border-gray-400">
                        <label className="block mb-2">
                            Second name:
                            <input
                                type="text"
                                value={numePacient}
                                onChange={e => setNumePacient(e.target.value)}
                                className="w-full px-2 py-1 mb-2 border border-gray-400"
                            />
                        </label>
                        <label className="block mb-2">
                            First name:
                            <input
                                type="text"
                                value={prenumePacient}
                                onChange={e => setPrenumePacient(e.target.value)}
                                className="w-full px-2 py-1 mb-2 border border-gray-400"
                            />
                        </label>
                        <label className="block mb-2">
                            Weight:
                            <input
                                type="number"
                                value={greutatePacient}
                                onChange={e => setGreutatePacient(e.target.value)}
                                className="w-full px-2 py-1 mb-2 border border-gray-400"
                            />
                        </label>
                        <label className="block mb-2">
                            Height:
                            <input
                                type="number"
                                value={inaltimePacient}
                                onChange={e => setInaltimePacient(e.target.value)}
                                className="w-full px-2 py-1 mb-2 border border-gray-400"
                            />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default PatientProfile;