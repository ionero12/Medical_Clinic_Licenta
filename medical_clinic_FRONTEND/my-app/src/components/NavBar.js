import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MedicMenu from './MedicMenu';
import PatientMenu from './PatientMenu';

const Navbar = ({ userType, medicId }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const renderMenu = () => {
        if (userType === 'medic') {
            return <MedicMenu medicId={medicId} />;
        } else if (userType === 'patient') {
            return <PatientMenu />;
        } else {
            return null; // Handle other cases or no user type
        }
    };

    return (
        <div >
            <div >
                {renderMenu()}
            </div>
        </div>
    );
};

export default Navbar;
