import React, { useState } from 'react';
import axios from 'axios';

function ConvivioRegistro() {
    const [cedula, setCedula] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [inputField, setInputField] = useState([{nombreField:"", apellidoField:"", edadField:"", requerimientoField:""}]);

    const handleSearch = async (e) => {
        e.preventDefault()

        try {
          const response = await axios.get('http://localhost:8000/docentes', {
            params: { cedula }
          })

          setResult({
            status: 'success',
            data: response.data
          })
          setError('')
        } catch (err) {
          if (err.response && err.response.status === 404) {
            setError({
              status: 'error',
              message: 'Record not found',
            })
          } else {
            setError({
              status: 'error',
              message: 'An error occurred',
              details: err.message
            })
          }
          setResult(null)
        }
    };

    const handleValueChange = (index, event) => {
        const {name, value} = event.target
        const newInputs = inputField.map((input, i) =>
        i === index ? {...input, [name]: value} : input)
        setInputField(newInputs);
    }

    const handleAddChangeField = () => {
        setInputField([...inputField, {nombreField:"", apellidoField:"", edadField:"", requerimientoField:""}]);
    }

    const handleClear = () => {
        setCedula('');
        setResult(null);
        setError('');
    }

    const handleDeleteFields = (index) => {
        const newInputFields = [...inputField];
        newInputFields.splice(index, 1)
        setInputField(newInputFields);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-700 to-orange-400 p-8">
            <div className="max-w-4xl mx-auto bg-white border border-4 rounded-lg shadow relative">
                <div className="flex items-center justify-between p-5 border-b rounded-t">
                    <h3 className="text-xl font-semibold text-amber-800">
                        Registro Convivio
                    </h3>
                    <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jpdlogo-n9LITqCLoiT1XH8VzZpj4xctKxSfH6.jpg"
                        alt="Corriente Magisterial Juan Pablo Duarte Logo"
                        width={250}
                        height={200}
                        className="rounded-lg"
                    />
                </div>

                {error && <p className="text-red-600 p-4">{error}</p>}

                <div className="p-6 space-y-12">
                    <form onSubmit={handleSearch}>
                        <div className="grid grid-cols-10 gap-4 items-end">
                            <div className="col-span-8 sm:col-span-4 space-y-5">
                                <label htmlFor="product-name" className="text-sm font-medium text-gray-900 block mb-2">Buscar Cedula</label>
                                <input type='text' placeholder='XXX-XXXXXX-X' maxLength={14} value={cedula} onChange={(e)=>setCedula(e.target.value)} required
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5"
                                />
                            </div>
                            <div className="col-span-2">
                                <button
                                    type="submit"
                                    className="text-white bg-amber-600 hover:bg-amber-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Buscar
                                </button>
                            </div>
                        </div>
                    </form>

                    {result && result.status === 'success' && result.data.length > 0 &&(
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2 text-amber-800">Resultado de la búsqueda:</h3>
               {result.data.map((docente, index)=>(
                <div className='grid grid-cols-10 gap-12' key={index}>

                <div className='col-span-2 sm:col-span-3'>
                <label className="text-sm font-medium text-gray-900 block mb-2">Nombres: <strong>{docente.nombres}</strong></label>

                </div>
                <div className="col-span-6 sm:col-span-3">
                <label className="text-sm font-medium text-gray-900 block mb-2">Apellido: <strong>{docente.apellido1}</strong></label>

                </div>
                <div className="col-span-6 sm:col-span-3">
                <label className="text-sm font-medium text-gray-900 block mb-2">Apellido2: <strong>{docente.apellido2}</strong></label>
                 </div>
                </div>



               ))}
            </div>
          )}
{/*
                    {result && result.status === "success" && result.data.length > 0 && (

                        <div className="grid grid-cols-10 gap-12 ">
                            <div className="col-span-6 sm:col-span-3">
                                <label className="text-sm font-medium text-gray-900 block mb-2">Nombres:</label>
                                <p className='text-lg font-semibold text-gray-700 mb-2'>
                                    <span className='text-gray-900'>{result.nombres}</span>
                                </p>
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label className="text-sm font-medium text-gray-900 block mb-2">Apellido1:</label>
                                <p className='text-lg font-semibold text-gray-700 mb-2'>
                                    <span className='text-gray-900'>{result.apellido1}</span>
                                </p>
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label className="text-sm font-medium text-gray-900 block mb-2">Apellido2:</label>
                                <p className='text-lg font-semibold text-gray-700 mb-2'>
                                    <span className='text-gray-900'>{result.apellido2}</span>
                                </p>
                            </div>
                        </div>
                    )} */}
                </div>

                <div className="p-6 space-y-6">
                    <h2 className="text-lg font-semibold text-amber-800">Parientes</h2>
                    {inputField.map((input, index) => (
                        <form key={index}>
                            <div className="grid grid-cols-12 gap-4">
                                <div className="col-span-3 sm:col-span-4">
                                    <input type="text" name="nombreField" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5" placeholder="Nombres" required="" value={input.nombreField} onChange={(e) => handleValueChange(index, e)}/>
                                </div>
                                <div className="col-span-3 sm:col-span-4">
                                    <input type="text" name="apellidoField" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5" placeholder="Apellido" required="" value={input.apellidoField} onChange={(e) => handleValueChange(index, e)}/>
                                </div>
                                <div className="col-span-3 sm:col-span-2">
                                    <select name="edadField" className="shadow-sm bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5" value={input.edadField} onChange={(e) => handleValueChange(index, e)}>
                                        <option>Eligir Edad</option>
                                        <option>0-3 Años</option>
                                        <option>4-12 Años</option>
                                        <option>Adulto</option>
                                    </select>
                                </div>
                                <div className='col-span-3 sm:col-span-2'>
                                    <button type="button" onClick={() => handleDeleteFields(index)} className="text-white bg-red-700 hover:bg-red-800 focus:ring-3 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                        <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clipRule="evenodd"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </form>
                    ))}
                </div>

                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-6 gap-4">
                        <div className="col-span-2 sm:col-span-2">
                            <label htmlFor="requisitos" className="text-sm font-medium text-gray-900 block mb-2">Monto A Pagar</label>
                            <input type="text" name="monto" id="monto" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5" placeholder="Monto RD$" required=""/>
                        </div>
                    </div>
                </div>

                {/*Requisitos y coordinador*/}

                <div className="grid grid-cols-12 gap-4 border-t border-gray-200 space-x-5 p-6 items-end">
                <div className="col-span-3 sm:col-span-3">
                            <label htmlFor="requisitos" className="text-sm font-medium text-gray-900 block mb-2">Coordinador</label>
                            <input type="text" name="municipio" id="municipio" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5" placeholder="municipio" required=""/>

                                </div>
                <div className="col-span-3 sm:col-span-3">
                            <label htmlFor="requisitos" className="text-sm font-medium text-gray-900 block mb-2">Municipio</label>
                            <input type="text" name="municipio" id="municipio" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5" placeholder="municipio" required=""/>

                                </div>
                                <div className="col-span-3 sm:col-span-3">
                            <label htmlFor="requisitos" className="text-sm font-medium text-gray-900 block mb-2">Telefono</label>
                            <input type="text" name="municipio" id="municipio" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5" placeholder="municipio" required=""/>

                                </div>
                <div className="col-span-3 sm:col-span-3">
                <select name="edadField" className="shadow-sm bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5" >
                                    <option>Requerimiento</option>
                                     <option>habitacion doble</option>
                                        <option>habitacion sencilla</option>
                                        <option>Pareja</option>
                                        <option>Planta Baja</option>
                                        <option>Anexar Cuna</option>
                                        <option>Anexar Sofa</option>
                                        <option>2 Camas</option>
                                        <option>1 Cama</option>
                                    </select>
                                </div>



                </div>

                <div className="p-6 border-t border-gray-200 rounded-b space-x-5">
                    <button type='button' className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600" onClick={handleAddChangeField}>Agregar Campos</button>
                    <button className="text-white bg-amber-600 hover:bg-amber-700 focus:ring-4 focus:ring-amber-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Guardar</button>
                    <button onClick={handleClear} className="text-white bg-amber-600 hover:bg-amber-700 focus:ring-4 focus:ring-amber-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Limpiar</button>
                </div>
            </div>
        </div>
    );
}

export default ConvivioRegistro;