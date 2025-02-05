import { useState } from 'react'
import { baseUrl } from '../../../config/envs'
import { usePostDataWithToken } from '../../../hooks/usePostDataWithToken'
import styles from '../community.module.css'
import Spinner from '../../../components/spiner/Spiner'
import { Link, useParams } from 'react-router-dom'
import GoBackIcon from '../../../assets/icons/GoBackIcon'
import Modals from "../../../components/modal/Modals";

export default function Create() {
	const params = useParams()

	const { loading, error, postData } = usePostDataWithToken(`${baseUrl}/api/post/new`)

	const [formData, setFormData] = useState({
		title: '',
		subtitle: '',
		text: '',
		category: params.category
	})
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalMessage, setModalMessage] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		console.log('Datos enviados:', formData)
		await postData(formData)
		setFormData({
			title: '',
			subtitle: '',
			text: '',
			category: params.category
		})
		// alert('Posteo enviado')
		setModalMessage('Posteo enviado');
      	setIsModalOpen(true);
	}

	return (
		<div className={styles.pageView}>
			<div className={styles.contentContainer}>
				{error && <p className={styles.error}> ¡Ups! Se produjo un error al enviar tu posteo. Intentalo mas tarde nuevamente</p>}
				<div style={{ display: 'flex', alignSelf: 'flex-start' }}>
					<Link to={`/community/forum/${params.category}`}>
						{' '}
						<GoBackIcon />{' '}
					</Link>
				</div>
				<h1 className='body2'>
					Crea una publicación para <span>{params.category}</span>
				</h1>
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
			{isModalOpen && (
					<Modals
					  isOpen={isModalOpen}
					  title="Mensaje"
					  message={modalMessage}
					  onClose={() => setIsModalOpen(false)}
					/>
				  )}
		</div>
	)
}
