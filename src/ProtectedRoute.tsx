import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from './context/UserContext';
import Navbar from './components/navbar/Navbar';
import Spinner from './components/Spiner';
import Logo from './assets/icons/Logo';
import { usePagos } from './context/PagosContext';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useCuentaBanco } from './context/CuentaBancoContext';

export default function ProtectedRoute() {
  const { user, loading, message: messageUser, setMessage: setMessageUser } = useUser();
  const { message, setMessage, setMessageError, messageError, loading: loadingPagos } = usePagos();
  const {
    cuentaMessage,
    setCuentaMessage,
    cuentaMessageError,
    setCuentaMessageError,
    loading: loadingCuenta,
  } = useCuentaBanco();
  useEffect(() => {
    if (message) {
      toast.success(message);
      setMessage('');
    }
  }, [message]);
  console.log(loadingCuenta, loadingPagos);
  useEffect(() => {
    if (messageError) {
      toast.error(messageError);
      setMessageError('');
    }
  }, [messageError]);

  useEffect(() => {
    if (messageUser) {
      toast.success(messageUser);
      setMessageUser('');
    }
  }, [messageUser]);

  useEffect(() => {
    if (cuentaMessageError) {
      toast.error(cuentaMessageError);
      setCuentaMessageError('');
    }
  }, [cuentaMessageError]);

  useEffect(() => {
    if (cuentaMessage) {
      toast.success(cuentaMessage);
      setCuentaMessage('');
    }
  }, [cuentaMessage]);

  return loading ? (
    <div className="w-full bg-[rgba(0,72,178,1)] h-screen flex  flex-col gap-8 justify-center items-center">
      {' '}
      <Logo />
      <Spinner />
    </div>
  ) : user ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to={'/login'} />
  );
}
