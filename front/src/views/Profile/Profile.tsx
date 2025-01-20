import styles from './Profile.module.css'
import Card from '../../components/card/Card'
// import IupiSmallIcon from "../../assets/icons/IupiSmallIcon";
import { useState, useEffect } from 'react'
import { FaRegUser, FaCamera } from 'react-icons/fa'
import { GoGear } from 'react-icons/go'
import { TbWorld } from 'react-icons/tb'
import { LuMoon } from 'react-icons/lu'
import { RxExit } from 'react-icons/rx'
// import { GiReceiveMoney } from "react-icons/gi";

export default function Profile() {
	const [profileImage, setProfileImage] = useState<string | null>(null)

	// **Cargar imagen inicial desde el backend**
	useEffect(() => {
		const fetchProfileImage = async () => {
			const response = await fetch('http://localhost:5000/api/user/profile-image')
			const data = await response.json()
			setProfileImage(data.imageUrl || null) // Si no hay imagen, queda como `null`.
		}
		fetchProfileImage()
	}, [])

	const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0]
		if (selectedFile) {
			const formData = new FormData()
			formData.append('image', selectedFile)

			const response = await fetch('url', {
				method: 'POST',
				body: formData
			})
			const data = await response.json()

			if (data.success) {
				setProfileImage(data.imageUrl)
			} else {
				console.error('Error al subir la imagen:', data.message)
			}
		}
	}

	return (
		<>
			<div className={styles.container}>
				<h1 className={styles.title}>Mi cuenta</h1>

				<div className={styles.profile}>
					<div className={styles.profilePictureContainer}>
						<img src={profileImage || 'https://via.placeholder.com/150?text=Perfil'} alt='Foto de perfil' className={styles.profilePicture} />

						<label htmlFor='imageUpload' className={styles.cameraIcon}>
							<FaCamera />
						</label>

						<input id='imageUpload' type='file' accept='image/*' onChange={handleImageChange} style={{ display: 'none' }} />
					</div>

					<div className={styles.info}>
						<h3 className={styles.names}>Nombre</h3>
						<p className={styles.email}>Correo</p>
					</div>

					<button className={styles.button}>
						{/* <IupiSmallIcon />|<GiReceiveMoney /> */}
						conservador
					</button>
				</div>

				<Card icon={<FaRegUser />} title='Datos financieros y personales' description='Modifique o complete sus datos' arrow='' />
				<Card icon={<GoGear />} title='Configuracion' description='Añade o pruebe funciones para evitar vulnerabilidades' arrow='' />
				<h2 className={styles.subtitle}>Pantalla y acciones</h2>
				<Card icon={<TbWorld />} title='Idioma' description='Cambia toda la interfaz a tu idioma' arrow='' />
				<Card icon={<LuMoon />} title='Modo oscuro' description='Para facilitar la visualizacion de la pantalla' arrow='' />
				<Card icon={<RxExit />} title='Cerrar sesion' description='O permanecer conectado y cambiar de usuario' arrow='' />
			</div>
		</>
	)
}
