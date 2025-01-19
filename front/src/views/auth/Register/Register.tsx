/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import axios from 'axios'
import { validateRegister } from '../../../helpers/validations'
import styles from '../Auth/auth.module.css'
import { baseUrl } from '../../../config/envs'
import Spinner from '../../../components/spiner/Spiner'
import { Link, useNavigate } from 'react-router-dom'
// import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import Cookies from 'js-cookie'
import IupiSmallIcon from '../../../assets/icons/(iupi)/IupiSmallIcon'
import Eyeicon from '../../../assets/icons/Eyeicon'
import SlashEyeIcon from '../../../assets/icons/SlashEyeIcon'

export interface IUserData {
	name: string
	lastName: string
	email: string
	password: string
	confirmPassword: string
}

export default function Register() {
	const navigate = useNavigate()
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const [errors, setErrors] = useState({
		name: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: ''
	})
	const [isLoading, setIsLoading] = useState(false)
	const [userData, setUserData] = useState({
		name: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: ''
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, checked, type } = e.target
		const fieldValue = type === 'checkbox' ? checked : value
		setUserData((user) => ({
			...user,
			[name]: fieldValue
		}))

		// Solo validamos campos que no son booleanos
		if (type !== 'checkbox') {
			const fieldErrors = validateRegister({ ...userData, [name]: fieldValue }, name)
			setErrors((prevErrors) => ({
				...prevErrors,
				[name]: fieldErrors[name] || ''
			}))
		}
	}

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault()
		setIsLoading(true)
		// Validar que las contraseñas coincidan
		if (userData.password !== userData.confirmPassword) {
			alert('Las contraseñas no coinciden')
			setIsLoading(false)
			return
		}
		const { confirmPassword, ...userDataToSend } = userData

		try {
			const response = await axios.post(`${baseUrl}/api/auth/register`, userDataToSend)
			const token = response.data.token
			console.log(token) // control
			Cookies.set('authToken', token, { expires: 7 })
			alert('Registro exitoso')
			setUserData({
				name: '',
				lastName: '',
				email: '',
				password: '',
				confirmPassword: ''
			})
			navigate('/onboarding')
		} catch (error: unknown) {
			if (axios.isAxiosError(error) && error.response) {
				console.log(error.response.data)
			} else {
				console.error(error)
			}
			alert('Hubo un error al registrarte')
		} finally {
			setIsLoading(false)
		}
	}

	// const googleRegister = (response: CredentialResponse) => {
	// 	//TODO enviar esta respuesta al back
	// 	console.log(response)
	// }

	return (
		<div className={styles.pageview}>
			<form className={styles.registerForm} onSubmit={handleSubmit}>
				<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
					<Link to={'/auth'}> Volver</Link>
					<IupiSmallIcon />
				</div>
				<h5>Regístrate y da el primer paso hacia tu libertad financiera.</h5>
				<small>En IUPI, convertir tus metas en logros es sencillo. crea tu cuenta y ahorrar y crece en confianza.</small>
				<div className={styles.labelInput}>
					<label htmlFor='name'>Nombre</label>
					<input type='text' id='nameLogin' name='name' required value={userData.name} onChange={handleChange} placeholder='Tu nombre' />
					{errors.name && <small style={{ color: 'red' }}>{errors.name}</small>}
				</div>
				<div className={styles.labelInput}>
					<label htmlFor='lastName'>Apellido</label>
					<input type='text' id='lastNameLogin' name='lastName' required value={userData.lastName} onChange={handleChange} placeholder='Tu apellido' />
					{errors.lastName && <small style={{ color: 'red' }}>{errors.lastName}</small>}
				</div>
				<div className={styles.labelInput}>
					<label htmlFor='email'>Correo electrónico</label>
					<input type='email' id='email' name='email' required value={userData.email} onChange={handleChange} placeholder='ejemplo@mail.com' />
					{errors.email && <small style={{ color: 'red' }}>{errors.email}</small>}
				</div>
				<div className={styles.labelInput}>
					<label htmlFor='password'>Contraseña</label>
					<div className={styles.passwordContainer}>
						<input type={showPassword ? 'text' : 'password'} id='passwordLogin' name='password' required value={userData.password} onChange={handleChange} placeholder='*******' />
						<button type='button' onClick={() => setShowPassword((prev) => !prev)} className={styles.showPasswordButton}>
							{showPassword ? <Eyeicon /> : <SlashEyeIcon />}
						</button>
					</div>
					{errors.password && <small style={{ color: 'red', textWrap: 'wrap' }}>{errors.password}</small>}
				</div>

				<div className={styles.labelInput}>
					<label htmlFor='confirmPassword'>Confirmar contraseña</label>
					<div className={styles.passwordContainer}>
						<input
							type={showConfirmPassword ? 'text' : 'password'}
							id='confirmPassword'
							name='confirmPassword'
							required
							value={userData.confirmPassword}
							onChange={handleChange}
							placeholder='*******'
						/>
						<button type='button' onClick={() => setShowConfirmPassword((prev) => !prev)} className={styles.showPasswordButton}>
							{showConfirmPassword ? <Eyeicon /> : <SlashEyeIcon />}
						</button>
					</div>
					{errors.confirmPassword && <small style={{ color: 'red' }}>{errors.confirmPassword}</small>}
				</div>

				{isLoading ? (
					<button type='button' className={styles.buttonEnabled} disabled>
						<Spinner />
					</button>
				) : (
					<button
						className={
							Object.values(errors).some((error) => error) || // Verifica si hay algún error
							Object.values(userData).some((value) => typeof value === 'string' && value.trim() === '') // Verifica si algún campo está vacío
								? styles.buttonDisabled
								: styles.buttonEnabled
						}
						type='submit'
						disabled={
							Object.values(errors).some((error) => error) || // Verifica si hay algún error
							Object.values(userData).some((value) => typeof value === 'string' && value.trim() === '') // Verifica si algún campo está vacío
						}
					>
						Crear mi cuenta
					</button>
				)}
				{/* <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
					<span style={{ color: '#ffffff' }}> o </span>
					<GoogleLogin onSuccess={googleRegister} onError={() => console.log('error')} />
				</div> */}
				<div className={styles.registerdiv}>
					<span>¿Ya tienes una cuenta? </span>
					<Link to='/auth/login'>Iniciar sesión</Link>
				</div>
				<small>
					Al iniciar aceptas las <Link to={'#'}> condiciones del servicio de iupi.</Link> Nos tomamos muy en serio tu privacidad. Para mas información lee nuestra{' '}
					<Link to={'#'}>Política de privacidad.</Link>
				</small>
			</form>
		</div>
	)
}
