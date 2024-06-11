import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import StarRating from "../components/StarRating";
import {api} from '../user/api.js'
import NavBar from "../components/NavBar";
import {useUser} from "../user/UserContext";
import CalendlyComponent from "../components/CalendlyComponent";


const Medic = () => {
    const {user} = useUser();

    const [medic, setMedic] = useState(null);
    const [consultatii, setConsultatii] = useState([]);
    const [ratingAverage, setRatingAverage] = useState(0);
    const {idMedic} = useParams();

    useEffect(() => {
        const fetchMedici = async () => {
            try {
                const response = await api.get(`/medic/${idMedic}`);
                setMedic(response.data);
            } catch (error) {
                console.log('Failed to fetch medici', error);
            }
        };

        fetchMedici();
    }, [idMedic]);

    useEffect(() => {
        const fetchConsultatii = async () => {
            try {
                const response = await api.get(`/consultatie/medic?idMedic=${idMedic}`);
                setConsultatii(response.data);

                const ratings = response.data.filter(consultatie => consultatie.rating !== null).map(consultatie => consultatie.rating);
                const sum = ratings.reduce((a, b) => a + b, 0);
                const average = ratings.length > 0 ? sum / ratings.length : 0;
                setRatingAverage(average)
            } catch (error) {
                console.log('Failed to fetch consulatii', error);
            }
        };

        fetchConsultatii();
    }, [idMedic]);

    return (<div className="p-6">
        <NavBar userType={user?.userType} medicId={idMedic}/>
        <div className="flex flex-col md:flex-row mt-2">
            <div className="bg-white p-4 rounded shadow w-full md:w-1/2 mr-2 mb-4 md:mb-0 text-lg">
                <h2 className="text-3xl font-bold mb-4">{medic?.numeMedic} {medic?.prenumeMedic}</h2>
                <p className="mb-2"><strong>Specialization:</strong> {medic?.specializare?.numeSpecializare}</p>
                <p className="mb-2"><strong>Email:</strong> {medic?.emailMedic}</p>
                <p className="mb-2"><strong>Phone number:</strong> {medic?.telefonMedic}</p>
                <p className="mb-2"><strong>University:</strong> {medic?.universitate}</p>
                <p className="mb-2"><strong>Experience:</strong> {medic?.experienta} years in the field</p>
                <div className="mb-4">
                    {/*<table className="table-auto">*/}
                    {/*    <thead>*/}
                    {/*    <tr>*/}
                    {/*        <th className="border-2 border-gray-400 px-4 py-2">Day</th>*/}
                    {/*        <th className="border-2 border-gray-400 px-4 py-2">Schedule</th>*/}
                    {/*    </tr>*/}
                    {/*    </thead>*/}
                    {/*    <tbody>*/}
                    {/*    <tr>*/}
                    {/*        <td className="border-2 border-gray-400 px-4 py-2 font-semibold">Monday</td>*/}
                    {/*        <td className="border-2 border-gray-400 px-4 py-2">08:00-18:00</td>*/}
                    {/*    </tr>*/}
                    {/*    <tr>*/}
                    {/*        <td className="border-2 border-gray-400 px-4 py-2 font-semibold">Tuesday</td>*/}
                    {/*        <td className="border-2 border-gray-400 px-4 py-2">08:00-18:00</td>*/}
                    {/*    </tr>*/}
                    {/*    <tr>*/}
                    {/*        <td className="border-2 border-gray-400 px-4 py-2 font-semibold">Wednesday</td>*/}
                    {/*        <td className="border-2 border-gray-400 px-4 py-2">08:00-18:00</td>*/}
                    {/*    </tr>*/}
                    {/*    <tr>*/}
                    {/*        <td className="border-2 border-gray-400 px-4 py-2 font-semibold">Thursday</td>*/}
                    {/*        <td className="border-2 border-gray-400 px-4 py-2">08:00-18:00</td>*/}
                    {/*    </tr>*/}
                    {/*    <tr>*/}
                    {/*        <td className="border-2 border-gray-400 px-4 py-2 font-semibold">Friday</td>*/}
                    {/*        <td className="border-2 border-gray-400 px-4 py-2">08:00-18:00</td>*/}
                    {/*    </tr>*/}
                    {/*    </tbody>*/}
                    {/*</table>*/}
                    {/*{user?.userType === 'patient' && (*/}
                    {/*    <div className="mb-4">*/}
                    {/*        <FullCalendarComponent />*/}
                    {/*    </div>*/}
                    {/*)}*/}
                    {user?.userType === 'pacient' && (
                        <div className="mb-4">
                            <CalendlyComponent medicId={idMedic} />
                        </div>
                    )}
                </div>
            </div>
            <div className="bg-white p-4 rounded shadow w-full md:w-1/2">
                <div className="mb-4">
                    <h2 className="text-xl font-semibold text-center">Average Rating: {ratingAverage.toFixed(2)}</h2>
                </div>
                {consultatii.filter(consultatie => consultatie.rating !== null).map((consultatie, index) => (
                    <div key={index}
                         className="border-gray-400 border-2 p-4 rounded-md shadow-lg transition duration-300 ease-in-out hover:shadow-2xl mb-2">
                        <StarRating rating={consultatie.rating} editable={false}/>
                        <p>{consultatie.feedback}</p>
                    </div>))}
            </div>

        </div>
    </div>);
};

export default Medic;