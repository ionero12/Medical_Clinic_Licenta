// App.js
import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MedicRegister from './pages/MedicRegister';
import PatientRegister from './pages/PatientRegister';
import MedicDashboard from './pages/MedicDashboard';
import PatientDashboard from './pages/PatientDashboard';
import MedicProfile from './pages/MedicProfile';
import PatientProfile from './pages/PatientProfile';
import Patient from './pages/Patient';
import {UserProvider} from './user/UserContext'; // import UserProvider

function App() {
    return (<Router>
        <UserProvider>  {/* Wrap your routes with UserProvider */}
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/medic/register" element={<MedicRegister/>}/>
                <Route path="/pacient/register" element={<PatientRegister/>}/>
                <Route path="/medic/dashboard" element={<MedicDashboard/>}/>
                <Route path="/pacient/dashboard" element={<PatientDashboard/>}/>
                <Route path="/medic/profile" element={<MedicProfile/>}/>
                <Route path="/pacient/profile" element={<PatientProfile/>}/>
                <Route path="/patient/:id" element={<Patient/>}/>
                <Route path="*" element={<Navigate to="/login"/>}/>
            </Routes>
        </UserProvider>
    </Router>);
}

export default App;
