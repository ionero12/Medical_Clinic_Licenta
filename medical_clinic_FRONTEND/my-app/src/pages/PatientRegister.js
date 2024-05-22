import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useUser} from '../user/UserContext';
import '../styles/RegisterPage.css';


function PatientRegister() {
    const [emailPacient, setEmailPacient] = useState('');
    const [parolaPacient, setParolaPacient] = useState('');
    const [numePacient, setNumePacient] = useState('');
    const [prenumePacient, setPrenumePacient] = useState('');
    const [cnpPacient, setCnpPacient] = useState('');
    const [telefonPacient, setTelefonPacient] = useState('');
    const [dataNasterePacient, setDataNasterePacient] = useState('');
    const [sexPacient, setSexPacient] = useState('Masculin');
    const [greutatePacient, setGreutatePacient] = useState('');
    const [inaltimePacient, setInaltimePacient] = useState('');
    const [varstaPacient, setVarstaPacient] = useState('');
    const [asigurat, setAsigurat] = useState('Y');
    const [abonamentPacient, setAbonamentPacient] = useState('Y');
    const navigate = useNavigate();
    const {setUser} = useUser();


    const handleRegistration = async () => {
        try {
            const newUser = {
                numePacient,
                prenumePacient,
                cnpPacient,
                dataNasterePacient,
                telefonPacient,
                emailPacient,
                parolaPacient,
                sexPacient,
                greutatePacient,
                inaltimePacient,
                varstaPacient,
                asigurat,
                abonamentPacient
            };

            const response = await fetch('http://localhost:8081/api/pacient', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify(newUser)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Logged in:', data);

                localStorage.setItem('jwtToken', data.jwtToken);
                localStorage.setItem('jwtTokenExpiry', Date.now() + 900 * 1000);
                localStorage.setItem('user', JSON.stringify({userType: 'pacient', userData: data.pacient}));
                setUser({userType: 'pacient', userData: data.pacient});

                navigate('/pacient/dashboard');
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
                First Name:
                <input
                    type="text"
                    value={prenumePacient}
                    onChange={e => setPrenumePacient(e.target.value)}
                    className="w-full px-2 py-1 mb-4 border border-gray-300"
                />
            </label>
            <label className="block mb-2">
                Second Name:
                <input
                    type="text"
                    value={numePacient}
                    onChange={e => setNumePacient(e.target.value)}
                    className="w-full px-2 py-1 mb-4 border border-gray-300"
                />
            </label>
            <label className="block mb-2">
                CNP:
                <input
                    type="text"
                    value={cnpPacient}
                    onChange={e => setCnpPacient(e.target.value)}
                    className="w-full px-2 py-1 mb-4 border border-gray-300"
                />
            </label>
            <label className="block mb-2">
                Date of Birth:
                <input
                    type="date"
                    value={dataNasterePacient}
                    onChange={e => setDataNasterePacient(e.target.value)}
                    className="w-full px-2 py-1 mb-4 border border-gray-300"
                />
            </label>
            <label className="block mb-2">
                Sex:
                <select value={sexPacient} onChange={e => setSexPacient(e.target.value)}>
                    <option value="masculin">Masculin</option>
                    <option value="feminin">Feminin</option>
                </select>
            </label>
            <label className="block mb-2">
                Weight:
                <input
                    type="number"
                    value={greutatePacient}
                    onChange={e => setGreutatePacient(e.target.value)}
                    className="w-full px-2 py-1 mb-4 border border-gray-300"
                />
            </label>
            <label className="block mb-2">
                Height:
                <input
                    type="number"
                    value={inaltimePacient}
                    onChange={e => setInaltimePacient(e.target.value)}
                    className="w-full px-2 py-1 mb-4 border border-gray-300"
                />
            </label>
            <label className="block mb-2">
                Age:
                <input
                    type="number"
                    value={varstaPacient}
                    onChange={e => setVarstaPacient(e.target.value)}
                    className="w-full px-2 py-1 mb-4 border border-gray-300"
                />
            </label>
            <label className="block mb-2">
                Assured:
                <select value={asigurat} onChange={e => setAsigurat(e.target.value)}>
                    <option value="Y">Yes</option>
                    <option value="N">No</option>
                </select>
            </label>
            <label className="block mb-2">
                Subscription:
                <select value={abonamentPacient} onChange={e => setAbonamentPacient(e.target.value)}>
                    <option value="Y">Yes</option>
                    <option value="N">No</option>
                </select>
            </label>
            <label className="block mb-2">
                Phone number:
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
                Password:
                <input
                    type="password"
                    value={parolaPacient}
                    onChange={e => setParolaPacient(e.target.value)}
                    className="w-full px-2 py-1 mb-4 border border-gray-300"
                />
            </label>
            <button onClick={handleRegistration}
                    className="w-full px-4 py-2 bg-gray-800 text-white border-none cursor-pointer">Register
            </button>
        </div>
    </div>);
}

export default PatientRegister;