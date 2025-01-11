import { setUser } from '../../../redux/userSlice'
import { useAppDispatch } from '../../../redux/storehooks'
import { useEffect, useState } from 'react'
import style from './login.module.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { baseUrl } from '../../../config/envs'
import Spiner from '../../../components/spiner/Spiner'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import Cookies from 'js-cookie'

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
			console.log(user)

			dispatch(setUser(JSON.parse(user)))
		} else {
			console.log('no hay usuario en localstorage')
		}
	}, [dispatch])

	//funcion que hace login y lo guarda en estado global y localstorage
	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault()
		setIsLoading(true)

		try {
			//! enviar info al backend
			const response = await axios.post(`${baseUrl}/api/auth/login`, loginData)
			const token = response.data.token
			console.log(token) // control
			Cookies.set('authToken', token, { expires: 7 })
			// const user = response.data.user
			// dispatch(setUser(user))
			navigate('/dashboard')
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

	const googleLogin = (response: CredentialResponse) => {
		//TODO enviar esta respuesta al back
		console.log(response)
	}

	return (
		<div className={style.loginview}>
			<form className={style.registerForm} onSubmit={handleSubmit}>
				<h2>Login</h2>
				<div className={style.labelInput}>
					<label htmlFor='email'>Email</label>
					<input type='email' id='email' name='email' required value={loginData.email} onChange={handleChange} placeholder='ejemplo@mail.com' />
				</div>
				<div className={style.labelInput}>
					<label htmlFor='password'>Contraseña</label>
					<input type='password' id='password' name='password' required value={loginData.password} onChange={handleChange} placeholder='**********' />
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
				<Link to='#'>Olvidé mi contraseña</Link>
				<div className={style.registerdiv}>
					<span>No tenés una cuenta? </span>
					<Link to='/auth/register'>Registrate acá</Link>
				</div>
				<div style={{ display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
					<span style={{ color: '#ffffff' }}> o </span>
					<GoogleLogin onSuccess={googleLogin} onError={() => console.log('error')} />
				</div>
			</form>
		</div>
	)
}
