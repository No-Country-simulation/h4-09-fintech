import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import Login from './views/auth/Login/Login'
import Register from './views/auth/Register/Register'
import Onboarding from './views/Onboarding/Onboarding'
import Error from "./views/Error/ErrorPage"
import Profile from './views/Profile/Profile'
import EditProfile from './views/EditProfile/EditProfile'
import Configurations from './views/Configurations/Configurations'
import Auth from './views/auth/Auth/Auth'
import Landing from './views/Landing/Landing'

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path='/' element={<Landing />} />
				{/* rutas anidadas dentro de "/auth"  */}
				<Route path='/auth/'>
					<Route index element={<Auth />} />
					<Route path='login' element={<Login />} />
					<Route path='register' element={<Register />} />
				</Route>
				<Route path='/onboarding' element={<Onboarding />} />
				<Route path='/*' element={<Error/>} />
				<Route path='/profile' element={<Profile/>} />
				<Route path='/editprofile' element={<EditProfile/>} />
				<Route path='configurations' element={<Configurations/>} />
			</Routes>
			<Footer />
		</>
	)
}
export default App
