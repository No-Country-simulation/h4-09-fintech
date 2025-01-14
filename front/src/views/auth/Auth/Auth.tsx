import { Link } from 'react-router-dom'
import AuthIcon from '../../../assets/icons/AuthIcon'
import style from './auth.module.css'
import Line from '../../../assets/Line'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'

export default function Auth() {
	const googleLogin = (response: CredentialResponse) => {
		//TODO enviar esta respuesta al back
		console.log(response)
	}

	return (
		<div className={style.pageview}>
			<div className={style.contentContainer}>
				<AuthIcon />
				<h5>¡Sé bienvenido, empieza hoy tu camino hacia el crecimiento financiero!</h5>
				<caption>Descubre nuevas formas de ahorrar, invertir y hacer crecer tu patrimonio, en un solo lugar.</caption>
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
