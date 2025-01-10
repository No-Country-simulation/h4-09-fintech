// import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import Home from './views/Home/Home'
import Login from './views/auth/Login/Login'
import Register from './views/auth/Register/Register'
import Onboarding from './views/Onboarding/Onboarding'
import Error from "./views/Error/ErrorPage"

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />} />
				{/* rutas anidadas dentro de "/auth"  */}
				<Route path='/auth/'>
					<Route index element={<Login />} />
					<Route path='login' element={<Login />} />
					<Route path='register' element={<Register />} />
				</Route>
				<Route path='/onboarding' element={<Onboarding />} />
				<Route path='/*' element={<Error/>} />
			</Routes>
			<Footer />
		</>
	)
}
export default App
