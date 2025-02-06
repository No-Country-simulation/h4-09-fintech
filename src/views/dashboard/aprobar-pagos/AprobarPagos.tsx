import { useEffect, useState } from 'react';
import { ResponseDepositos, usePagos } from '../../../context/PagosContext';
import Modal from '../modal/ModalDeposito';
import Logo from '../../../assets/icons/Logo';
import Spinner from '../../../components/Spiner';

// const pagos: PagoAprobProps[] = [
//   {
//     id: '1',
//     userId: '1001',
//     name: 'Pedro',
//     lastName: 'Perez',
//     dni: '30123456',
//     monto: 5000,
//     fecha: '2024-02-05',
//     status: 'aprobado',
//     concepto: 'Mensualidad gimnasio',
//     comprobante:
//       'https://imgv2-1-f.scribdassets.com/img/document/508917096/original/26d2c2968c/1?v=1',
//   },
//   {
//     id: '2',
//     userId: '1002',
//     name: 'Pedro',
//     lastName: 'Perez',
//     dni: '40123456',
//     monto: 7500,
//     fecha: '2024-02-03',
//     status: 'pendiente',
//     concepto: 'Clases de natación',
//     comprobante:
//       'https://imgv2-1-f.scribdassets.com/img/document/508917096/original/26d2c2968c/1?v=1',
//   },
//   {
//     id: '3',
//     userId: '1003',
//     name: 'Pedro',
//     lastName: 'Perez',
//     dni: '50123456',
//     monto: 3000,
//     fecha: '2024-02-01',
//     status: 'rechazado',
//     concepto: 'Entrenamiento personal',
//     comprobante:
//       'https://imgv2-1-f.scribdassets.com/img/document/508917096/original/26d2c2968c/1?v=1',
//   },
// ];

const AprobarPagos = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [depositoSelect, setDepositoSelect] = useState<ResponseDepositos | null>(null);
  const [depositosState, setDepositosState] = useState<ResponseDepositos[]>([]);
  const [depositosFiltrados, SetDepositosFiltrados] = useState<ResponseDepositos[]>([]);
  const [status, setStatus] = useState<string>('PENDIENTE');
  const { depositos, fetchDepositos, loading } = usePagos();
  useEffect(() => {
    fetchDepositos();
    setDepositosState(depositos);
  }, []);

  useEffect(() => {
    setDepositosState(depositos);
    SetDepositosFiltrados(depositos.filter((pago) => pago.status === 'PENDIENTE'));
  }, [depositos]);

  const filtrarPagos = (status: string) => {
    setStatus(status);
    const pagosFiltrados = depositosState.filter((pago) => pago.status === status);
    SetDepositosFiltrados(pagosFiltrados);
  };
  return loading ? (
    <div className="w-full backdrop-blur-sm h-screen flex  flex-col gap-8 justify-center items-center">
      {' '}
      <Logo />
      <Spinner />
    </div>
  ) : (
    <div className="p-6">
      {showModal && <Modal setShowModal={setShowModal} depositoSelect={depositoSelect} />}
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
              <th className="border p-3">Comprobante</th>
              <th className="border p-3">Acción</th>
            </tr>
          </thead>
          <tbody>
            {depositosFiltrados.length > 0 ? (
              depositosFiltrados.map((pago) => (
                <tr key={pago.depositoId} className="hover:bg-gray-50">
                  <td className="border p-3 text-center">{pago.depositoId}</td>
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
                  <td className="border p-3 text-center">
                    <a
                      href={pago.comprobante}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Ver
                    </a>
                  </td>
                  <td className="border p-3 text-center">
                    {pago.status === 'PENDIENTE' ? (
                      <button
                        onClick={() => {
                          setDepositoSelect(pago);
                          setShowModal(true);
                        }}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                      >
                        Aprobar
                      </button>
                    ) : pago.status === 'APROBADO' ? (
                      <button className="bg-gray-500 text-white px-4 py-2 rounded" disabled>
                        Aprobado
                      </button>
                    ) : (
                      <button className="bg-gray-500 text-white px-4 py-2 rounded" disabled>
                        Rechazado
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={11} className="border p-3 text-center">
                  No hay pagos {status}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AprobarPagos;
