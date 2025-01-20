// import { setUser } from '../../../redux/userSlice'
// import { useAppDispatch } from '../../../redux/storehooks'
import { useState } from 'react'
import styles from '../Auth/auth.module.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { baseUrl } from '../../../config/envs'
import Spiner from '../../../components/spiner/Spiner'
// import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import Cookies from 'js-cookie'
import IupiSmallIcon from '../../../assets/icons/(iupi)/IupiSmallIcon'
import Eyeicon from '../../../assets/icons/Eyeicon'
import SlashEyeIcon from '../../../assets/icons/SlashEyeIcon'
import GoBackIcon from '../../../assets/icons/GoBackIcon'

export default function Login() {
	const navigate = useNavigate()
	//usar esto para obtener el estado global user
	// const dispatch = useAppDispatch()
	const [showPassword, setShowPassword] = useState(false)
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
	// useEffect(() => {
	// 	const user = localStorage.getItem('user')
	// 	if (user) {
	// 		console.log(user)

	// 		dispatch(setUser(JSON.parse(user)))
	// 	} else {
	// 		console.log('no hay usuario en localstorage')
	// 	}
	// }, [dispatch])

	//funcion que hace login y lo guarda en estado global y localstorage
	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault()
		setIsLoading(true)

		try {
			const response = await axios.post(`${baseUrl}/api/auth/login`, loginData)
			const token = response.data.token
			console.log(token) // control
			Cookies.set('authToken', token, { expires: 1 })
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

	// const googleLogin = (response: CredentialResponse) => {
	// 	//TODO enviar esta respuesta al back
	// 	console.log(response)
	// }

	return (
		<div className={styles.pageview}>
			<form className={styles.registerForm} onSubmit={handleSubmit}>
				<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
					<Link to={'/auth'}>
						{' '}
						<GoBackIcon />
					</Link>
					<IupiSmallIcon />
				</div>
				<h5 className='body2'>Logueate y continúa el camino hacia tu libertad financiera.</h5>
				<div className={styles.labelInput}>
					<label htmlFor='email' className='inputLabel'>
						Email
					</label>
					<input type='email' id='email' name='email' required value={loginData.email} onChange={handleChange} placeholder='ejemplo@mail.com' />
				</div>
				<div className={styles.labelInput}>
					<label htmlFor='password' className='inputLabel'>
						Contraseña
					</label>
					<div className={styles.passwordContainer}>
						<input type={showPassword ? 'text' : 'password'} id='passwordLogin' name='password' required value={loginData.password} onChange={handleChange} placeholder='*******' />
						<button type='button' onClick={() => setShowPassword((prev) => !prev)} className={styles.showPasswordButton}>
							{showPassword ? <Eyeicon /> : <SlashEyeIcon />}
						</button>
					</div>
					{/* {errors.password && <small style={{ color: 'red', textWrap: 'wrap' }}>{errors.password}</small>} */}
				</div>
				{isLoading ? (
					<button type='button' className={styles.buttonEnabled} disabled>
						<Spiner />
					</button>
				) : (
					<>
						{loginData.email === '' || loginData.password === '' ? (
							<button className={styles.buttonDisabled} type='submit' disabled>
								Iniciar sesión
							</button>
						) : (
							<button className={styles.buttonEnabled} type='submit'>
								Iniciar sesión
							</button>
						)}
					</>
				)}
				<Link to='#'>Olvidé mi contraseña</Link>
				<div className={styles.registerdiv}>
					<span>No tenés una cuenta? </span>
					<Link to='/auth/register'>Registrate acá</Link>
				</div>
				{/* <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
					<span style={{ color: '#ffffff' }}> o </span>
					<GoogleLogin onSuccess={googleLogin} onError={() => console.log('error')} text='continue_with' />
				</div> */}
			</form>
		</div>
	)
}
