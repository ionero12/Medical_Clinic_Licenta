import React from 'react';

const DiseaseModal = ({isOpen, children, onClose}) => {
    if (!isOpen) {
        return null;
    }

    return (<div className="fixed inset-0 flex items-center justify-center p-5 bg-black bg-opacity-50">
            <div
                className="relative w-full max-w-lg mx-auto bg-blue-300 rounded-2xl p-5 border-2 border-blue-600 overflow-auto max-h-full md:w-2/3 lg:w-1/2 xl:w-1/3">
                <button onClick={onClose} className="absolute top-0 right-0 mt-3 mr-3 text-black">
                    Close
                </button>
                <div className="text-center content-center mt-8"> {/* Added margin-top to avoid overlap */}
                    <div dangerouslySetInnerHTML={{__html: children}}/>
                </div>
            </div>
        </div>);
};

export default DiseaseModal;
