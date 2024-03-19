import React, {useState} from 'react';
import {useUser} from "../user/UserContext";
import axios from "axios";
import PatientMenu from "../components/PatientMenu";

function PatientProfile() {
    const {user} = useUser();
    const idPacient = user ? user.idPacient : null;
    const [emailPacient, setEmailPacient] = useState(user ? user.emailPacient : '');
    const [parolaPacient, setParolaPacient] = useState(user ? user.parolaPacient : '');
    const [numePacient, setNumePacient] = useState(user ? user.numePacient : '');
    const [prenumePacient, setPrenumePacient] = useState(user ? user.prenumePacient : '');
    const [telefonPacient, setTelefonPacient] = useState(user ? user.telefonPacient : '');
    const [greutatePacient, setGreutatePacient] = useState(user ? user.greutatePacient : '');
    const [inaltimePacient, setInaltimePacient] = useState(user ? user.inaltimePacient : '');
    const [varstaPacient, setVarstaPacient] = useState(user ? user.varstaPacient : '');
    const [asigurat, setAsigurat] = useState(user ? user.asigurat : '');
    const [abonamentPacient, setAbonamentPacient] = useState(user ? user.abonamentPacient : '');

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

    return (<div className="pt-5 sm:px-6 lg:px-8">
        <PatientMenu/>
        <div className="max-w-md mx-auto bg-white p-5 rounded shadow-md">
            <h2 className="text-center text-2xl font-bold text-gray-800">My Profile</h2>
            <label className="block mb-2">
                Nume:
                <input
                    type="text"
                    value={numePacient}
                    onChange={e => setNumePacient(e.target.value)}
                    className="w-full px-2 py-1 mb-4 border border-gray-300"
                />
            </label>
            <label className="block mb-2">
                Prenume:
                <input
                    type="text"
                    value={prenumePacient}
                    onChange={e => setPrenumePacient(e.target.value)}
                    className="w-full px-2 py-1 mb-4 border border-gray-300"
                />
            </label>
            <label className="block mb-2">
                Greutate:
                <input
                    type="number"
                    value={greutatePacient}
                    onChange={e => setGreutatePacient(e.target.value)}
                    className="w-full px-2 py-1 mb-4 border border-gray-300"
                />
            </label>
            <label className="block mb-2">
                Inaltime:
                <input
                    type="number"
                    value={inaltimePacient}
                    onChange={e => setInaltimePacient(e.target.value)}
                    className="w-full px-2 py-1 mb-4 border border-gray-300"
                />
            </label>
            <label className="block mb-2">
                Varsta:
                <input
                    type="number"
                    value={varstaPacient}
                    onChange={e => setVarstaPacient(e.target.value)}
                    className="w-full px-2 py-1 mb-4 border border-gray-300"
                />
            </label>
            <label className="block mb-2">
                Asigurat:
                <select value={asigurat} onChange={e => setAsigurat(e.target.value)}>
                    <option value="Y">Da</option>
                    <option value="N">Nu</option>
                </select>
            </label>
            <label className="block mb-2">
                Abonament:
                <select value={abonamentPacient} onChange={e => setAbonamentPacient(e.target.value)}>
                    <option value="Y">Da</option>
                    <option value="N">Nu</option>
                </select>
            </label>
            <label className="block mb-2">
                Telefon:
                <input
                    type="phone"
                    value={telefonPacient}
                    onChange={e => setTelefonPacient(e.target.value)}
                    className="w-full px-2 py-1 mb-4 border border-gray-300"
                />
            </label>
            <label className="block mb-2">
                Email:
                <input
                    type="email"
                    value={emailPacient}
                    onChange={e => setEmailPacient(e.target.value)}
                    className="w-full px-2 py-1 mb-4 border border-gray-300"
                />
            </label>
            <label className="block mb-2">
                Parola:
                <input
                    type="password"
                    value={parolaPacient}
                    onChange={e => setParolaPacient(e.target.value)}
                    className="w-full px-2 py-1 mb-4 border border-gray-300"
                />
            </label>
            <button onClick={updatePacientProfile}
                    className="w-full px-4 py-2 bg-gray-800 text-white border-none cursor-pointer">Update Profile
            </button>
        </div>
    </div>);
}

export default PatientProfile;
