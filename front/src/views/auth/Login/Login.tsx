import { setUser } from '../../../redux/userSlice'
import { useAppDispatch } from '../../../redux/storehooks'
import { useEffect, useState } from 'react'
import style from './login.module.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { baseUrl } from '../../../config/envs'
import Spiner from '../../../components/spiner/Spiner'

export default function Login() {
	const navigate = useNavigate()
	//usar esto para obtener el estado global user
	const dispatch = useAppDispatch()

	const [loginData, setLoginData] = useState({
		email: '',
		password: ''
	})
	const [isLoading, setIsLoading] = useState(false)
	const handleChange = (e: { target: { name: string; value: string } }) => {
		const { name, value } = e.target
		setLoginData((user) => ({
			...user,
			[name]: value
		}))
	}

	//uso esto para ver si hay un usuario en el localstorage
	useEffect(() => {
		const user = localStorage.getItem('user')
		if (user) {
			dispatch(setUser(JSON.parse(user)))
		}
	}, [dispatch])

	//funcion que hace login y lo guarda en estado global y localstorage
	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault()
		setIsLoading(true)
		console.log(loginData)

		try {
			//! enviar info al backend
			const response = await axios.post(`${baseUrl}/users/login`, loginData)
			// console.log(response.data) // control
			const user = response.data.user
			dispatch(setUser(user))
			navigate('/')
			alert('Login exitoso')
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				console.error(error.response.data)
			} else {
				console.error(error)
			}
			alert('Usuario o contraseña invalidos')
		} finally {
			setIsLoading(false)
		}
	}

	//funcion que hace logout y lo borra del estado global y localstorage
	// const handlelogout = () => {
	// 	dispatch(logout())
	// 	localStorage.removeItem('user')
	// }

	return (
		<div className={style.loginview}>
			<h1>Login</h1>
			<form className={style.registerForm} onSubmit={handleSubmit}>
				<div className={style.labelInput}>
					<label htmlFor='email'></label>
					<input type='email' id='email' name='email' required value={loginData.email} onChange={handleChange} placeholder='Email' />
				</div>
				<div className={style.labelInput}>
					<label htmlFor='password'></label>
					<input type='password' id='password' name='password' required value={loginData.password} onChange={handleChange} placeholder='Contraseña' />
				</div>
				{isLoading ? (
					<button type='button' className={style.buttonEnabled} disabled>
						<Spiner />
					</button>
				) : (
					<>
						{loginData.email === '' || loginData.password === '' ? (
							<button className={style.buttonDisabled} type='submit' disabled>
								Iniciar sesión
							</button>
						) : (
							<button className={style.buttonEnabled} type='submit'>
								Iniciar sesión
							</button>
						)}
					</>
				)}
			</form>
			<div className={style.registerdiv}>
				<p>Si todavia no tienes una cuenta: </p>
				<Link to='/auth/register'>Registrate acá</Link>
			</div>
		</div>
	)
}
