import { useState } from 'react'
import { baseUrl } from '../../../config/envs'
import { usePostDataWithToken } from '../../../hooks/usePostDataWithToken'
import styles from '../community.module.css'
import Spinner from '../../../components/spiner/Spiner'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

export default function Create() {
	const token = Cookies.get('authToken')
	let user = null
	if (token) {
		try {
			const decodedToken = jwtDecode(token)
			user = decodedToken.sub
		} catch (error) {
			console.error('Error decoding token:', error)
		}
	}
	const { loading, error, postData } = usePostDataWithToken(`${baseUrl}/api/post/new`)
	const [formData, setFormData] = useState({
		title: '',
		subtitle: '',
		text: '',
		creationDate: new Date().toISOString(),
		creationUser: user || 'Usuario desconocido'
	})
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault() // Prevenir comportamiento predeterminado del formulario
		console.log('Datos enviados:', formData)
		await postData(formData)
	}

	return (
		<div className={styles.pageView}>
			<div className={styles.contentContainer}>
				{error && <p className={styles.error}> ¡Ups! Se produjo un error al enviar tu posteo. Intentalo mas tarde nuevamente</p>}
				<h1 className='body2'>Crea una publicación para los usuarios</h1>
				<form onSubmit={handleSubmit} className={styles.registerForm}>
					<label htmlFor='title' className={styles.labelInput}>
						Título
						<input id='title' type='text' placeholder='Título' name='title' value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
					</label>
					<label htmlFor='subtitle' className={styles.labelInput}>
						Subtítulo
						<input id='subtitle' type='text' placeholder='Subtítulo' name='subtitle' value={formData.subtitle} onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} />
					</label>
					<label htmlFor='text' className={styles.labelInput}>
						Contenido
						<textarea id='text' name='text' value={formData.text} onChange={(e) => setFormData({ ...formData, text: e.target.value })} />
					</label>

					<button type='button' onClick={handleSubmit} className={styles.createButton}>
						{loading ? <Spinner /> : 'Enviar'}
					</button>
				</form>
			</div>
		</div>
	)
}
