import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import MedicMenu from "../components/MedicMenu";
import Modal from "react-modal";
import axios from "axios";
import 'animate.css/animate.min.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';


const Patient = () => {
    const [analize, setAnalize] = useState([]);
    const [diagnostice, setDiagnostice] = useState([]);

    const [patient, setPatient] = useState(null);
    const {idPacient} = useParams();

    const [addAnalizaModalIsOpen, setAddAnalizaModalIsOpen] = useState(false);
    const [addDiagnosticModalIsOpen, setAddDiagnosticModalIsOpen] = useState(false);

    const [dataAnaliza, setDataAnaliza] = useState('');
    const [dataDiagnostic, setDataDiagnostic] = useState('');
    const [numeDiagnostic, setNumeDiagnostic] = useState('');

    useEffect(() => {
        fetch(`http://localhost:8081/api/pacient/${idPacient}`)
            .then(response => response.json())
            .then(data => {
                setPatient(data);
                setAnalize(data.analize);
                setDiagnostice(data.diagnostice);
                console.log(data);
            });
    }, [idPacient]);

    if (!patient) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    const handleAddAnaliza = async (event) => {
        event.preventDefault();

        const newAnaliza = {
            pacient: {
                idPacient
            }, dataAnaliza
        };
        console.log('Adding analiza:', newAnaliza)

        try {
            const response = await axios.post(`http://localhost:8081/api/analiza`, newAnaliza);
            setAnalize([...analize, response.data])
            console.log('Analiza added successfully:', response.data);
            closeAddAnalizaModal();

        } catch (error) {
            console.error('Error adding analiza:', error);
        }
    };

    const deleteAnaliza = (idAnaliza) => {
        fetch(`http://localhost:8081/api/analiza/${idAnaliza}`, {
            method: 'DELETE',
        }).then(() => {
            setAnalize(analize.filter(analiza => analiza.idAnaliza !== idAnaliza));
            console.log(`Analiza cu id-ul ${idAnaliza} a fost ștearsă cu succes.`);
        }).catch(error => {
            console.error('Eroare la ștergerea analizei:', error);
        });
    };

    const handleAddDiagnostic = async (event) => {
        event.preventDefault();

        const newDiagnostic = {
            pacient: {
                idPacient
            }, dataDiagnostic, numeDiagnostic
        };
        console.log('Adding diagnostic:', newDiagnostic)

        try {
            const response = await axios.post(`http://localhost:8081/api/diagnostic`, newDiagnostic);
            setDiagnostice([...diagnostice, response.data])
            console.log('Diagnostic added successfully:', response.data);
            closeAddDiagnosticModal();
        } catch (error) {
            console.error('Error adding diagnostic:', error);
        }
    };

    const deleteDiganostic = (idDiagnostic) => {
        fetch(`http://localhost:8081/api/diagnostic/${idDiagnostic}`, {
            method: 'DELETE',
        }).then(() => {
            setDiagnostice(diagnostice.filter(diagnostic => diagnostic.idDiagnostic !== idDiagnostic));
            console.log(`Diagnosticul cu id-ul ${idDiagnostic} a fost ștears cu succes.`);
        }).catch(error => {
            console.error('Eroare la ștergerea diagnosticului:', error);
        });
    };

    function openAddAnalizaModal() {
        setAddAnalizaModalIsOpen(true);
    }

    function closeAddAnalizaModal() {
        setAddAnalizaModalIsOpen(false);
    }

    function openAddDiagnosticModal() {
        setAddDiagnosticModalIsOpen(true);
    }

    function closeAddDiagnosticModal() {
        setAddDiagnosticModalIsOpen(false);
    }


    return (<div className="p-6">
        <MedicMenu/>
        <h1 className="text-3xl font-bold mb-4">Detalii pacient</h1>
        <div className="flex flex-col md:flex-row">
            <div className="bg-white p-4 rounded shadow w-full md:w-1/2 mr-2 mb-4 md:mb-0 text-lg">
                <h2 className="text-3xl font-bold mb-4">{patient.numePacient} {patient.prenumePacient}</h2>
                <p className="mb-2"><strong>CNP:</strong> {patient.cnpPacient}</p>
                <p className="mb-2"><strong>Varsta:</strong> {patient.varstaPacient}</p>
                <p className="mb-2"><strong>Sex:</strong> {patient.sexPacient}</p>
                <p className="mb-2"><strong>Greutate:</strong> {patient.greutatePacient}</p>
                <p className="mb-2"><strong>Inaltime:</strong> {patient.inaltimePacient}</p>
                <p className="mb-2"><strong>Data nastere:</strong> {patient.dataNasterePacient}</p>
                <p className="mb-2"><strong>Asigurat:</strong> {patient.asigurat}</p>
                <p className="mb-2"><strong>Abonament:</strong> {patient.abonamentPacient}</p>
                <p className="mb-2"><strong>Telefon:</strong> {patient.telefonPacient}</p>
                <p className="mb-2"><strong>Email:</strong> {patient.emailPacient}</p>
            </div>

            <div className="bg-white p-4 rounded shadow w-full md:w-1/2">
                <button
                    onClick={openAddAnalizaModal}
                    className="bg-emerald-500 hover:bg-emerald-700 text-white py-2 px-3 rounded transition duration-300 ease-in-out">
                    Adauga analiza <FontAwesomeIcon icon={faPlus}/>
                </button>
                <Modal
                    isOpen={addAnalizaModalIsOpen}
                    onRequestClose={closeAddAnalizaModal}
                    contentLabel="Add analiza"
                    className="w-80 h-80 p-4 m-4 md:w-1/2 md:h-1/2 lg:w-1/3 lg:h-2/3 mx-auto mt-36 bg-blue-200 rounded-2xl p-5 border-2 border-blue-600 text-center content-center animate__animated animate__zoomIn"
                >
                    <form onSubmit={handleAddAnaliza} className="flex flex-col">
                        <label className="mb-2">
                            Data si ora analizei:
                            <input type="datetime-local" value={dataAnaliza}
                                   onChange={e => setDataAnaliza(e.target.value)} required
                                   className="mt-1"/>
                        </label>
                        <input type="submit" value="Submit"
                               className="mt-7 border-2 border-blue-600 rounded-3xl w-1/2 mx-auto"/>
                    </form>
                </Modal>
                <div className="border-gray-400 border-2 mt-2 p-4 rounded-md shadow-lg">
                    <h4><strong>Analize:</strong></h4>
                    <ul>
                        {analize.map((analiza) => (
                            <li key={analiza.idAnaliza} className="flex items-center justify-between mb-4">
                                <div>
                                    <p><strong>ID Analiza:</strong> {analiza.idAnaliza}</p>
                                    <p><strong>Data:</strong> {analiza.dataAnaliza}</p>
                                </div>
                                <button onClick={() => deleteAnaliza(analiza.idAnaliza)}
                                        className="bg-red-500 text-white rounded px-2.5 py-2 hover:bg-red-700 transition duration-200">
                                    Delete <FontAwesomeIcon icon={faTrash}/>
                                </button>
                            </li>))}
                    </ul>
                </div>
                <br/>
                <button
                    onClick={openAddDiagnosticModal}
                    className="bg-emerald-500 hover:bg-emerald-700 text-white py-2 px-3 rounded transition duration-300 ease-in-out">
                    Adauga diagnostic <FontAwesomeIcon icon={faPlus}/>
                </button>
                <Modal
                    isOpen={addDiagnosticModalIsOpen}
                    onRequestClose={closeAddDiagnosticModal}
                    contentLabel="Add diagnostic"
                    className="w-80 h-80 p-4 m-4 md:w-1/2 md:h-1/2 lg:w-1/3 lg:h-2/3 mx-auto mt-36 bg-blue-200 rounded-2xl p-5 border-2 border-blue-600 text-center content-center animate__animated animate__zoomIn"
                >
                    <form onSubmit={handleAddDiagnostic} className="flex flex-col">
                        <label className="mb-2">
                            Data diagnosticului:
                            <input type="date" value={dataDiagnostic}
                                   onChange={e => setDataDiagnostic(e.target.value)} required
                                   className="mt-1"/>
                        </label>
                        <label>
                            Nume diagnostic:
                            <input type="text" value={numeDiagnostic}
                                   onChange={e => setNumeDiagnostic(e.target.value)} required
                                   className="mt-1"/>
                        </label>
                        <input type="submit" value="Submit"
                               className="mt-7 border-2 border-blue-600 rounded-3xl w-1/2 mx-auto"/>
                    </form>
                </Modal>
                <div className="border-sky-500 border-2 mt-2 p-4 rounded-md shadow-lg">

                    <h4><strong>Diagnostic:</strong></h4>
                    <ul>
                        {diagnostice.map((diagnostic) => (
                            <li key={diagnostic.idDiagnostic} className="flex items-center justify-between mb-4">
                                <div>
                                    <p><strong>ID Diagnostic:</strong> {diagnostic.idDiagnostic}</p>
                                    <p><strong>Data:</strong> {diagnostic.dataDiagnostic}</p>
                                    <p><strong>Nume:</strong> {diagnostic.numeDiagnostic}</p>
                                </div>
                                <button onClick={() => deleteDiganostic(diagnostic.idDiagnostic)}
                                        className="bg-red-500 text-white rounded px-2.5 py-2 hover:bg-red-700 transition duration-200">
                                    Delete <FontAwesomeIcon icon={faTrash}/>
                                </button>
                            </li>))}
                    </ul>
                </div>
            </div>
        </div>
    </div>);
};

export default Patient;
