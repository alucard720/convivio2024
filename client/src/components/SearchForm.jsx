import React, { useState } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

export default function Component() {
  const [cedula, setCedula] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

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
  }

  const handleClear = () => {
    setCedula('')
    setResult(null)
    setError('')
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
            <span className="inline-block mr-2">🏠</span>
            Inicio
          </NavLink>
          <NavLink to="/convivio" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-amber-700 hover:text-white">
            <span className="inline-block mr-2">👥</span>
            Registro Convivio
          </NavLink>
          <NavLink to="/register" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-amber-700 hover:text-white">
            <span className="inline-block mr-2">📅</span>
            Reportes
          </NavLink>
          {/* <NavLink href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-amber-700 hover:text-white">
            <span className="inline-block mr-2">⚙️</span>
            Configuración
          </NavLink> */}
        </nav>
      </div>

      {/*Main*/}
              <div className="flex-1 overflow-auto">
    <div className="min-h-screen bg-gradient-to-br from-amber-600 to-orange-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="relative h-40 sm:h-48">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jpdlogo-B3Co2Tghpq4k9jn4YQwQDor5XYDb5T.jpg"
            alt="Corriente Magisterial Juan Pablo Duarte"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
        <div className="px-6 py-4">
          <h2 className="text-2xl font-bold text-center text-amber-800 mb-4">Búsqueda de Docentes</h2>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="cedula" className="text-sm font-medium text-amber-700">
                Cédula:
              </label>
              <input
                id="cedula"
                type="text"
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
                placeholder="Ingrese la cédula"
                className="w-full px-3 py-2 border border-amber-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
              >
                Buscar
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
              >
                Limpiar
              </button>
            </div>
          </form>

          {result && result.status === 'success' && result.data.length > 0 &&(
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2 text-amber-800">Resultado de la búsqueda:</h3>
               {result.data.map((docente, index)=>(
                <ul>
                <li key={index}>
                <p><strong>{docente.nombres}</strong></p>
                <p><strong>{docente.apellido1}</strong></p>
                <p><strong>{docente.apellido2}</strong></p>
                <p><strong>{"pago"}</strong></p>
                </li>
                </ul>

               ))}
            </div>
          )}

          {error && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2 text-red-600">Error:</h3>
              <pre className="bg-red-50 p-4 rounded-md overflow-x-auto text-sm text-red-800">
                {JSON.stringify(error, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
    </div>

  )
}