import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from './contexts/UserContext';


export default function PublicRoutes() {
	const {user,loading} = useUser();
	return !user && !loading 
            ?  <Outlet />
            : (user && !loading) && user.onboardingComplete ? 
            <Navigate to={'/dashboard'} /> 
            : <Navigate to={'/onboarding'} />
            ;
}