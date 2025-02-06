import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from './context/UserContext';

export default function PublicRoutes() {
  const { user, loading } = useUser();

  if (!loading) <div>Cargando...</div>;
  return !user ? <Outlet /> : <Navigate to={'/dashboard'} />;
}
