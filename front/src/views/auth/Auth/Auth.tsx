import { Link, useNavigate } from 'react-router-dom'
import AuthIcon from '../../../assets/icons/AuthIcon'
import style from './auth.module.css'
import Line from '../../../assets/Line'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import Cookies from 'js-cookie'
// import { useEffect } from 'react'
import axios from 'axios'
import { baseUrl } from '../../../config/envs'

export default function Auth() {
	const navigate = useNavigate()
	const googleLogin = async (response: CredentialResponse) => {
		console.log(response)
		const body = {
			idToken: response.credential
		}
		const respuesta = await axios.post(`${baseUrl}/api/auth/verify-token`, body)
		// console.log(respuesta);
		const token = respuesta.data.token
		console.log(token) // control
		Cookies.set('authToken', token, { expires: 1 })
		const isFirstTime = respuesta.data.firstTime
		if (isFirstTime) {
			navigate('/onboarding')
		} else {
			navigate('/dashboard')
		}
	}
	//validar si la cookie sigue activa
	// useEffect(() => {
	// 	const cokies = Cookies.get('authToken')
	// 	const headers = cokies ? { Authorization: `Bearer ${cokies}` } : undefined
	// 	const checkToken = async () => {
	// 		const response = await axios.get(`${baseUrl}/api/auth/check-login`, { headers })
	// 		console.log(response)
	// 		if (response.status === 200) {
	// 			navigate('/dashboard')
	// 		}
	// 	}
	// 	checkToken()
	// }, [navigate])

	return (
		<div className={style.pageview}>
			<div className={style.contentContainer}>
				<AuthIcon />
				<h5>¡Sé bienvenido, empieza hoy tu camino hacia el crecimiento financiero!</h5>
				<span>Descubre nuevas formas de ahorrar, invertir y hacer crecer tu patrimonio, en un solo lugar.</span>
				<div className={style.contentContainer}>
					<Link to={'/auth/login'} className='primaryButton'>
						Iniciar sesión
					</Link>
					<Link to={'/auth/register'} className='secondaryButton'>
						Registrarse
					</Link>
					{/* <Link to='#' className={style.link}>
						Olvidé mi contraseña
					</Link> */}
				</div>

				<div className={style.separador}>
					<Line />
					<span>o registrate con cuenta social</span>
					<Line />
				</div>
				<div className={style.contentContainer}>
					<GoogleLogin onSuccess={googleLogin} onError={() => console.log('error')} text='continue_with' shape='rectangular' width={350} />
				</div>
				<small>
					Al iniciar aceptas las <Link to={'#'}> condiciones del servicio de iupi.</Link> Nos tomamos muy en serio tu privacidad. Para mas información lee nuestra{' '}
					<Link to={'#'}>Política de privacidad.</Link>
				</small>
			</div>
		</div>
	)
}
