import { useState } from 'react';
import { HistorialPagosProps } from '../../../context/PagosContext';

const historialPagos: HistorialPagosProps[] = [
  {
    id: '1',
    userId: '1001',
    name: 'Juan',
    lastName: 'Pérez',
    dni: '30123456',
    monto: 5000,
    fecha: '2024-02-05',
    status: 'pendiente',
    tipo: 'retiro',
  },
  {
    id: '2',
    userId: '1002',
    name: 'María',
    lastName: 'Gómez',
    dni: '31234567',
    monto: 7000,
    fecha: '2024-02-04',
    status: 'aprobado',
    tipo: 'deposito',
  },
  {
    id: '3',
    userId: '1003',
    name: 'Carlos',
    lastName: 'López',
    dni: '32345678',
    monto: 6000,
    fecha: '2024-02-03',
    status: 'rechazado',
    tipo: 'retiro',
  },
  {
    id: '4',
    userId: '1004',
    name: 'Ana',
    lastName: 'Martínez',
    dni: '33456789',
    monto: 4500,
    fecha: '2024-02-02',
    status: 'pendiente',
    tipo: 'deposito',
  },
];

const HistorialPagos = () => {
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [tipoFilter, setTipoFilter] = useState<string>('');

  const pagosFiltrados = historialPagos.filter(
    (pago) =>
      (statusFilter ? pago.status === statusFilter : true) &&
      (tipoFilter ? pago.tipo === tipoFilter : true)
  );

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Historial de Pagos</h1>
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <label className="font-bold">Filtrar por Estado</label>
            <select
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border rounded p-2"
            >
              <option value="">Todos</option>
              <option value="pendiente">Pendiente</option>
              <option value="aprobado">Aprobado</option>
              <option value="rechazado">Rechazado</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="font-bold">Filtrar por Tipo</label>
            <select onChange={(e) => setTipoFilter(e.target.value)} className="border rounded p-2">
              <option value="">Todos</option>
              <option value="retiro">Retiro</option>
              <option value="deposito">Depósito</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 shadow-lg bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3">ID</th>
              <th className="border p-3">Usuario ID</th>
              <th className="border p-3">Nombre</th>
              <th className="border p-3">Apellido</th>
              <th className="border p-3">DNI</th>
              <th className="border p-3">Monto</th>
              <th className="border p-3">Fecha</th>
              <th className="border p-3">Estado</th>
              <th className="border p-3">Tipo</th>
            </tr>
          </thead>
          <tbody>
            {pagosFiltrados.length > 0 ? (
              pagosFiltrados.map((pago) => (
                <tr key={pago.id} className="hover:bg-gray-50">
                  <td className="border p-3 text-center">{pago.id}</td>
                  <td className="border p-3 text-center">{pago.userId}</td>
                  <td className="border p-3">{pago.name}</td>
                  <td className="border p-3">{pago.lastName}</td>
                  <td className="border p-3 text-center">{pago.dni}</td>
                  <td className="border p-3 text-right">${pago.monto}</td>
                  <td className="border p-3 text-center">{pago.fecha}</td>
                  <td
                    className={`border p-3 text-center font-semibold ${
                      pago.status === 'aprobado'
                        ? 'text-green-600'
                        : pago.status === 'pendiente'
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}
                  >
                    {pago.status}
                  </td>
                  <td className="border p-3 text-center capitalize">{pago.tipo}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="border p-3 text-center">
                  No hay pagos registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistorialPagos;
