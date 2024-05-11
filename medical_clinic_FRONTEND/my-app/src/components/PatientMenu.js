import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const PatientMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (<div className="border-white border rounded-lg text-right md:flex md:items-center md:justify-end">
        <button onClick={toggleMenu} className="text-white text-xl md:hidden block px-4 py-3 focus:outline-none">
            Menu
        </button>
        <div className={`md:flex ${isOpen ? 'block' : 'hidden'}`}>
            <Link to="/pacient/dashboard"
                  className="text-white hover:text-gray-400 text-xl hover:underline block px-4 py-3 md:inline-block">
                Dashboard
            </Link>
            <Link to="/pacient/appointments"
                  className="text-white hover:text-gray-400 text-xl hover:underline block px-4 py-3 md:inline-block">
                Appointments
            </Link>
            <Link to="/pacient/diagnostics"
                  className="text-white hover:text-gray-400 text-xl hover:underline block px-4 py-3 md:inline-block">
                Diagnostics
            </Link>
            <Link to="/pacient/chestionar"
                  className="text-white hover:text-gray-400 text-xl hover:underline block px-4 py-3 md:inline-block">
                Questionnaire
            </Link>
            <Link to="/pacient/prices"
                  className="text-white hover:text-gray-400 text-xl hover:underline block px-4 py-3 md:inline-block">
                Prices
            </Link>
            <Link to="/pacient/profile"
                  className="text-white hover:text-gray-400 text-xl hover:underline block px-4 py-3 md:inline-block">
                Profile
            </Link>
        </div>
    </div>);
};

export default PatientMenu;
