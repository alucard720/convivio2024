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
      const response = await axios.get('http://localhost:3001/api/padron', {
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