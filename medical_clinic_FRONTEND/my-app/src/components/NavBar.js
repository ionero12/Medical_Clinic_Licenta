import React, {useState} from 'react';
import MedicMenu from './MedicMenu';
import PatientMenu from './PatientMenu';

const Navbar = ({userType, medicId}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const renderMenu = () => {
        if (userType === 'medic') {
            return <MedicMenu medicId={medicId}/>;
        } else if (userType === 'pacient') {
            return <PatientMenu/>;
        } else {
            return null;
        }
    };

    return (<div>
            <div>
                {renderMenu()}
            </div>
        </div>);
};

export default Navbar;
