import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from './contexts/UserContext';


export default function PublicRoutes() {
	const {user,loading} = useUser();
    console.log('user', user);
    console.log('loading', loading);
  
    if (loading) {
        return <div className=''>  </div>;
    }
    
	return !user 
            ?  <Outlet />
            : user && user.onboardingComplete ? 
            <Navigate to={'/dashboard'} /> 
            : <Navigate to={'/onboarding'} />
            ;
}