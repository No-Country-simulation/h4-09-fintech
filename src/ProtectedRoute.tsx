import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from './context/UserContext';
import Navbar from './components/navbar/Navbar';
import Spinner from './components/Spiner';
import Logo from './assets/icons/Logo';
import { usePagos } from './context/PagosContext';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function ProtectedRoute() {
  const { user, loading, message: messageUser, setMessage: setMessageUser } = useUser();
  const { message, setMessage, setMessageError, messageError } = usePagos();

  useEffect(() => {
    if (message) {
      toast.success(message);
      setMessage('');
    }
  }, [message]);

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
