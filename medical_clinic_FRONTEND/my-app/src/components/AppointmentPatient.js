import React from 'react';

function AppointmentPatient({ appointment }) {
    // Parse the date and time
    let date = new Date(appointment.dataConsultatiei);
    let dateString = date.toLocaleDateString();
    let timeString = date.toLocaleTimeString();

    return (
        <li key={appointment.idConsultatie} className="border-b py-2">
            Nume consultatie: {appointment.numeConsultatie}
            <br/>
            Nume medic: {appointment.numeMedic} {appointment.prenumeMedic}
            <br/>
            ID Consutlatie: {appointment.idConsultatie}
            <br/>
            Data: {dateString}, Ora: {timeString}
        </li>
    );
}

export default AppointmentPatient;