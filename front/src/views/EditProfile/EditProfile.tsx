import { useState, useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { FaRegUser, FaCamera } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import styles from './EditProfile.module.css'
import { useUser } from '../../contexts/UserContext'
import axios from 'axios'
import Spinner from '../../components/spiner/Spiner'

const getCookie = (name: string): string | null => {
	const cookies = document.cookie.split('; ')
	const cookie = cookies.find((row) => row.startsWith(`${name}=`))
	return cookie ? decodeURIComponent(cookie.split('=')[1]) : null
}

export default function EditProfile() {
	const { user, setUser } = useUser()
	console.log(user)

	const [profileImage, setProfileImage] = useState<string | null>(null)
	const [selectedOption, setSelectedOption] = useState(user?.riskPreference || '')
	const [isPro, setIsPro] = useState(false)
	const [isEditEnable, setIsEditEnable] = useState(false)
	// const [isPasswordDisabled, setIsPasswordDisabled] = useState(true)
	const navigate = useNavigate()
	const [userName, setUserName] = useState<string>(user?.name || '')
	const [lastName, setLastName] = useState<string>(user?.lastName || '')
	const [password, setPassword] = useState<string | null>(null)
	const [isGoogleUser] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(false)

	const [formData, setFormData] = useState({
		name: '',
		lastName: '',
		riskPreference: ''
	})

	const handleSendChanges = async () => {
		setFormData({
			name: userName,
			lastName: lastName,
			riskPreference: selectedOption
		})
		console.log('formData', formData)
	}

	useEffect(() => {
		setSelectedOption(user?.riskPreference || '')
		setProfileImage(user?.profileImageUrl || null)
	}, [])

	const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0]
		if (selectedFile) {
			const token = getCookie('authToken')
			if (!token) {
				console.error('No se encontró el token de autorización.')
				return
			}

			const formData = new FormData()
			formData.append('file', selectedFile)

			try {
				setLoading(true)
				const response = await axios.patch('https://h4-09-fintech-production.up.railway.app/api/user/upload-image', formData, {
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'multipart/form-data' // Importante para enviar archivos
					}
				})
				setProfileImage(response.data)
				console.log(response.data)
				setUser({ ...user!, profileImageUrl: response.data })
			} catch (error) {
				console.error('Error de red al subir la imagen:', error)
			} finally {
				setLoading(false)
			}
		}
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedOption(event.target.value)
	}

	const handleToggle = () => {
		setIsPro(!isPro)
	}

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserName(e.target.value)
	}
	const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLastName(e.target.value)
	}

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value)
	}

	return (
		<div className={styles.pageView}>
			<div className={styles.contentContainer}>
				<h1 className={styles.title}>
					<button className={styles.buttonArrow} onClick={() => navigate(-1)}>
						<FaArrowLeft className={styles.icon} />
					</button>
					Datos financieros y personales
				</h1>

				<div className={styles.profile}>
					<div className={styles.profilePictureContainer}>
						{loading ? (
							<div className={styles.spinnerContainer}>
								<Spinner />
							</div>
						) : user && user?.profileImageUrl && profileImage ? (
							<img src={profileImage} alt='Foto de perfil' className={styles.profilePicture} />
						) : (
							<FaRegUser className={styles.defaultIcon} />
						)}

						{!isGoogleUser && (
							<label htmlFor='imageUpload' className={styles.cameraIcon}>
								<FaCamera />
							</label>
						)}

						<input id='imageUpload' type='file' accept='image/.jpg, image/jpeg, image/png' onChange={handleImageChange} style={{ display: 'none' }} />
					</div>

					<div className={styles.info}>
						<h3 className={styles.names}>
							{user?.name} {user?.lastName}
						</h3>
					</div>
				</div>

				<div className={styles.cardcontainer}>
					<div className={styles.card}>
						<h3 className={styles.subtitle}>{isPro ? 'Pro Plan' : 'Free Plan'}</h3>
						<label className={styles.switch}>
							<input type='checkbox' checked={isPro} onChange={handleToggle} />
							<span className={styles.slider}></span>
						</label>
					</div>
				</div>
				<br />
				<h2 className={styles.subtitle}>Datos personales</h2>

				<div className={styles.formContainer}>
					<div className={styles.form}>
						<label htmlFor='email'>Correo electrónico </label>
						<span>{user?.email}</span>
						<label htmlFor='name'>Nombre</label>
						<div className={styles.inputWithButton}>
							<input type='text' id='name' placeholder={'Nombre '} value={userName} onChange={handleNameChange} disabled={!isEditEnable} required />
						</div>
						<label htmlFor='lastName'>Apellido</label>
						<div className={styles.inputWithButton}>
							<input type='text' id='lastName' placeholder={'Apellido'} value={lastName} onChange={handleLastNameChange} disabled={!isEditEnable} required />
						</div>
						<button type='button' onClick={() => setIsEditEnable(!isEditEnable)} className={styles.button}>
							{' '}
							Editar
						</button>
						{isEditEnable && (
							<button type='button' onClick={handleSendChanges} className={styles.saveButton}>
								{' '}
								Guardar
							</button>
						)}

						<label htmlFor='password'>Contraseña *</label>
						<div className={styles.inputWithButton}>
							<input type='password' id='password' placeholder='************' value={password || ''} onChange={handlePasswordChange} required disabled={true} />
							{/* <button type='button' onClick={() => setIsPasswordDisabled(!isPasswordDisabled)} className={styles.editButton}>
								{isPasswordDisabled ? 'Cambiar' : 'Guardar'}
							</button> */}
						</div>
					</div>
				</div>
				<br />
				<h2 className={styles.subtitle}>Tolerancia al riesgo</h2>

				<div className={styles.radiocontainer}>
					<div className={styles.radiobuttonscontainer}>
						<div className={styles.radiobuttons}>
							<div className={styles.radiobutton}>
								<h3 className={styles.subtitle}>Conservador:</h3>
								<input type='radio' id='conservador' name='tolerancia' value='conservador' checked={selectedOption === 'conservador'} onChange={handleChange} />
							</div>
							<div className={styles.radiobutton}>
								<h3 className={styles.subtitle}>Equilibrado:</h3>
								<input type='radio' id='equilibrado' name='tolerancia' value='equilibrado' checked={selectedOption === 'equilibrado'} onChange={handleChange} />
							</div>
							<div className={styles.radiobutton}>
								<h3 className={styles.subtitle}>Arriesgado:</h3>
								<input type='radio' id='agresivo' name='tolerancia' value='agresivo' checked={selectedOption === 'agresivo'} onChange={handleChange} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
