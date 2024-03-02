import React, {useState} from 'react';
import '../styles/LoginPage.css';
import loginImage from '../../../../medical_clinic_FRONTEND/my-app/src/assets/images/login_bkg.jpg';

function LoginPage() {
    const [emailMedic, setEmailMedic] = useState('');
    const [parolaMedic, setParolaMedic] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/medic/login?emailMedic=${emailMedic}&parolaMedic=${parolaMedic}`, {
                method: 'POST', headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (response.ok) {
                const data = await response.text();
                console.log('Logged in:', data);
            } else {
                console.log('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (<div className="loginPage">
        <div className="box-form">
            <div className="left">
                <div className="overlay">
                    <img src={loginImage} alt="Login" className="login-image"/>
                </div>
            </div>
            <div className="right">
                <h1>Login</h1>
                <p className="register">
                    Nu aveti un cont? <a href="/register" className="register-link">Inregistrati-va aici</a>
                </p>
                <div className="inputs">
                    <input type="text" placeholder="Email" value={emailMedic}
                           onChange={e => setEmailMedic(e.target.value)}/>
                    <input type="password" placeholder="Parola" value={parolaMedic}
                           onChange={e => setParolaMedic(e.target.value)}/>
                </div>
                <div className="remember-me">
                    <label>
                        <input type="checkbox" name="item" defaultChecked className="remember-checkbox"/>
                        <span className="text-checkbox"> Remember me</span>
                    </label>
                </div>
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    </div>);
}

export default LoginPage;
