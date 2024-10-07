import React, { useState, useReducer } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';


const initialState ={
  cedula:'',
  searchResult: null,
  inputField: [{ nombreField: '', apellidoField: '', edadField: '', requerimientoField: '', monto:'', coordinador:'', municipio:'', telefono:'' }],
};

function reducer(state, action){
  switch(action.type){
    case 'SET_CEDULA':
      return{...state, cedula:action.payload};
    case 'SET_SEARCH_RESULT':
      return {...state, searchResult:action.payload};
    case 'SET_INPUT_FIELD':
      return {...state, inputField:action.payload};
    case 'ADD_INPUT':
      return {
        ...state, inputField:[...state.inputField, {nombreField: '', apellidoField: '', edadField: '', requerimientoField: '', monto:'', coordinador:'', municipio:'', telefono:''}]
      };
    case 'DELETE_INPUT_FIELD':
        const newInputFields = [...state.inputField];
        newInputFields.splice(action.payload, 1);
        return { ...state, inputField: newInputFields };
   case 'CLEAR_FORM':
        return initialState;
      default:
        return state;
  }
}




function ConvivioRegistro() {
   const[state, dispatch] = useReducer(reducer, initialState)
   const[error, setError] = useState('')


    const handleSearch = async (e) => {
        e.preventDefault()

        try {
          const response = await axios.get('http://localhost:3001/api/padron', {
            params: { cedula: state.cedula }
          });
          dispatch({type: 'SET_SEARCH_RESULT', payload: response.data})
          setError('');

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

        }
    };

    const handleValueChange = (index, event) => {
        const {name, value} = event.target
        const newInputs = state.inputField.map((input, i) =>
        i === index ? {...input, [name]: value} : input);
        dispatch({type: 'SET_INPUT_FIELD', payload:newInputs})

    }

    const handleAddChangeField = () => {
      dispatch({type: 'ADD_INPUT_FIELD'})
    }

    const handleDeleteFields = (index) => {
   dispatch({type: 'DELETE_INPUT_FIELD', payload: index})
  }

    const handleClear = () => {
       dispatch({type: 'CLEAR_FORM'});
       setError('');
    };

    const handleSubmit = async ()=>{
      const combineData = {
        cedula: state.cedula,
        searchResult: state.searchResult,
        inputField: state.inputField,
      };
      try {
        const response = await axios.post('http://localhost:3001/api/saveData', combineData);
        alert('Data saved success')
      } catch (error) {
        setError('Failed to save data')
      }
    }



    return (
        <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-amber-700 text-white">
        <div className="p-4">
          <h2 className="text-2xl font-semibold">Menu</h2>
        </div>
        <nav className="mt-8">
          <NavLink to="/search" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-amber-700 hover:text-white">
            <span className="inline-block mr-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>
</span>
            Inicio
          </NavLink>
          <NavLink to="/convivio" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-amber-700 hover:text-white">
            <span className="inline-block mr-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
</svg>
</span>
            Registro Convivio
          </NavLink>
          <NavLink to="/reportes" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-amber-700 hover:text-white">
            <span className="inline-block mr-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
</svg>
</span>
            Reportes
          </NavLink>
          {/* <NavLink href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-amber-700 hover:text-white">
            <span className="inline-block mr-2">⚙️</span>
            Configuración
          </NavLink> */}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="min-h-screen bg-gradient-to-br from-amber-600 to-orange-200 p-8">
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
                    <input type='text' placeholder='XXX-XXXXXX-X' maxLength={14} value={state.cedula} onChange={(e) => dispatch({ type: 'SET_CEDULA', payload: e.target.value })} required
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

              {state.result && state.result.status === 'success' && state.result.data.length > 0 &&(
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2 text-amber-800">Resultado de la búsqueda:</h3>
                  {state.result.data.map((docente, index)=>(
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
            </div>

            <div className="p-6 space-y-6">
              <h2 className="text-lg font-semibold text-amber-800">Parientes</h2>
              {state.inputField.map((input, index) => (
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
              <button onClick={handleSubmit} className="text-white bg-amber-600 hover:bg-amber-700 focus:ring-4 focus:ring-amber-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Guardar</button>
              <button onClick={handleClear} className="text-white bg-amber-600 hover:bg-amber-700 focus:ring-4 focus:ring-amber-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Limpiar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}

export default ConvivioRegistro;