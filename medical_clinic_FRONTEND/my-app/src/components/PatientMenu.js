import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PatientMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="border-white border rounded-lg text-right md:flex md:items-center md:justify-end">
            <button onClick={toggleMenu} className="text-white text-lg md:hidden block px-4 py-3 focus:outline-none">
                Menu
            </button>
            <div className={`md:flex ${isOpen ? 'block' : 'hidden'}`}>
                <Link to="pacient/dashboard" className="text-white text-lg hover:underline block px-4 py-3 md:inline-block">Dashboard</Link>
                <Link to="/appointments" className="text-white text-lg hover:underline block px-4 py-3 md:inline-block">Appointments</Link>
                {/* Add more menu items as needed */}
                <Link to="pacient/profile" className="text-white text-lg hover:underline block px-4 py-3 md:inline-block">Profile</Link>
                {/* Add more menu items as needed */}
            </div>
        </div>
    );
};

export default PatientMenu;
