import {useUser} from "../user/UserContext";
import React, {useEffect, useState} from 'react';
import PatientMenu from "../components/PatientMenu";
import TemperatureChart from "../components/ChartComponent";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import {api} from '../user/api.js'


const Diagnostics = () => {
    Modal.setAppElement('#root');

    const {user} = useUser();
    const idPacient = user ? user.userData.idPacient : null;

    const [data, setData] = useState([]);
    const [diagnostics, setDiagnostics] = useState([]);
    const [valoareAnalize, setValoareAnalize] = useState([]);

    const [addAnalizaModalIsOpen, setAddAnalizaModalIsOpen] = useState(false);

    const [dataAnaliza, setDataAnaliza] = useState('');
    const [numeValoare, setNumeValoare] = useState('');
    const [rezultatValoare, setRezultatValoare] = useState('');

    useEffect(() => {
        const fetchDiagnostics = async () => {
            if (idPacient) {
                try {
                    const response = await api.get(`/diagnostic/pacient?idPacient=${idPacient}`);
                    setDiagnostics(response.data);
                } catch (error) {
                    console.error('Failed to fetch diagnostics', error);
                }
            }
        };

        fetchDiagnostics();
    }, [idPacient]);

    useEffect(() => {
        const fetchValoriAnalize = async () => {
            if (idPacient) {
                try {
                    const response = await api.get(`/valoare_analize/pacient?idPacient=${idPacient}`);
                    setData(response.data);
                    let valoareAnalizeData = data.filter(item => item.valoare.numeValoare !== "Temperature" && item.valoare.numeValoare !== "Heart Rate" && item.valoare.numeValoare !== "Glucose" && item.valoare.numeValoare !== "Systolic Pressure" && item.valoare.numeValoare !== "Diastolic Pressure");
                    setValoareAnalize(valoareAnalizeData);
                } catch (error) {
                    console.error('Failed to fetch valoare analize', error);
                }
            }
        };

        fetchValoriAnalize();
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

    function openAddAnalizaModal() {
        setAddAnalizaModalIsOpen(true);
    }

    function closeAddAnalizaModal() {
        setDataAnaliza('');
        setNumeValoare('');
        setRezultatValoare('');
        setAddAnalizaModalIsOpen(false);
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
                <PatientMenu/>
                <div className="mt-2 flex flex-col md:flex-row">
                    <div className="bg-white p-4 rounded shadow w-full md:w-1/2 mr-2 mb-4 md:mb-0">
                        <h2 className="text-2xl font-bold mb-2">Diagnostics</h2>
                        <ul>
                            {diagnostics.map((diagnostic) => (<li key={diagnostic.idDiagnostic}
                                                                  className="border-gray-400 border-2 p-4 rounded-md shadow-lg transition duration-300 ease-in-out hover:shadow-2xl mb-2">
                                Diagnostic name: {diagnostic.numeDiagnostic}
                                <br/>
                                ID: {diagnostic.idDiagnostic}, Date: {diagnostic.dataDiagnostic}
                            </li>))}
                        </ul>
                    </div>

                    <div className="bg-white p-4 rounded shadow w-full md:w-1/2">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-2xl font-bold">
                                Analyses
                            </h2>
                            <button
                                onClick={openAddAnalizaModal}
                                className="bg-emerald-500 hover:bg-emerald-700 text-white py-2 px-3 rounded transition duration-300 ease-in-out">
                                Add analysis <FontAwesomeIcon icon={faPlus}/>
                            </button>
                        </div>
                        <Modal
                            isOpen={addAnalizaModalIsOpen}
                            onRequestClose={closeAddAnalizaModal}
                            contentLabel="Add analiza"
                            className="w-80 h-80 p-4 m-4 md:w-1/2 md:h-1/2 lg:w-1/3 lg:h-2/3 mx-auto mt-36 bg-blue-200 rounded-2xl border-2 border-blue-600 text-center content-center animate__animated animate__zoomIn"
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
                                    <select
                                        value={numeValoare}
                                        onChange={e => setNumeValoare(e.target.value)}
                                        required
                                        className="mt-1"
                                    >
                                        <option value="">Select an analysis</option>
                                        <option value="Temperature">Temperature</option>
                                        <option value="Glucose">Glucose</option>
                                        <option value="Heart Rate">Heart rate</option>
                                        <option value="Systolic Pressure">Systolic pressure</option>
                                        <option value="Diastolic Pressure">Diastolic pressure</option>
                                    </select>
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
                        <ul>
                            {valoareAnalize.map((valoareAnaliza) => (
                                <li key={`${valoareAnaliza.analizeIdAnaliza}-${valoareAnaliza.valoare.idValoare}`}
                                    className="border-gray-400 border-2 p-4 rounded-md shadow-lg transition duration-300 ease-in-out hover:shadow-2xl mb-2">
                                    Analysis name: {valoareAnaliza.valoare.numeValoare}
                                    <br/>
                                    Analysis value: {valoareAnaliza.valoare.rezultatValoare}
                                    <br/>
                                    Analysis value interval: {valoareAnaliza.valoare.valoareMin}-{valoareAnaliza.valoare.valoareMax}
                                    <br/>
                                    Date: {valoareAnaliza.analiza.dataAnaliza}
                                </li>))}
                        </ul>
                    </div>
                </div>
                <TemperatureChart data={data}/>
            </div>
        </div>);
};

export default Diagnostics;
