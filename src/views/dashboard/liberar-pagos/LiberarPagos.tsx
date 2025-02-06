import { useEffect, useState } from 'react';
import { PagoLibProps, ResponseRetiros, usePagos } from '../../../context/PagosContext';

const pagos: PagoLibProps[] = [
  {
    id: '1',
    userId: '1001',
    name: 'Juan',
    lastName: 'Pérez',
    dni: '30123456',
    monto: 5000,
    fecha: '2024-02-05',
    status: 'pendiente',
    cbu: '0123456789012345678901',
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
    cbu: '0987654321098765432109',
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
    cbu: '1234567890123456789012',
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
    cbu: '9876543210987654321098',
  },
];

const LiberarPagos = () => {
  const [retirosState, setRetirosState] = useState<ResponseRetiros[]>([]);
  const [retirosFiltrados, SetRetirosFiltrados] = useState<ResponseRetiros[]>([]);
  const [status, setStatus] = useState<string>('PENDIENTE');
  const { retiros, fetchRetiros } = usePagos();
  useEffect(() => {
    fetchRetiros();
  }, []);

  useEffect(() => {
    setRetirosState(retiros);
    SetRetirosFiltrados(retiros.filter((pago) => pago.status === 'PENDIENTE'));
  }, [retiros]);

  const filtrarPagos = (status: string) => {
    setStatus(status);
    const retirosFiltrados = retirosState.filter((pago) => pago.status === status);
    SetRetirosFiltrados(retirosFiltrados);
  };
  const liberarPago = (id: string) => {
    console.log(id);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Aprobar pagos</h1>
        <div className="flex items-center gap-2">
          <h3 className="font-bold">Filtrar pagos</h3>
          <select
            name="status"
            onChange={(e) => filtrarPagos(e.target.value)}
            className="border rounded px-3 py-1"
          >
            <option value="pendiente">Pendiente</option>
            <option value="aprobado">Aprobado</option>
            <option value="rechazado">Rechazado</option>
          </select>
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
              <th className="border p-3">Email</th>
              <th className="border p-3">Monto</th>
              <th className="border p-3">Fecha Solicitud</th>
              <th className="border p-3">Fecha Respuesta</th>
              <th className="border p-3">Estado</th>
              <th className="border p-3">CBU</th>
              <th className="border p-3">Acción</th>
            </tr>
          </thead>
          <tbody>
            {retirosFiltrados.length > 0 ? (
              retirosFiltrados.map((pago) => (
                <tr key={pago.retiroId} className="hover:bg-gray-50">
                  <td className="border p-3 text-center">{pago.retiroId}</td>
                  <td className="border p-3 text-center">{pago.userId}</td>
                  <td className="border p-3">{pago.name}</td>
                  <td className="border p-3">{pago.lastName}</td>
                  <td className="border p-3 text-center">{pago.email}</td>
                  <td className="border p-3 text-right">${pago.monto}</td>
                  <td className="border p-3 text-center">{pago.fechaDeposito}</td>
                  <td className="border p-3 text-center">
                    {pago.fechaEntrega ? pago.fechaEntrega : '-'}
                  </td>
                  <td
                    className={`border p-3 text-center font-semibold ${
                      pago.status === 'APROBADO'
                        ? 'text-green-600'
                        : pago.status === 'PENDIENTE'
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}
                  >
                    {pago.status}
                  </td>
                  <td className="border p-3 text-center">{pago.cbu}</td>
                  <td className="border p-3 text-center">
                    {pago.status === 'PENDIENTE' && (
                      <button
                        onClick={() => liberarPago(pago.userId)}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                      >
                        Aprobar
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="border p-3 text-center">
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

export default LiberarPagos;
