import React, { useReducer, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const initialState = {
  cedula: '',
  searchResult: null,
  inputField: [{ nombreField: '', apellidoField: '', edadField: '', requerimientoField: '' }],
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_CEDULA':
      return { ...state, cedula: action.payload };
    case 'SET_SEARCH_RESULT':
      return { ...state, searchResult: action.payload };
    case 'SET_INPUT_FIELD':
      return { ...state, inputField: action.payload };
    case 'ADD_INPUT_FIELD':
      return {
        ...state,
        inputField: [...state.inputField, { nombreField: '', apellidoField: '', edadField: '', requerimientoField: '' }],
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
  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:3001/api/padron', {
        params: { cedula: state.cedula },
      });
      dispatch({ type: 'SET_SEARCH_RESULT', payload: response.data });
      setError('');
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('Record not found');
      } else {
        setError('An error occurred');
      }
    }
  };

  const handleValueChange = (index, event) => {
    const { name, value } = event.target;
    const newInputs = state.inputField.map((input, i) =>
      i === index ? { ...input, [name]: value } : input
    );
    dispatch({ type: 'SET_INPUT_FIELD', payload: newInputs });
  };

  const handleAddChangeField = () => {
    dispatch({ type: 'ADD_INPUT_FIELD' });
  };

  const handleDeleteFields = (index) => {
    dispatch({ type: 'DELETE_INPUT_FIELD', payload: index });
  };

  const handleClear = () => {
    dispatch({ type: 'CLEAR_FORM' });
    setError('');
  };

  const handleSubmit = async () => {
    const combinedData = {
      cedula: state.cedula,
      searchResult: state.searchResult,
      inputField: state.inputField,
    };
    try {
      const response = await axios.post('http://localhost:3001/api/saveData', combinedData);
      alert('Data saved successfully!');
    } catch (error) {
      setError('Failed to save data');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-amber-700 text-white">
        <div className="p-4">
          <h2 className="text-2xl font-semibold">Menu</h2>
        </div>
        <nav className="mt-8">
          <NavLink to="/search" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-amber-700 hover:text-white">
            Inicio
          </NavLink>
          <NavLink to="/convivio" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-amber-700 hover:text-white">
            Registro Convivio
          </NavLink>
          <NavLink to="/reportes" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-amber-700 hover:text-white">
            Reportes
          </NavLink>
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
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jpdlogo-n9LITqCLoiT1XH8VzZpj4xctKxSfH6.jpg" alt="Logo" width={250} height={200} className="rounded-lg" />
            </div>

            {error && <p className="text-red-600 p-4">{error}</p>}

            <div className="p-6 space-y-12">
              <form onSubmit={handleSearch}>
                <div className="grid grid-cols-10 gap-4 items-end">
                  <div className="col-span-8 sm:col-span-4 space-y-5">
                    <label htmlFor="product-name" className="text-sm font-medium text-gray-900 block mb-2">Buscar Cedula</label>
                    <input type="text" placeholder="XXX-XXXXXX-X" maxLength={14} value={state.cedula} onChange={(e) => dispatch({ type: 'SET_CEDULA', payload: e.target.value })} required
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5"
                    />
                  </div>
                  <div className="col-span-2">
                    <button type="submit" className="text-white bg-amber-600 hover:bg-amber-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                      Buscar
                    </button>
                  </div>
                </div>
              </form>

              {state.searchResult && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2 text-amber-800">Resultado de la búsqueda:</h3>
                  {/* Display search result */}
                  {/* Assuming searchResult is an array, you can map through it */}
                </div>
              )}
            </div>

            <div className="p-6 space-y-6">
              <h2 className="text-lg font-semibold text-amber-800">Parientes</h2>
              {state.inputField.map((input, index) => (
                <form key={index}>
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-3 sm:col-span-4">
                      <input type="text" name="nombreField" placeholder="Nombres" value={input.nombreField} onChange={(e) => handleValueChange(index, e)} required className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5" />
                    </div>
                    <div className="col-span-3 sm:col-span-4">
                      <input type="text" name="apellidoField" placeholder="Apellido" value={input.apellidoField} onChange={(e) => handleValueChange(index, e)} required className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5" />
                    </div>
                    <div className="col-span-3 sm:col-span-2">
                      <select name="edadField" value={input.edadField} onChange={(e) => handleValueChange(index, e)} className="shadow-sm bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5">
                        <option>Eligir Edad</option>
                        <option>0-3 Años</option>
                        <option>4-12 Años</option>
                        <option>Adulto</option>
                      </select>
                    </div>
                    <div className="col-span-3 sm:col-span-2">
                      <button type="button" onClick={() => handleDeleteFields(index)} className="text-white bg-red-500 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Eliminar
                      </button>
                    </div>
                  </div>
                </form>
              ))}

              <div className="col-span-2">
                <button type="button" onClick={handleAddChangeField} className="text-white bg-amber-600 hover:bg-amber-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  Agregar Otro Pariente
                </button>
              </div>
            </div>

            <div className="flex justify-end p-6 space-x-2 border-t border-gray-200 rounded-b">
              <button onClick={handleSubmit} className="text-white bg-amber-600 hover:bg-amber-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Guardar
              </button>
              <button onClick={handleClear} className="text-gray-500 bg-white hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Limpiar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConvivioRegistro;
