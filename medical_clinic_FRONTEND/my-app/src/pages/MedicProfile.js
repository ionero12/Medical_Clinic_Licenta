import React, {useEffect, useState} from 'react';
import {useUser} from "../user/UserContext";
import profilePic from '../assets/images/profilePic.png';
import MedicMenu from "../components/MedicMenu";
import {api, handleTokenExpiry} from '../user/api.js'
import {toast, ToastContainer} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";


function MedicProfile() {
    const {user} = useUser();
    const idMedic = user ? user.userData.idMedic : null;

    const [emailMedic, setEmailMedic] = useState('');
    const [parolaMedic, setParolaMedic] = useState('');
    const [numeMedic, setNumeMedic] = useState('');
    const [prenumeMedic, setPrenumeMedic] = useState('');
    const [telefonMedic, setTelefonMedic] = useState('');

    const [passwordModalIsOpen, setPasswordModalIsOpen] = useState(false);


    useEffect(() => {
        const fetchMedic = async () => {
            if (idMedic) {
                try {
                    const response = await api.get(`/medic/${idMedic}`);
                    const data = response.data;
                    setEmailMedic(data.emailMedic || '');
                    //setParolaMedic(data.parolaMedic || '');
                    setNumeMedic(data.numeMedic || '');
                    setPrenumeMedic(data.prenumeMedic || '');
                    setTelefonMedic(data.telefonMedic || '');
                } catch (error) {
                    console.error('Error fetching medic:', error);
                }
            }
        };

        fetchMedic();
    }, [idMedic]);

    const updateMedicProfile = async () => {
        try {
            await api.put(`/medic/${idMedic}`, null, {
                params: {
                    emailMedic,
                    numeMedic, prenumeMedic, telefonMedic
                }
            });
            toast.success('Medic profile updated successfully');
        } catch (error) {
            if (error.response && error.response.data) {
                const errorData = error.response.data;
                for (const [message] of Object.entries(errorData)) {
                    toast.error(`Error: ${message}`);
                }
            } else {
                toast.error('Error updating medic profile');
            }
            console.error('Error updating medic profile:', error);
        }
    };

    const handlePasswordChange = async (event) => {
        event.preventDefault();

        try {
            await api.put(`/medic/${idMedic}`, null, {
                params: {
                    parolaMedic
                }
            });
            toast.success('Medic profile updated successfully');
        } catch (error) {
            if (error.response && error.response.data) {
                const errorData = error.response.data;
                for (const [message] of Object.entries(errorData)) {
                    toast.error(`Error: ${message}`);
                }
            } else {
                toast.error('Error updating medic profile');
            }
            console.error('Error updating medic profile:', error);
        }
    };

    function openPasswordModal() {
        setPasswordModalIsOpen(true);
    }

    function closePasswordModal() {
        setParolaMedic('')
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
            <MedicMenu medicId={idMedic}/>
            <div className="pt-5 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-screen">
                <div className="max-w-md bg-white p-5 rounded shadow-md mb-4">
                    <h2 className="text-2xl p-2 text-center">{numeMedic} {prenumeMedic}</h2>
                    <div className="flex items-center justify-center mb-4">
                        <div className="w-32 h-32 rounded-full border border-gray-400 flex items-center justify-center">
                            <img src={profilePic} alt="Profile" className="w-28 h-28 rounded-full"/>
                        </div>
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
                                        value={parolaMedic}
                                        onChange={e => setParolaMedic(e.target.value)}
                                        className="w-full px-2 py-1 mb-2 border border-gray-400"
                                    />
                                    <input type="submit" value="Submit"
                                           className="mt-7 border-2 border-blue-600 rounded-3xl w-1/2 mx-auto"/>
                                </label>
                            </form>
                        </Modal>
                    </div>
                    <label className="block mb-2">
                        Email:
                        <input
                            type="email"
                            value={emailMedic}
                            onChange={e => setEmailMedic(e.target.value)}
                            className="w-full px-2 py-1 mb-2 border border-gray-400"
                        />
                    </label>
                    <label className="block mb-2">
                        Second name:
                        <input
                            type="text"
                            value={numeMedic}
                            onChange={e => setNumeMedic(e.target.value)}
                            className="w-full px-2 py-1 mb-2 border border-gray-400"
                        />
                    </label>
                    <label className="block mb-2">
                        First name:
                        <input
                            type="text"
                            value={prenumeMedic}
                            onChange={e => setPrenumeMedic(e.target.value)}
                            className="w-full px-2 py-1 mb-2 border border-gray-400"
                        />
                    </label>
                    <label className="block mb-2">
                        Phone number:
                        <input
                            type="phone"
                            value={telefonMedic}
                            onChange={e => setTelefonMedic(e.target.value)}
                            className="w-full px-2 py-1 mb-2 border border-gray-400"
                        />
                    </label>
                    <div className="flex justify-center space-x-4">
                        <button onClick={updateMedicProfile}
                                className="mt-4 mb-4 p-3 bg-blue-700 hover:bg-blue-900 text-white cursor-pointer rounded">
                            Update Profile
                        </button>
                        <button onClick={handleTokenExpiry}
                                className="mt-4 mb-4 p-3 bg-blue-700 hover:bg-blue-900 text-white cursor-pointer rounded">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>)
        ;
}

export default MedicProfile;
