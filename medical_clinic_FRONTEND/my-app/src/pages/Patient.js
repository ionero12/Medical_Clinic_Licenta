import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import MedicMenu from "../components/MedicMenu";
import Modal from "react-modal";
import axios from "axios";
import 'animate.css/animate.min.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import TemperatureChart from "../components/ChartComponent";
import {toast, ToastContainer} from "react-toastify";
import {api} from '../user/api.js'
import {useUser} from "../user/UserContext";


const Patient = () => {
    Modal.setAppElement('#root')

    const {user} = useUser();
    const idMedic = user ? user.userData.idMedic : null;

    const [patient, setPatient] = useState(null);
    const {idPacient} = useParams();

    const [addAnalizaModalIsOpen, setAddAnalizaModalIsOpen] = useState(false);
    const [addDiagnosticModalIsOpen, setAddDiagnosticModalIsOpen] = useState(false);

    const [dataAnaliza, setDataAnaliza] = useState('');
    const [numeValoare, setNumeValoare] = useState('');
    const [rezultatValoare, setRezultatValoare] = useState('');
    const [dataDiagnostic, setDataDiagnostic] = useState('');
    const [numeDiagnostic, setNumeDiagnostic] = useState('');

    const [valoareAnalize, setValoareAnalize] = useState([]);
    const [diagnostics, setDiagnostics] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchPatient = async () => {
            if (idPacient) {
                try {
                    const response = await api.get(`/pacient/${idPacient}`);
                    setPatient(response.data);
                } catch (error) {
                    console.error('Error fetching patient data:', error);
                }
            }
        };

        fetchPatient();
    }, [idPacient]);

    useEffect(() => {
        const fetchDiagnostics = async () => {
            if (idPacient) {
                try {
                    const response = await api.get(`/diagnostic/pacient?idPacient=${idPacient}`);
                    setDiagnostics(response.data);
                } catch (error) {
                    console.error('Error fetching diagnostic data:', error);
                }
            }
        };

        fetchDiagnostics();
    }, [idPacient]);

    useEffect(() => {
        const fetchValoareAnalize = async () => {
            if (idPacient) {
                try {
                    const response = await api.get(`/valoare_analize/pacient?idPacient=${idPacient}`);
                    setData(response.data);
                    let valoareAnalizeData = data.filter(item => item.valoare.numeValoare !== "Temperature" && item.valoare.numeValoare !== "Heart Rate" && item.valoare.numeValoare !== "Glucose" && item.valoare.numeValoare !== "Systolic Pressure" && item.valoare.numeValoare !== "Diastolic Pressure");
                    setValoareAnalize(valoareAnalizeData);
                } catch (error) {
                    console.error('Error fetching valoare analize data:', error);
                }
            }
        };

        fetchValoareAnalize();
    }, [idPacient, data]);


    const handleAddAnaliza = async (event) => {
        event.preventDefault();

        const date = new Date(dataAnaliza);
        const currentDate = new Date();

        if (date > currentDate) {
            toast.error('Cannot add analysis to a date in the future');
            return;
        }

        const newAnaliza = {
            pacient: {
                idPacient
            }, dataAnaliza
        };

        try {
            const responseAnaliza = await axios.post(`http://localhost:8081/api/analiza`, newAnaliza);
            const idAnaliza = responseAnaliza.data.idAnaliza;

            const newValoare = {
                numeValoare, rezultatValoare
            };

            try {
                const responseValoare = await axios.post(`http://localhost:8081/api/valoare`, newValoare);
                const idValoare = responseValoare.data.idValoare;

                const newValoareAnaliza = {
                    id: {
                        analizeIdAnaliza: idAnaliza, valoriIdValoare: idValoare
                    }, analiza: {
                        idAnaliza
                    }, valoare: {
                        idValoare
                    }
                };

                try {
                    const responseValoareAnaliza = await axios.post(`http://localhost:8081/api/valoare_analize`, newValoareAnaliza);

                    setData([...data, responseValoareAnaliza.data]);

                    setValoareAnalize(prevValoareAnalize => {
                        const updatedValoareAnalize = [...prevValoareAnalize, responseValoareAnaliza.data];
                        return updatedValoareAnalize.filter(item => item.valoare.numeValoare !== "Temperature" && item.valoare.numeValoare !== "Heart Rate" && item.valoare.numeValoare !== "Glucose" && item.valoare.numeValoare !== "Systolic Pressure" && item.valoare.numeValoare !== "Diastolic Pressure");
                    });

                    toast.success('Analysis added successfully');
                    closeAddAnalizaModal();
                } catch (error) {
                    console.error('Error adding valoare_analiza:', error);
                }
            } catch (error) {
                console.error('Error adding valoare:', error);
            }
        } catch (error) {
            console.error('Error adding analiza:', error);
        }
    };

    const deleteAnaliza = (analizeIdAnaliza, valoriIdValoare) => {
        fetch(`http://localhost:8081/api/valoare_analize/${analizeIdAnaliza}/${valoriIdValoare}`, {
            method: 'DELETE',
        }).then(() => {
            setValoareAnalize(valoareAnalize.filter(valoareAnaliza => valoareAnaliza.id.analizeIdAnaliza !== analizeIdAnaliza && valoareAnaliza.id.valoriIdValoare !== valoriIdValoare));
            toast.success('The analysis has been successfully deleted');
        }).catch(error => {
            console.error('Eroare la ștergerea analizei:', error);
        });
    };


    const handleAddDiagnostic = async (event) => {
        event.preventDefault();

        const date = new Date(dataDiagnostic);
        const currentDate = new Date();

        if (date > currentDate) {
            toast.error('Cannot add diagnostic to a date in the future');
            return;
        }

        const newDiagnostic = {
            pacient: {
                idPacient
            }, dataDiagnostic, numeDiagnostic
        };

        try {
            const response = await axios.post(`http://localhost:8081/api/diagnostic`, newDiagnostic);
            setDiagnostics([...diagnostics, response.data]);

            toast.success('Diagnostic added successfully');
            closeAddDiagnosticModal();
        } catch (error) {
            console.error('Error adding diagnostic:', error);
        }
    };

    const deleteDiganostic = (idDiagnostic) => {
        fetch(`http://localhost:8081/api/diagnostic/${idDiagnostic}`, {
            method: 'DELETE',
        }).then(() => {
            setDiagnostics(diagnostics.filter(diagnostic => diagnostic.idDiagnostic !== idDiagnostic));
            toast.success('The diagnostic has been successfully deleted');
        }).catch(error => {
            console.error('Eroare la ștergerea diagnosticului:', error);
        });
    };

    function openAddAnalizaModal() {
        setAddAnalizaModalIsOpen(true);
    }

    function closeAddAnalizaModal() {
        setDataAnaliza('');
        setNumeValoare('');
        setRezultatValoare('');
        setAddAnalizaModalIsOpen(false);
    }

    function openAddDiagnosticModal() {
        setAddDiagnosticModalIsOpen(true);
    }

    function closeAddDiagnosticModal() {
        setDataDiagnostic('');
        setNumeDiagnostic('');
        setAddDiagnosticModalIsOpen(false);
    }

    return (<div>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            draggable
            theme="light"
        />
        <div className="p-6">
            <MedicMenu medicId={idMedic}/>
            <div className="flex flex-col md:flex-row mt-2">
                <div className="bg-white p-4 rounded shadow w-full md:w-1/2 mr-2 mb-4 md:mb-0 text-lg">
                    <h2 className="text-3xl font-bold mb-4">{patient?.numePacient} {patient?.prenumePacient}</h2>
                    <p className="mb-2"><strong>CNP:</strong> {patient?.cnpPacient}</p>
                    <p className="mb-2"><strong>Age:</strong> {patient?.varstaPacient}</p>
                    <p className="mb-2"><strong>Sex:</strong> {patient?.sexPacient}</p>
                    <p className="mb-2"><strong>Weight:</strong> {patient?.greutatePacient}</p>
                    <p className="mb-2"><strong>Height:</strong> {patient?.inaltimePacient}</p>
                    <p className="mb-2"><strong>Date of Birth:</strong> {patient?.dataNasterePacient}</p>
                    <p className="mb-2"><strong>Assured:</strong> {patient?.asigurat}</p>
                    <p className="mb-2"><strong>Subscription:</strong> {patient?.abonamentPacient}</p>
                    <p className="mb-2"><strong>Phone number:</strong> {patient?.telefonPacient}</p>
                    <p className="mb-2"><strong>Email:</strong> {patient?.emailPacient}</p>
                </div>

                <div className="bg-white p-4 rounded shadow w-full md:w-1/2">
                    <button
                        onClick={openAddAnalizaModal}
                        className="bg-emerald-500 hover:bg-emerald-700 text-white py-2 px-3 rounded transition duration-300 ease-in-out">
                        Add analysis <FontAwesomeIcon icon={faPlus}/>
                    </button>
                    <Modal
                        isOpen={addAnalizaModalIsOpen}
                        onRequestClose={closeAddAnalizaModal}
                        contentLabel="Add analiza"
                        className="w-80 h-80 p-4 m-4 md:w-1/2 md:h-1/2 lg:w-1/3 lg:h-2/3 mx-auto mt-36 bg-blue-300 rounded-2xl border-2 border-blue-600 text-center content-center animate__animated animate__zoomIn"
                    >
                        <form onSubmit={handleAddAnaliza} className="flex flex-col">
                            <label className="mb-2">
                                Date:
                                <input type="date" value={dataAnaliza}
                                       onChange={e => setDataAnaliza(e.target.value)} required
                                       className="mt-1"/>
                            </label>
                            <label className="mb-2">
                                Analysis name:
                                <input type="text" value={numeValoare}
                                       onChange={e => setNumeValoare(e.target.value)} required
                                       className="mt-1"/>
                            </label>
                            <label className="mb-2">
                                Analysis value:
                                <input type="number" value={rezultatValoare}
                                       onChange={e => setRezultatValoare(e.target.value)} required
                                       className="mt-1"/>
                            </label>
                            <input type="submit" value="Submit"
                                   className="mt-7 border-2 border-blue-600 rounded-3xl w-1/2 mx-auto"/>
                        </form>
                    </Modal>
                    <div
                        className="border-gray-400 border-2 p-4 rounded-md shadow-lg transition duration-300 ease-in-out hover:shadow-2xl mt-2">
                        <h4><strong>Analyses:</strong></h4>
                        <ul>
                            {valoareAnalize.map((valoareAnaliza) => (
                                <li key={`${valoareAnaliza.id.analizeIdAnaliza}-${valoareAnaliza.id.valoriIdValoare}`}
                                    className="flex items-center justify-between mb-4">
                                    <div>
                                        Analysis name: {valoareAnaliza.valoare.numeValoare}
                                        <br/>
                                        Analysis value: {valoareAnaliza.valoare.rezultatValoare}
                                        <br/>
                                        Analysis value
                                        interval: {valoareAnaliza.valoare.valoareMin}-{valoareAnaliza.valoare.valoareMax}
                                        <br/>
                                        Date: {valoareAnaliza.analiza.dataAnaliza}
                                    </div>
                                    <button
                                        onClick={() => deleteAnaliza(valoareAnaliza.id.analizeIdAnaliza, valoareAnaliza.id.valoriIdValoare)}
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
                        Add diagnostic <FontAwesomeIcon icon={faPlus}/>
                    </button>
                    <Modal
                        isOpen={addDiagnosticModalIsOpen}
                        onRequestClose={closeAddDiagnosticModal}
                        contentLabel="Add diagnostic"
                        className="w-80 h-80 p-4 m-4 md:w-1/2 md:h-1/2 lg:w-1/3 lg:h-2/3 mx-auto mt-36 bg-blue-300 rounded-2xl border-2 border-blue-600 text-center content-center animate__animated animate__zoomIn"
                    >
                        <form onSubmit={handleAddDiagnostic} className="flex flex-col">
                            <label className="mb-2">
                                Date:
                                <input type="date" value={dataDiagnostic}
                                       onChange={e => setDataDiagnostic(e.target.value)} required
                                       className="mt-1"/>
                            </label>
                            <label>
                                Diagnostic name:
                                <input type="text" value={numeDiagnostic}
                                       onChange={e => setNumeDiagnostic(e.target.value)} required
                                       className="mt-1"/>
                            </label>
                            <input type="submit" value="Submit"
                                   className="mt-7 border-2 border-blue-600 rounded-3xl w-1/2 mx-auto"/>
                        </form>
                    </Modal>
                    <div
                        className="border-gray-400 border-2 p-4 rounded-md shadow-lg transition duration-300 ease-in-out hover:shadow-2xl mt-2">
                        <h4><strong>Diagnostic:</strong></h4>
                        <ul>
                            {diagnostics.map((diagnostic) => (
                                <li key={diagnostic.idDiagnostic} className="flex items-center justify-between mb-4">
                                    <div>
                                        <p>Name: {diagnostic.numeDiagnostic}</p>
                                        <p>ID: {diagnostic.idDiagnostic}, Date: {diagnostic.dataDiagnostic}</p>
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
            <TemperatureChart data={data}/>
        </div>
    </div>);
};

export default Patient;
