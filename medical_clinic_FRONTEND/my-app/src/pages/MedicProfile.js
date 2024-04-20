import React, {useState} from 'react';
import {useUser} from "../user/UserContext";
import axios from "axios";
import profilePic from '../assets/images/profilePic.png';
import MedicMenu from "../components/MedicMenu";

function MedicProfile() {
    const {user} = useUser();
    const idMedic = user ? user.userData.idMedic : null;  // get medicId from the user
    const [emailMedic, setEmailMedic] = useState(user ? user.userData.emailMedic : '');
    const [parolaMedic, setParolaMedic] = useState(user ? user.userData.parolaMedic : '');
    const [numeMedic, setNumeMedic] = useState(user ? user.userData.numeMedic : '');
    const [prenumeMedic, setPrenumeMedic] = useState(user ? user.userData.prenumeMedic : '');
    const [telefonMedic, setTelefonMedic] = useState(user ? user.userData.telefonMedic : '');

    console.log(user);  // print user to the console

    const updateMedicProfile = async () => {
        try {
            const response = await axios.put(`http://localhost:8081/api/medic/${idMedic}`, null, {
                params: {
                    emailMedic, parolaMedic, numeMedic, prenumeMedic, telefonMedic
                }
            });

            console.log('Medic profile updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating medic profile:', error);
        }
    };

    return (
        <div>
            <MedicMenu/>
            <div className="pt-5 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-screen">
                <div className="max-w-md bg-white p-5 rounded shadow-md mb-4">
                    <h2 className="text-2xl p-2 text-center">{numeMedic} {prenumeMedic}</h2>
                    <div className="flex items-center justify-center mb-4">
                        <div className="w-32 h-32 rounded-full border border-cyan-300 flex items-center justify-center">
                            <img src={profilePic} alt="Profile" className="w-28 h-28 rounded-full"/>
                        </div>
                    </div>

                    <label className="block mb-2">
                        Email:
                        <input
                            type="email"
                            value={emailMedic}
                            onChange={e => setEmailMedic(e.target.value)}
                            className="w-full px-2 py-1 mb-2 border border-cyan-300"
                        />
                    </label>
                    <label className="block mb-2">
                        Parola:
                        <input
                            type="password"
                            value={parolaMedic}
                            onChange={e => setParolaMedic(e.target.value)}
                            className="w-full px-2 py-1 mb-2 border border-cyan-300"
                        />
                    </label>
                    <label className="block mb-2">
                        Nume:
                        <input
                            type="text"
                            value={numeMedic}
                            onChange={e => setNumeMedic(e.target.value)}
                            className="w-full px-2 py-1 mb-2 border border-cyan-300"
                        />
                    </label>
                    <label className="block mb-2">
                        Prenume:
                        <input
                            type="text"
                            value={prenumeMedic}
                            onChange={e => setPrenumeMedic(e.target.value)}
                            className="w-full px-2 py-1 mb-2 border border-cyan-300"
                        />
                    </label>
                    <label className="block mb-2">
                        Telefon:
                        <input
                            type="phone"
                            value={telefonMedic}
                            onChange={e => setTelefonMedic(e.target.value)}
                            className="w-full px-2 py-1 mb-2 border border-cyan-300"
                        />
                    </label>
                    <div className="flex justify-center">
                        <button onClick={updateMedicProfile}
                                className="mt-4 px-4 py-2 bg-gray-800 text-white border-none cursor-pointer">Update Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MedicProfile;
