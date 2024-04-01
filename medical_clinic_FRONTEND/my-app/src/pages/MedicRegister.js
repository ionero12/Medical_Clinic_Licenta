import React, {useState} from 'react';
import SpecializationDropdown from "../components/SpecializationDropdown";
import {useNavigate} from 'react-router-dom';
import '../styles/RegisterPage.css';


function MedicRegister() {
    const [emailMedic, setEmailMedic] = useState('');
    const [parolaMedic, setParolaMedic] = useState('');
    const [numeMedic, setNumeMedic] = useState('');
    const [prenumeMedic, setPrenumeMedic] = useState('');
    const [cnpMedic, setCnpMedic] = useState('');
    const [telefonMedic, setTelefonMedic] = useState('');
    const [dataNastereMedic, setDataNastereMedic] = useState('');
    const [selectedSpecializationId, setSelectedSpecializationId] = useState('');
    const navigate = useNavigate();

    const handleRegistration = async () => {
        try {
            const newUser = {
                numeMedic,
                prenumeMedic,
                cnpMedic,
                dataNastereMedic,
                specializare: {
                    idSpecializare: selectedSpecializationId
                },
                telefonMedic,
                emailMedic,
                parolaMedic
            };

            const response = await fetch('http://localhost:8081/api/medic', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify(newUser)
            });

            if (response.ok) {
                console.log('Medic registered successfully');
                navigate('/medic/dashboard');
            } else {
                console.log('Registration failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (<div className="pt-5">
        <div className="max-w-md mx-auto bg-white p-5 rounded shadow-md">
            <h2 className="text-center text-2xl font-bold text-gray-800">Register</h2>
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
                CNP:
                <input
                    type="text"
                    value={cnpMedic}
                    onChange={e => setCnpMedic(e.target.value)}
                    className="w-full px-2 py-1 mb-4 border border-gray-300"
                />
            </label>
            <label className="block mb-2">
                Data nasterii:
                <input
                    type="date"
                    value={dataNastereMedic}
                    onChange={e => setDataNastereMedic(e.target.value)}
                    className="w-full px-2 py-1 mb-4 border border-gray-300"
                />
            </label>
            <label className="block mb-2">
                Specializare:
                <SpecializationDropdown onSelectSpecialization={setSelectedSpecializationId}/>
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
            <button onClick={handleRegistration}
                    className="w-full px-4 py-2 bg-gray-800 text-white border-none cursor-pointer">Register
            </button>
        </div>
    </div>);
}

export default MedicRegister;