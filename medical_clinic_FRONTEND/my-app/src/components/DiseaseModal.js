import React from 'react';

const DiseaseModal = ({ isOpen, children, onClose }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="w-1/3 h-1/3 mt-52 fixed inset-0 flex mx-auto bg-indigo-300 rounded-2xl p-5 border-2 border-indigo-700">
                <div className="text-center content-center text-2xl">
                    {children}
                </div>
            <button onClick={onClose} className="absolute top-0 right-0 m-5">Close</button>
        </div>
    );
};

export default DiseaseModal;
