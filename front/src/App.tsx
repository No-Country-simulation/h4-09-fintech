// import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import Home from './views/Home/Home'
import Login from './views/Login/Login'
import Register from './views/Register/Register'

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
			</Routes>
			<Footer />
		</>
	)
}
export default App
