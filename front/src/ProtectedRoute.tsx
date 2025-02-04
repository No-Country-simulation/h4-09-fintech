import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from './contexts/UserContext';
import Spinner from './components/spiner/Spiner';


export default function ProtectedRoute() {
	const {user,loading} = useUser();
    console.log(user);
	return loading ? 
    (<div className=''>  </div>) 
    : user && !loading ? <Outlet /> 
    : <Navigate to={'/auth/login'} />;
}