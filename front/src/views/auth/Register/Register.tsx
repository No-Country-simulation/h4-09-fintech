import { useState } from 'react'
import axios from 'axios'
import { validateRegister } from '../../../helpers/validations'
import styles from './register.module.css'
import { baseUrl } from '../../../config/envs'
import Spinner from '../../../components/spiner/Spiner'
import { Link } from 'react-router-dom'

export interface IUserData {
	email: string
	username: string
	password: string
}

export default function Register() {
	const [errors, setErrors] = useState({
		email: '',
		username: '',
		password: ''
	})
	const [isLoading, setIsLoading] = useState(false)
	const [userData, setUserData] = useState({
		email: '',
		username: '',
		password: ''
	})

	const handleChange = (e: { target: { name: string; value: string } }) => {
		const { name, value } = e.target

		setUserData((user) => ({
			...user,
			[name]: value
		}))

		// Validar solo el campo que se está modificando
		const fieldErrors: { [key: string]: string } = validateRegister({ ...userData, [name]: value }, name)
		setErrors((prevErrors) => ({
			...prevErrors,
			[name]: fieldErrors[name] || ''
		}))
	}

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault()
		setIsLoading(true)
		// prueba
		console.log(`Correo electrónico: ${userData.email}\n`, `Nombre de usuario: ${userData.username}\n`, `Contraseña: ${userData.password}`)
		// //! enviar info al backend
		try {
			await axios.post(`${baseUrl}/users/register`, userData)
			alert('Registro exitoso')
			setUserData({
				email: '',
				username: '',
				password: ''
			})
		} catch (error: unknown) {
			if (axios.isAxiosError(error) && error.response) {
				console.log(error.response.data)
			} else {
				console.error(error)
			}
			alert('Usuario o contraseña invalidos')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className={styles.registerview}>
			<h1>Registro</h1>
			<p>Todos los campos son obligatorios</p>
			<form className={styles.registerForm} onSubmit={handleSubmit}>
				<div className={styles.labelInput}>
					<label htmlFor='username'></label>
					<input type='text' id='usernameLogin' name='username' required value={userData.username} onChange={handleChange} placeholder='Nombre de usuario' />
					{errors.username && <small style={{ color: 'red' }}>{errors.username}</small>}
				</div>
				<div className={styles.labelInput}>
					<label htmlFor='email'></label>
					<input type='email' id='email' name='email' required value={userData.email} onChange={handleChange} placeholder='Email' />
					{errors.email && <small style={{ color: 'red' }}>{errors.email}</small>}
				</div>
				<div className={styles.labelInput}>
					<label htmlFor='password'></label>
					<input type='password' id='passwordLogin' name='password' required value={userData.password} onChange={handleChange} placeholder='Contraseña' />
					{errors.password && <small style={{ color: 'red' }}>{errors.password}</small>}
				</div>

				{isLoading ? (
					<button type='button' className={styles.buttonEnabled} disabled>
						<Spinner />
					</button>
				) : (
					<button
						className={
							Object.values(errors).some((error) => error) || // Verifica si hay algún error
							Object.values(userData).some((value) => value.trim() === '') // Verifica si algún campo está vacío
								? styles.buttonDisabled
								: styles.buttonEnabled
						}
						type='submit'
						disabled={
							Object.values(errors).some((error) => error) || // Verifica si hay algún error
							Object.values(userData).some((value) => value.trim() === '') // Verifica si algún campo está vacío
						}
					>
						Registrarme
					</button>
				)}
			</form>
			<div className={styles.registerdiv}>
				<p>Si ya tenes una cuenta: </p>
				<Link to='/auth/login'>Logueate acá</Link>
			</div>
		</div>
	)
}
