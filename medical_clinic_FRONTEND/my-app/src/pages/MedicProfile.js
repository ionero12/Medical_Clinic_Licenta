import React, {useState} from 'react';
import {useUser} from "../user/UserContext";
import axios from "axios";
import MedicMenu from "../components/MedicMenu";

function MedicProfile() {
    const {user} = useUser();
    const idMedic = user ? user.idMedic : null;  // get medicId from the user
    const [emailMedic, setEmailMedic] = useState(user ? user.emailMedic : '');
    const [parolaMedic, setParolaMedic] = useState(user ? user.parolaMedic : '');
    const [numeMedic, setNumeMedic] = useState(user ? user.numeMedic : '');
    const [prenumeMedic, setPrenumeMedic] = useState(user ? user.prenumeMedic : '');
    const [telefonMedic, setTelefonMedic] = useState(user ? user.telefonMedic : '');

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

    return (<div className="pt-5 sm:px-6 lg:px-8">
        <MedicMenu/>
        <div className="max-w-md mx-auto bg-white p-5 rounded shadow-md">
            <h2 className="text-center text-2xl font-bold text-gray-800">My Profile</h2>
            <label className="block mb-2">
                Nume:
                <input
                    type="text"
                    value={numeMedic}
                    onChange={e => setNumeMedic(e.target.value)}
                    className="w-full px-2 py-1 mb-4 border border-gray-300"
                />
            </label>
            <label className="block mb-2">
                Prenume:
                <input
                    type="text"
                    value={prenumeMedic}
                    onChange={e => setPrenumeMedic(e.target.value)}
                    className="w-full px-2 py-1 mb-4 border border-gray-300"
                />
            </label>
            <label className="block mb-2">
                Telefon:
                <input
                    type="phone"
                    value={telefonMedic}
                    onChange={e => setTelefonMedic(e.target.value)}
                    className="w-full px-2 py-1 mb-4 border border-gray-300"
                />
            </label>
            <label className="block mb-2">
                Email:
                <input
                    type="email"
                    value={emailMedic}
                    onChange={e => setEmailMedic(e.target.value)}
                    className="w-full px-2 py-1 mb-4 border border-gray-300"
                />
            </label>
            <label className="block mb-2">
                Parola:
                <input
                    type="password"
                    value={parolaMedic}
                    onChange={e => setParolaMedic(e.target.value)}
                    className="w-full px-2 py-1 mb-4 border border-gray-300"
                />
            </label>
            <button onClick={updateMedicProfile}
                    className="w-full px-4 py-2 bg-gray-800 text-white border-none cursor-pointer">Update Profile
            </button>
        </div>
    </div>);
}

export default MedicProfile;
