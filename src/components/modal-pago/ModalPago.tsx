import { CircleX } from 'lucide-react';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCuentaBanco } from '../../context/CuentaBancoContext';
import Logo from '../../assets/icons/Logo';
import Spinner from '../Spiner';

interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
interface form {
  alias: string;
  cbu: string;
  cuit: string;
  titular: string;
}

const ModalPago = ({ setShowModal }: Props) => {
  const { cuenta, fetchCuenta, updateCuenta, loading } = useCuentaBanco();
  const [defaultValues] = useState<form>({
    alias: '',
    cbu: '',
    cuit: '',
    titular: '',
  });

  useEffect(() => {
    fetchCuenta();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<form>({
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (cuenta) {
      const newForm = {
        alias: cuenta.alias,
        cbu: cuenta.cbu,
        cuit: cuenta.cuit,
        titular: cuenta.titular,
      };
      reset(newForm);
    } else {
      reset(defaultValues);
    }
  }, [cuenta]); // Se ejecuta cuando cambia `hay`

  const onSubmit = (data: form) => {
    updateCuenta(data, cuenta?.id!);
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
          {loading ? (
            <div className="w-full backdrop-blur-sm h-screen flex  flex-col gap-8 justify-center items-center">
              {' '}
              <Logo />
              <Spinner />
            </div>
          ) : (
            <div className="flex flex-col gap-3 mb-4 w-[100%]">
              <div className="pt-8 text-center">
                <div className="text-4xl font-bold pb-4">
                  <h2>Actualizar metodo de pago</h2>
                </div>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg space-y-4"
                >
                  <div>
                    <label htmlFor="alias" className="block text-gray-700 font-medium">
                      Alias:
                    </label>
                    <input
                      type="text"
                      id="alias"
                      placeholder="Alias"
                      {...register('alias', { required: 'El alias es obligatorio' })}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.alias && <p className="text-red-500 text-sm">{errors.alias.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="cbu" className="block text-gray-700 font-medium">
                      CBU:
                    </label>
                    <input
                      type="text"
                      id="cbu"
                      placeholder="CBU"
                      {...register('cbu', {
                        required: 'El CBU es obligatorio',
                        minLength: { value: 22, message: 'El CBU debe tener 22 dígitos' },
                      })}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.cbu && <p className="text-red-500 text-sm">{errors.cbu.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="cuit" className="block text-gray-700 font-medium">
                      CUIT:
                    </label>
                    <input
                      type="text"
                      id="cuit"
                      placeholder="CUIT"
                      {...register('cuit', {
                        required: 'El CUIT es obligatorio',
                        pattern: {
                          value: /^[0-9]{11}$/,
                          message: 'El CUIT debe tener 11 dígitos numéricos',
                        },
                      })}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.cuit && <p className="text-red-500 text-sm">{errors.cuit.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="titular" className="block text-gray-700 font-medium">
                      Titular de la cuenta:
                    </label>
                    <input
                      type="text"
                      id="titular"
                      placeholder="Titular de la cuenta"
                      {...register('titular', { required: 'El titular es obligatorio' })}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.titular && (
                      <p className="text-red-500 text-sm">{errors.titular.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Enviar
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalPago;
