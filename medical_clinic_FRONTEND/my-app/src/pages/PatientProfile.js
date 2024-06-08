import React, {useEffect, useState} from 'react';
import {useUser} from "../user/UserContext";
import PatientMenu from "../components/PatientMenu";
import profilePic from '../assets/images/profilePic.png';
import {api, handleTokenExpiry} from '../user/api.js'
import {toast, ToastContainer} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";


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

    const [passwordModalIsOpen, setPasswordModalIsOpen] = useState(false);

    useEffect(() => {
        const fetchPacient = async () => {
            if (idPacient) {
                try {
                    const response = await api.get(`/pacient/${idPacient}`);
                    const data = response.data;
                    setEmailPacient(data.emailPacient || '');
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
            await api.put(`/pacient/${idPacient}`, null, {
                params: {
                    emailPacient,
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

            toast.success('Patient profile updated successfully');
        } catch (error) {
            if (error.response && error.response.data) {
                const errorData = error.response.data;
                for (const [message] of Object.entries(errorData)) {
                    toast.error(`Error: ${message}`);
                }
            } else {
                toast.error('Error updating patient profile');
            }
            console.error('Error updating patient profile:', error);
        }
    };

    const handlePasswordChange = async (event) => {
        event.preventDefault();

        try {
            await api.put(`/pacient/${idPacient}`, null, {
                params: {
                    parolaPacient
                }
            });
            toast.success('Patient password updated successfully');
        } catch (error) {
            if (error.response && error.response.data) {
                const errorData = error.response.data;
                for (const [message] of Object.entries(errorData)) {
                    toast.error(`Error: ${message}`);
                }
            } else {
                toast.error('Error updating patient password');
            }
            console.error('Error updating patient password:', error);
        }
    };

    function openPasswordModal() {
        setPasswordModalIsOpen(true);
    }

    function closePasswordModal() {
        setParolaPacient('')
        setPasswordModalIsOpen(false);
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
            <div className="pt-5 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-screen">
                <div className="bg-white grid md:grid-cols-3 grid-cols-1 gap-4 p-2">
                    <div className="flex flex-col max-w-md p-5 shadow-md mt-4 md:mt-0 w-full border border-gray-400">
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
                    <div
                        className="flex flex-col items-center max-w-md p-5 shadow-md mb-4 md:mb-0 w-full border border-gray-400">
                        <h2 className="text-2xl p-3">{numePacient} {prenumePacient}</h2>
                        <div
                            className="w-32 h-32 rounded-full border border-gray-400 flex items-center justify-center mb-4">
                            <img src={profilePic} alt="Profile" className="w-28 h-28 rounded-full"/>
                        </div>
                        <div className="flex justify-center">
                            <button
                                onClick={openPasswordModal}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded inline-flex items-center justify-center mb-2">
                                Change password <FontAwesomeIcon icon={faEdit}/>
                            </button>
                            <Modal
                                isOpen={passwordModalIsOpen}
                                onRequestClose={closePasswordModal}
                                contentLabel="Add AppointmentMedic"
                                className="w-80 h-80 p-4 m-4 md:w-1/2 md:h-1/2 lg:w-1/3 lg:h-2/3 mx-auto mt-36 bg-blue-300 rounded-2xl border-2 border-blue-600 text-center content-center animate__animated animate__zoomIn"
                            >
                                <form onSubmit={handlePasswordChange} className="flex flex-col">
                                    <label className="mb-2">
                                        Password:
                                        <input
                                            type="password"
                                            value={parolaPacient}
                                            onChange={e => setParolaPacient(e.target.value)}
                                            className="w-full px-2 py-1 mb-2 border border-gray-400"
                                        />
                                        <input type="submit" value="Submit"
                                               className="mt-7 border-2 border-blue-600 rounded-3xl w-1/2 mx-auto"/>
                                    </label>
                                </form>
                            </Modal>
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
                        <div className="flex justify-center items-end text-lg w-full space-x-4 self-end">
                            <button onClick={updatePacientProfile}
                                    className="mt-4 mb-4 p-3 bg-blue-700 hover:bg-blue-900 text-white cursor-pointer rounded">
                                Update Profile
                            </button>
                            <button onClick={handleTokenExpiry}
                                    className="mt-4 mb-4 p-3 bg-blue-700 hover:bg-blue-900 text-white cursor-pointer rounded">
                                Logout
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
                            Email:
                            <input
                                type="email"
                                value={emailPacient}
                                onChange={e => setEmailPacient(e.target.value)}
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