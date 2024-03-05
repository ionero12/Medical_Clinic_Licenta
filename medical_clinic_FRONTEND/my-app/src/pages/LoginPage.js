import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import loginImage from '../assets/images/login_bkg.jpg';

function LoginPage() {
    const [emailMedic, setEmailMedic] = useState('');
    const [parolaMedic, setParolaMedic] = useState('');
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/medic/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    emailMedic: emailMedic,
                    parolaMedic: parolaMedic
                })
            });
            if (response.ok) {
                const data = await response.text();
                console.log('Logged in:', data);
                navigate('/dashboard');
            } else {
                console.log('Login failed');}
        } catch (error) {
            console.error('Error during login:', error);} };

    return (
        <div className="flex justify-center items-center min-h-screen min-w-screen">
            <div className="w-5/6 bg-white rounded overflow-hidden flex flex-row items-stretch shadow-lg">
                <div className="w-4/6 flex flex-col items-center">
                    <div className="overlay">
                        <img src={loginImage} alt="Login" className="w-full h-full object-cover"/>
                    </div>
                </div>
                <div className="w-2/6 p-2 border border-black flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold mb-20">Login</h1>
                    <p className="text-sm">
                        Nu aveti un cont? <a href="/register" className="text-green-500">Inregistrati-va aici</a>
                    </p>
                    <div className="w-full flex flex-col items-center justify-center p-5">
                        <input type="text" placeholder="Email" value={emailMedic}
                               onChange={e => setEmailMedic(e.target.value)} className="border border-gray-600 rounded p-2 mb-4 text-sm"/>
                        <input type="password" placeholder="Parola" value={parolaMedic}
                               onChange={e => setParolaMedic(e.target.value)} className="border border-gray-600 rounded p-2 mb-4 text-sm"/>
                    </div>
                    <div className="flex items-center">
                        <label>
                            <input type="checkbox" name="item" defaultChecked className="text-orange-500"/>
                            <span className="ml-2"> Remember me</span>
                        </label>
                    </div>
                    <button onClick={handleLogin} className="bg-blue-900 text-white rounded p-2 mt-4 text-sm cursor-pointer transition-colors duration-300 w-4/5 hover:bg-blue-600">Login</button>
                </div>
            </div>
        </div>
    );
}
export default LoginPage;
