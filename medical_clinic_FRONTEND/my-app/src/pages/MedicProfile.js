import React, {useEffect, useState} from 'react';
import {useUser} from "../user/UserContext";
import profilePic from '../assets/images/profilePic.png';
import MedicMenu from "../components/MedicMenu";
import api from '../user/api.js'
import {toast, ToastContainer} from "react-toastify";


function MedicProfile() {
    const {user} = useUser();
    const idMedic = user ? user.userData.idMedic : null;

    const [emailMedic, setEmailMedic] = useState('');
    const [parolaMedic, setParolaMedic] = useState('');
    const [numeMedic, setNumeMedic] = useState('');
    const [prenumeMedic, setPrenumeMedic] = useState('');
    const [telefonMedic, setTelefonMedic] = useState('');

    useEffect(() => {
        const fetchMedic = async () => {
            if (idMedic) {
                try {
                    const response = await api.get(`/medic/${idMedic}`);
                    const data = response.data;
                    setEmailMedic(data.emailMedic || '');
                    setParolaMedic(data.parolaMedic || '');
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
            const response = await api.put(`/medic/${idMedic}`, null, {
                params: {
                    emailMedic, parolaMedic, numeMedic, prenumeMedic, telefonMedic
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
            <MedicMenu medicId={idMedic}/>
            <div className="pt-5 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-screen">
                <div className="max-w-md bg-white p-5 rounded shadow-md mb-4">
                    <h2 className="text-2xl p-2 text-center">{numeMedic} {prenumeMedic}</h2>
                    <div className="flex items-center justify-center mb-4">
                        <div className="w-32 h-32 rounded-full border border-gray-400 flex items-center justify-center">
                            <img src={profilePic} alt="Profile" className="w-28 h-28 rounded-full"/>
                        </div>
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
                        Password:
                        <input
                            type="password"
                            value={parolaMedic}
                            onChange={e => setParolaMedic(e.target.value)}
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
                    <div className="flex justify-center">
                        <button onClick={updateMedicProfile}
                                className="mt-4 px-4 py-2 bg-blue-700 text-white border-none cursor-pointer">Update
                            Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default MedicProfile;
