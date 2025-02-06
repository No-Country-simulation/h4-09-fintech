import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from './context/UserContext';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function PublicRoutes() {
  const { user, loading, messageError, setMessageError } = useUser();
  useEffect(() => {
    if (messageError) {
      toast.error(messageError);
      setMessageError('');
    }
  }, [messageError]);
  if (!loading) <div>Cargando...</div>;
  return !user ? <Outlet /> : <Navigate to={'/dashboard'} />;
}
