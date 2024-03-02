import React, {useState} from 'react';
import SpecializationDropdown from "../components/SpecializationDropdown";
function RegisterPage() {
    const [emailMedic, setEmailMedic] = useState('');
    const [parolaMedic, setParolaMedic] = useState('');
    const [numeMedic, setNumeMedic] = useState('');
    const [prenumeMedic, setPrenumeMedic] = useState('');
    const [cnpMedic, setCnpMedic] = useState('');
    const [telefonMedic, setTelefonMedic] = useState('');
    const [dataNastereMedic, setDataNastereMedic] = useState('');
    const [selectedSpecializationId, setSelectedSpecializationId] = useState('');

    const handleRegistration = async () => {
        try {
            const newUser = {
                numeMedic, prenumeMedic, cnpMedic, dataNastereMedic, specializare: {
                    idSpecializare: selectedSpecializationId
                }, telefonMedic, emailMedic, parolaMedic
            };

            const response = await fetch('http://localhost:8081/api/medic', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify(newUser)
            });

            if (response.ok) {
                console.log('Medic registered successfully');
            } else {
                console.log('Registration failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };


    return (<div className="registerPage">
        <h2>Register</h2>

        <label>
            Nume:
            <input
                type="text"
                value={numeMedic}
                onChange={e => setNumeMedic(e.target.value)}
            />
        </label>

        <label>
            Prenume:
            <input
                type="text"
                value={prenumeMedic}
                onChange={e => setPrenumeMedic(e.target.value)}
            />
        </label>

        <label>
            Cnp:
            <input
                type="text"
                value={cnpMedic}
                onChange={e => setCnpMedic(e.target.value)}
            />
        </label>

        <label>
            Data nasterii:
            <input
                type="date"
                value={dataNastereMedic}
                onChange={e => setDataNastereMedic(e.target.value)}
            />
        </label>

        <label>
            Specializare:
            <SpecializationDropdown onSelectSpecialization={setSelectedSpecializationId}/>
        </label>

        <label>
            Telefon:
            <input
                type="phone"
                value={telefonMedic}
                onChange={e => setTelefonMedic(e.target.value)}
            />
        </label>

        <label>
            Email:
            <input
                type="email"
                value={emailMedic}
                onChange={e => setEmailMedic(e.target.value)}
            />
        </label>

        <label>
            Parola:
            <input
                type="password"
                value={parolaMedic}
                onChange={e => setParolaMedic(e.target.value)}
            />
        </label>

        <button onClick={handleRegistration}>Register</button>
    </div>);
}

export default RegisterPage;
