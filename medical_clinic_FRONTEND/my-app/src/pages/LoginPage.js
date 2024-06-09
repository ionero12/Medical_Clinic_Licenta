import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import loginImage from '../assets/images/login_bkg.jpg';
import '../styles/LoginPage.css';
import {useUser} from '../user/UserContext';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {startTokenRefresh} from "../user/api";


function LoginPage() {
    const [emailMedic, setEmailMedic] = useState('');
    const [emailPacient, setEmailPacient] = useState('');
    const [parolaMedic, setParolaMedic] = useState('');
    const [parolaPacient, setParolaPacient] = useState('');
    const [userType, setUserType] = useState('medic');
    const navigate = useNavigate();
    const {setUser} = useUser();

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser && storedUser !== 'undefined') {
            const user = JSON.parse(storedUser);
            setUser(user);
        } else {
            setUser({userType: '', userData: null});
        }
    }, [setUser]);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const emailField = userType === 'medic' ? 'emailMedic' : 'emailPacient';
            const parolaField = userType === 'medic' ? 'parolaMedic' : 'parolaPacient';

            const response = await fetch(`http://localhost:8081/api/login/${userType}`, {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify({
                    [emailField]: userType === 'medic' ? emailMedic : emailPacient,
                    [parolaField]: userType === 'medic' ? parolaMedic : parolaPacient,
                }), credentials: 'include',  // Include credentials in the request
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Logged in:', data);

                const newUser = {userType: userType, userData: data.medic || data.pacient};
                sessionStorage.setItem('user', JSON.stringify(newUser));
                setUser(newUser);

                sessionStorage.setItem('loggedIn', 'true');
                startTokenRefresh();

                navigate(`/${userType}/dashboard`);
            } else {
                if (response.status === 401) {
                    toast.error('Email sau parola incorecte');
                }
            }
        } catch (error) {
            console.error('Error during login:', error);
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
        <div className="flex justify-center items-center min-h-screen min-w-screen">
            <div
                className="w-full md:w-5/6 bg-white rounded overflow-hidden flex flex-col md:flex-row items-stretch shadow-lg">
                <div className="w-full md:w-4/6 flex flex-col items-center">
                    <div className="overlay">
                        <img src={loginImage} alt="Login" className="w-full h-full object-cover"/>
                    </div>
                </div>
                <div className="w-full md:w-2/6 p-2 border border-black flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold mb-20">Login</h1>
                    <p className="text-sm">
                        You don't have an account?{' '}
                        <a href={`/${userType}/register`} className="text-green-500">
                            Register here
                        </a>
                    </p>
                    <select value={userType} onChange={(e) => setUserType(e.target.value)}>
                        <option value="medic">Medic</option>
                        <option value="pacient">Patient</option>
                    </select>
                    <form onSubmit={handleLogin}>
                        <div className="w-full flex flex-col items-center justify-center p-5">
                            {userType === 'medic' && (<>
                                <input
                                    type="text"
                                    placeholder="Email"
                                    value={emailMedic}
                                    onChange={(e) => setEmailMedic(e.target.value)}
                                    className="border border-gray-600 rounded p-2 mb-4 text-sm"
                                    required={true}
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={parolaMedic}
                                    onChange={(e) => setParolaMedic(e.target.value)}
                                    className="border border-gray-600 rounded p-2 mb-4 text-sm"
                                    minLength={4}
                                    required={true}
                                />
                            </>)}

                            {userType === 'pacient' && (<>
                                <input
                                    type="text"
                                    placeholder="Email"
                                    value={emailPacient}
                                    onChange={(e) => setEmailPacient(e.target.value)}
                                    className="border border-gray-600 rounded p-2 mb-4 text-sm"
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={parolaPacient}
                                    onChange={(e) => setParolaPacient(e.target.value)}
                                    className="border border-gray-600 rounded p-2 mb-4 text-sm"
                                />
                            </>)}
                        </div>
                        <div className="w-full p-4 mx-auto text-center">
                            <button onClick={handleLogin}
                                    className="bg-blue-900 text-white rounded p-2 cursor-pointer transition-colors duration-300 w-4/5 md:w-3/5 hover:bg-blue-600">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>);
}

export default LoginPage;
