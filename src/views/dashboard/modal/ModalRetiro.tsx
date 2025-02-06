import { CircleX } from 'lucide-react';
import { ResponseRetiros, usePagos } from '../../../context/PagosContext';
import Spinner from '../../../components/Spiner';

interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  retiroSelect: ResponseRetiros | null;
}

const ModalRetiro = ({ setShowModal, retiroSelect }: Props) => {
  const { updateRetiro, loading } = usePagos();
  const handleUpdateStatus = async (status: 'APROBADO' | 'RECHAZADO') => {
    await updateRetiro(retiroSelect?.retiroId!, status, retiroSelect?.userId!);

    setShowModal(false);
  };

  return (
    <div className="fixed z-10 inset-0 animate-scale-up  overflow-y-auto ">
      <div className="flex items-center justify-center min-h-screen  ">
        <div
          className="fixed inset-0 backdrop-blur-sm bg-opacity-70 transition-opacity"
          onClick={() => setShowModal(false)}
        ></div>
        <div className="bg-[#f7f7f7] w-[95%] min-h-[50vh] md:min-h-[40vh] max-h-[80vh] rounded-xl overflow-y-scroll shadow-xl transform transition-all sm:max-w-lg sm:w-full py-6 px-8 flex flex-col justify-between border-2 relative ">
          <div
            className="absolute top-2 left-2 cursor-pointer hover:scale-105 transition-transform "
            onClick={() => setShowModal(false)}
          >
            <CircleX className="w-10 h-10 " />
          </div>
          <div className="flex flex-col gap-3 mb-4 w-[100%]">
            <h2 className="text-3xl  text-center">
              Deposito de:{' '}
              <span className="font-bold">
                {retiroSelect?.name} - {retiroSelect?.lastName}
              </span>
            </h2>
            <div className="mt-4 flex justify-between items-center w-full ">
              <label className="block text-sm font-medium text-gray-700">Email del cliente:</label>
              <div className="">
                <p className="text-xs">
                  {' '}
                  <span className="font-bold">{retiroSelect?.email}</span>
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center w-full ">
              <label className="block text-sm font-medium text-gray-700">Monto a retirar:</label>
              <div className="">
                <p className="text-2xl">
                  {' '}
                  <span className="">ARS</span> - {retiroSelect?.monto}
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center w-full ">
              <label className="block text-sm font-medium text-gray-700">
                Fecha de la solicitud retiro:
              </label>
              <div className="">
                <p className="text-2xl">
                  {' '}
                  <span className="">{retiroSelect?.fechaDeposito}</span>
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center w-full ">
              <label className="block text-sm font-medium text-gray-700">Id del retiro:</label>
              <div className="">
                <p className="text-xs">
                  {' '}
                  <span className="font-bold">{retiroSelect?.retiroId}</span>
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center w-full ">
              <label className="block text-sm font-medium text-gray-700">Cbu del cliente:</label>
              <div className="">
                <p className="text-xs">
                  {' '}
                  <span className="font-bold">{retiroSelect?.cbu}</span>
                </p>
              </div>
            </div>
            <div className="w-full h-14 flex items-center gap-2 mt-4 relative ">
              {loading && (
                <div className="w-full h-full flex justify-center items-center backdrop-blur-sm absolute opacity-90">
                  <Spinner />
                </div>
              )}
              <button
                className="w-full h-[80%]  bg-red-500 rounded-md text-white font-bold"
                onClick={() => handleUpdateStatus('RECHAZADO')}
              >
                Rechazar
              </button>
              <button
                className="w-full h-[80%]  bg-[#577fd6] rounded-md text-white font-bold"
                onClick={() => handleUpdateStatus('APROBADO')}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalRetiro;
