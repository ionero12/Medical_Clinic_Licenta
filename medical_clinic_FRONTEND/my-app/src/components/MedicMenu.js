import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const MedicMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (<div className="border-white border rounded-lg text-right md:flex md:items-center md:justify-end">
            <button onClick={toggleMenu} className="text-white text-xl md:hidden block px-4 py-3 focus:outline-none">
                Menu
            </button>
            <div className={`md:flex ${isOpen ? 'block' : 'hidden'}`}>
                <Link to="/medic/dashboard"
                      className="text-white hover:text-gray-400 text-xl hover:underline block px-4 py-3 md:inline-block">
                    Dashboard
                </Link>
                <Link to="/medic/appointments"
                      className="text-white hover:text-gray-400 text-xl hover:underline block px-4 py-3 md:inline-block">
                    Appointments
                </Link>
                {/* Add more menu items as needed */}
                <Link to="/medic/profile"
                      className="text-white hover:text-gray-400 text-xl hover:underline block px-4 py-3 md:inline-block">
                    Profile
                </Link>
                {/* Add more menu items as needed */}
            </div>
        </div>);
};

export default MedicMenu;
