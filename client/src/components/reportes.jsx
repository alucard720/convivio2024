import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function DataGrid() {
  const [data, setData] = useState([
    { id: 1, nombre: 'Juan', apellido: 'Pérez', edad: 30, ciudad: 'Santo Domingo' },
    { id: 2, nombre: 'María', apellido: 'González', edad: 25, ciudad: 'Santiago' },
    { id: 3, nombre: 'Carlos', apellido: 'Rodríguez', edad: 35, ciudad: 'La Vega' },
    { id: 4, nombre: 'Ana', apellido: 'Martínez', edad: 28, ciudad: 'Puerto Plata' },
    { id: 5, nombre: 'Luis', apellido: 'Hernández', edad: 40, ciudad: 'San Pedro de Macorís' },
  ]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const sortData = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });

    setData(sortedData);
  };

  return (

    <div className="flex h-screen bg-gray-100">
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
       {/*main*/}
      <div className="flex-1 overflow-auto">
    <div className="min-h-screen bg-gradient-to-br from-amber-700 to-orange-400 p-8">
      <div className="max-w-4xl mx-auto bg-white border border-4 rounded-lg shadow relative">
        <div className="flex items-center justify-between p-5 border-b rounded-t">
          <h3 className="text-xl font-semibold text-amber-800">
           Reports de Pagos
          </h3>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  {Object.keys(data[0]).map((key) => (
                    <th key={key} scope="col" className="px-6 py-3 cursor-pointer" onClick={() => sortData(key)}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                      {sortConfig.key === key && (
                        <span className="ml-1">
                          {sortConfig.direction === 'ascending' ? '▲' : '▼'}
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.id} className="bg-white border-b hover:bg-gray-50">
                    {Object.values(row).map((value, index) => (
                      <td key={index} className="px-6 py-4">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 rounded-b">
          <button className="text-white bg-amber-600 hover:bg-amber-700 focus:ring-4 focus:ring-amber-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Acción Adicional
          </button>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}