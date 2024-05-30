import React, {useEffect} from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MedicRegister from './pages/MedicRegister';
import PatientRegister from './pages/PatientRegister';
import MedicDashboard from './pages/MedicDashboard';
import PatientDashboard from './pages/PatientDashboard';
import MedicAppointments from './pages/MedicAppointments';
import PatientAppointments from './pages/PatientAppointments';
import Prices from './pages/Prices';
import Diagnostics from './pages/Diagnostics';
import Questionnaire from './pages/Questionnaire';
import MedicProfile from './pages/MedicProfile';
import PatientProfile from './pages/PatientProfile';
import Patient from './pages/Patient';
import Medic from './pages/Medic';
import {UserProvider} from './user/UserContext';
import {refreshToken} from './user/api.js';


function App() {

    useEffect(() => {
        const checkTokenExpiry = async () => {
            const tokenExpiry = localStorage.getItem('jwtTokenExpiry');
            if (tokenExpiry && Date.now() >= tokenExpiry - 30 * 1000) {
                await refreshToken();
            }
        };

        const intervalId = setInterval(checkTokenExpiry, 10000);
        return () => clearInterval(intervalId);
    }, []);

    return (<Router>
        <UserProvider>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/medic/register" element={<MedicRegister/>}/>
                <Route path="/pacient/register" element={<PatientRegister/>}/>
                <Route path="/medic/dashboard" element={<MedicDashboard/>}/>
                <Route path="/pacient/dashboard" element={<PatientDashboard/>}/>
                <Route path="/medic/appointments" element={<MedicAppointments/>}/>
                <Route path="/pacient/appointments" element={<PatientAppointments/>}/>
                <Route path="/pacient/prices" element={<Prices/>}/>
                <Route path="pacient/diagnostics" element={<Diagnostics/>}/>
                <Route path="/pacient/chestionar" element={<Questionnaire/>}/>
                <Route path="/medic/profile" element={<MedicProfile/>}/>
                <Route path="/pacient/profile" element={<PatientProfile/>}/>
                <Route path="/medic/:idMedic" element={<Medic/>}/>
                <Route path="/pacient/:idPacient" element={<Patient/>}/>
                <Route path="*" element={<Navigate to="/login"/>}/>
            </Routes>
        </UserProvider>
    </Router>);
}

export default App;
