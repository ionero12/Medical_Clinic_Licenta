import React, {useState} from 'react';
import SpecializationDropdown from "../components/SpecializationDropdown";
import {useNavigate} from 'react-router-dom';
import '../styles/RegisterPage.css';
import {toast, ToastContainer} from "react-toastify";

function MedicRegister() {
    const [emailMedic, setEmailMedic] = useState('');
    const [parolaMedic, setParolaMedic] = useState('');
    const [numeMedic, setNumeMedic] = useState('');
    const [prenumeMedic, setPrenumeMedic] = useState('');
    const [cnpMedic, setCnpMedic] = useState('');
    const [telefonMedic, setTelefonMedic] = useState('');
    const [dataNastereMedic, setDataNastereMedic] = useState('');
    const [experienta, setExperienta] = useState('');
    const [universitate, setUniversitate] = useState('');
    const [selectedSpecializationId, setSelectedSpecializationId] = useState('');
    const navigate = useNavigate();

    const handleRegistration = async () => {
        try {
            const newUser = {
                numeMedic, prenumeMedic, cnpMedic, dataNastereMedic, specializare: {
                    idSpecializare: selectedSpecializationId
                }, telefonMedic, emailMedic, parolaMedic, experienta, universitate
            };

            const response = await fetch('http://localhost:8081/api/medic', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });

            if (response.ok) {
                toast.success('Registration successful');
                navigate('/login');
            } else {
                const errorData = await response.json();
                if (response.status === 400 && errorData) {
                    for (const [field, message] of Object.entries(errorData)) {
                        toast.error(`Error: ${message}`);
                    }
                } else {
                    toast.error('Error during registration');
                }
            }
        } catch (error) {
            toast.error('An unexpected error occurred');
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
    <div className="pt-5">
        <div className="max-w-md mx-auto bg-white p-5 rounded shadow-md">
            <h2 className="text-center text-2xl font-bold text-gray-800">Register</h2>
            <label className="block mb-2">
                First Name:
                <input
                    type="text"
                    value={prenumeMedic}
                    onChange={e => setPrenumeMedic(e.target.value)}
                    className="w-full px-2 py-1 mb-4 border border-gray-300"
                />
            </label>
            <label className="block mb-2">
                Second Name:
                <input
                    type="text"
                    value={numeMedic}
                    onChange={e => setNumeMedic(e.target.value)}
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
                Date of Birth:
                <input
                    type="date"
                    value={dataNastereMedic}
                    onChange={e => setDataNastereMedic(e.target.value)}
                    className="w-full px-2 py-1 mb-4 border border-gray-300"
                />
            </label>
            <label className="block mb-2">
                Specialization:
                <SpecializationDropdown onSelectSpecialization={setSelectedSpecializationId}/>
            </label>
            <label className="block mb-2">
                Experience
                <input
                    type="number"
                    value={experienta}
                    onChange={e => setExperienta(e.target.value)}
                    className="w-full px-2 py-1 mb-4 border border-gray-300"
                />
            </label>
            <label className="block mb-2">
                University:
                <input
                    type="text"
                    value={universitate}
                    onChange={e => setUniversitate(e.target.value)}
                    className="w-full px-2 py-1 mb-4 border border-gray-300"
                />
            </label>
            <label className="block mb-2">
                Phone number:
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
                Password:
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
    </div>
    </div>);
}

export default MedicRegister;