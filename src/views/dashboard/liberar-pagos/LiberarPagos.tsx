import { useEffect, useState } from 'react';
import { ResponseRetiros, usePagos } from '../../../context/PagosContext';
import ModalRetiro from '../modal/ModalRetiro';

const LiberarPagos = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [retiroSelect, setRetiroSelect] = useState<ResponseRetiros | null>(null);
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

  return (
    <div className="p-6">
      {showModal && <ModalRetiro setShowModal={setShowModal} retiroSelect={retiroSelect} />}
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Aprobar pagos</h1>
        <div className="flex items-center gap-2">
          <h3 className="font-bold">Filtrar pagos</h3>
          <select
            name="status"
            onChange={(e) => filtrarPagos(e.target.value)}
            className="border rounded px-3 py-1"
          >
            <option value="PENDIENTE">Pendiente</option>
            <option value="APROBADO">Aprobado</option>
            <option value="RECHAZADO">Rechazado</option>
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
                        onClick={() => {
                          setRetiroSelect(pago);
                          setShowModal(!showModal);
                        }}
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
                <td colSpan={11} className="border p-3 text-center">
                  No hay pagos {status.toLowerCase()} registrados
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
