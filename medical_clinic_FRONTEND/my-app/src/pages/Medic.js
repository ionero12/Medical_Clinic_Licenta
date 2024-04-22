import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import PacientMenu from "../components/PatientMenu";

//TODO: adaugat mai multe detalii(nu stiu de unde) si programu medicului facut mai vizual
//TODO: de adaugat experienta si universitatea la medic
//TODO: de implementat ratingurile si feedbackurile(api la consultatie/medic si apoi afisat pe pagina rating si feedback)

const Medic = () => {
    const [medic, setMedic] = useState(null);
    const {idMedic} = useParams();

    useEffect(() => {
        fetch(`http://localhost:8081/api/medic/${idMedic}`)
            .then(response => response.json())
            .then(data => {
                setMedic(data);
                console.log(data);
            });
    }, [idMedic]);

    if (!medic) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (<div className="p-6">
        <PacientMenu/>
        <div className="flex flex-col md:flex-row mt-4">
            <div className="bg-white p-4 rounded shadow w-full md:w-1/2 mr-2 mb-4 md:mb-0 text-lg">
                <h2 className="text-3xl font-bold mb-4">{medic.numeMedic} {medic.prenumeMedic}</h2>
                <p className="mb-2"><strong>Email:</strong> {medic.emailMedic}</p>
                <p className="mb-2"><strong>Telefon:</strong> {medic.telefonMedic}</p>
                <div className="mb-2">
                    <strong>Program:</strong>
                    <div className="mt-2 bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4" role="alert">
                        <p className="font-bold">Luni-Vineri:</p>
                        <p>08:00-18:00</p>
                    </div>
                </div>
            </div>
        </div>
    </div>);
};

export default Medic;