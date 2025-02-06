import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from './context/UserContext';
import Navbar from './components/navbar/Navbar';
import Spinner from './components/Spiner';
import Logo from './assets/icons/Logo';

export default function ProtectedRoute() {
  const { user, loading } = useUser();

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
