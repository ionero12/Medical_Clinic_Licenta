import React from 'react';
import { InlineWidget } from 'react-calendly';

const doctorUrls = {
    23: 'https://calendly.com/ionelaalexandras90-4/30min',
    24: 'https://calendly.com/ionelaalexandras90-3/15min'
}

const CalendlyComponent = ({ medicId }) => {
    const calendlyUrl = doctorUrls[medicId];

    if (!calendlyUrl) {
        return <p className="text-red-500">Doctor does not accept online meetings.</p>;
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-semibold mb-4">Schedule a short meeting with the doctor</h2>
            <div className="w-full max-w-md">
                <InlineWidget
                    url={calendlyUrl}
                    styles={{
                        height: '600px',
                        width: '100%',
                    }}
                    className="rounded-lg shadow-lg"
                />
            </div>
        </div>
    );
};

export default CalendlyComponent;
