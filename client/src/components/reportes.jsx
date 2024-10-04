import React, { useState } from 'react';

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
    <div className="min-h-screen bg-gradient-to-br from-amber-700 to-orange-400 p-8">
      <div className="max-w-4xl mx-auto bg-white border border-4 rounded-lg shadow relative">
        <div className="flex items-center justify-between p-5 border-b rounded-t">
          <h3 className="text-xl font-semibold text-amber-800">
            DataGrid Ejemplo
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
  );
}