import React from 'react';
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts';

const TemperatureChart = ({data}) => {
    let tempData = data.filter(item => item.valoare?.numeValoare === "Temperatura");
    tempData.sort((a, b) => new Date(a.analiza.dataAnaliza) - new Date(b.analiza.dataAnaliza));
    let ritmData = data.filter(item => item.valoare?.numeValoare === "Ritm cardiac");
    ritmData.sort((a, b) => new Date(a.analiza.dataAnaliza) - new Date(b.analiza.dataAnaliza));
    let glucozaData = data.filter(item => item.valoare?.numeValoare === "Glucoza");
    glucozaData.sort((a, b) => new Date(a.analiza.dataAnaliza) - new Date(b.analiza.dataAnaliza));
    let presiuneSistolicaData = data.filter(item => item.valoare?.numeValoare === "Presiune sistolica");
    presiuneSistolicaData.sort((a, b) => new Date(a.analiza.dataAnaliza) - new Date(b.analiza.dataAnaliza));
    let presiuneDiastolicaData = data.filter(item => item.valoare?.numeValoare === "Presiune diastolica");
    presiuneDiastolicaData.sort((a, b) => new Date(a.analiza.dataAnaliza) - new Date(b.analiza.dataAnaliza));

    const chartData1 = tempData.map(item => ({
        name: item.analiza.dataAnaliza, Temperature: item.valoare.rezultatValoare
    }));

    const chartData2 = ritmData.map(item => ({
        name: item.analiza.dataAnaliza, Ritm: item.valoare.rezultatValoare
    }));

    const chartData3 = glucozaData.map(item => ({
        name: item.analiza.dataAnaliza, Glucoza: item.valoare.rezultatValoare
    }));

    const chartData4 = presiuneSistolicaData.map(item => ({
        name: item.analiza.dataAnaliza, Sistolic: item.valoare.rezultatValoare
    }));

    const chartData5 = presiuneDiastolicaData.map(item => ({
        name: item.analiza.dataAnaliza, Distolic: item.valoare.rezultatValoare
    }));

    const combinedChartData = chartData4.map((item, index) => ({
        ...item, ...chartData5[index]
    }));

    return (<div className="flex flex-wrap justify-between mt-3">
            <div className="w-full sm:w-1/2 mb-4">
                <div className="bg-white text-black rounded-lg p-4 mr-1 flex justify-center">
                    <LineChart width={320} height={250} data={chartData1}>
                        <Line type="monotone" dataKey="Temperature" stroke="#8884d8" name="Temperature"/>
                        <CartesianGrid stroke="#ccc"/>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend align="center"/>
                    </LineChart>
                </div>
            </div>

            <div className="w-full sm:w-1/2 mb-4">
                <div className="bg-white text-black rounded-lg p-4 ml-1 flex justify-center">
                    <LineChart width={320} height={250} data={chartData2}>
                        <Line type="monotone" dataKey="Ritm" stroke="#8884d8" name="Heart Rate"/>
                        <CartesianGrid stroke="#ccc"/>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend align="center"/>
                    </LineChart>
                </div>
            </div>

            <div className="w-full sm:w-1/2 mb-4">
                <div className="bg-white text-black rounded-lg p-4 mr-1 flex justify-center">
                    <LineChart width={320} height={250} data={chartData3}>
                        <Line type="monotone" dataKey="Glucoza" stroke="#8884d8" name="Glucose"/>
                        <CartesianGrid stroke="#ccc"/>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend align="center"/>
                    </LineChart>
                </div>
            </div>

            <div className="w-full sm:w-1/2 mb-4">
                <div className="bg-white text-black rounded-lg p-4 ml-1 flex justify-center">
                    <LineChart width={320} height={250} data={combinedChartData}>
                        <Line type="monotone" dataKey="Sistolic" stroke="#8884d8" name="Systolic"/>
                        <Line type="monotone" dataKey="Distolic" stroke="#82ca9d" name="Diastolic"/>
                        <CartesianGrid stroke="#ccc"/>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend align="center"/>
                    </LineChart>
                </div>
            </div>
        </div>);
}

export default TemperatureChart;
