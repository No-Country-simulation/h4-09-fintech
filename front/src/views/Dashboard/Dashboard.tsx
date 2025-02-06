import { useEffect, useState } from 'react'
import './Dashboard.css'
import { BellAlertIcon, XMarkIcon } from '@heroicons/react/24/outline'
import BarChartComponent from './(components)/graficos/barchart/BarChart'
import Example from './(components)/graficos/Linear/LinearChart'
import Circular from './(components)/graficos/Pastel/PieChart'
import { UserIcon } from '@heroicons/react/16/solid'
import { NoteDash } from './notificaciones/NoteDash'
import { Link } from 'react-router-dom'
import logocarga from '../../assets/icons/(iupi)/Logo iupi 14px.svg'
import CircularProgress from '@mui/material/CircularProgress'
import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useUser } from '../../contexts/UserContext'
import Modals from '../../components/modal/Modals'
import { useFetchDataWithToken } from '../../hooks/useFetchDataWithToken'
import { baseUrl } from '../../config/envs'
import Spinner from '../../components/spiner/Spiner'
import { usePostDataWithToken } from '../../hooks/usePostDataWithToken'

// Tipados
// interface UserData {
// 	nombre: string
// 	correo: string
// 	currentAmount?: number // Hacemos que sea opcional
// }

interface FinancialGoal {
	name: string
	targetAmount: string
	progressTotal: number
}

interface Notificacion {
	id: string
	title: string
	message: string
}

interface IBancAccount {
	id: string
	cuit: string
	cbu: string
	alias: string
	titular: string
}

export const Dashboard: React.FC = () => {
	// ESTADOS
	// const [userdata] = useState<UserData>({
	// 	nombre: '',
	// 	correo: ''
	// })

	const { user } = useUser()
	const [notifiesList, setNotifiesList] = useState<Notificacion[]>([])
	const [loadingUserData, setLoadingUserData] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)
	const [btnObjetivo, setBtnObjetivo] = useState('Cargando...')
	const [objetivos, setObjetivos] = useState<FinancialGoal[]>([])
	const [open, setOpen] = React.useState(false)
	const [monto, setMonto] = useState<number>(0)
	const [errorMonto, setErrorMonto] = useState<string>('')
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [modalMessage, setModalMessage] = useState('')
	const [isLoadingSendFile, setIsLoadingSendFile] = useState(false)

	const [retirarFondosModal, setRetirarFondosModal] = useState(false)
	const handleShowretirarFondosModal = () => {
		setRetirarFondosModal(true)
	}
	const handleCancelretirarFondosModal = () => {
		setRetirarFondosModal(false)
	}
	const [montoARetirar, setMontoARetirar] = useState(0)
	const [cbuARetirar, setCbuARetirar] = useState('')

	const { loading: loadingRetirarFondos, postData } = usePostDataWithToken(`${baseUrl}/api/pagos/retiros`)
	const handleWithdrawFounds = async () => {
		if (!user) return
		if (montoARetirar > user?.currentAmount) {
			return
		}
		const body = {
			monto: montoARetirar,
			cbu: cbuARetirar
		}
		console.log('body', body)

		try {
			await postData(body)
			// console.log(response)
			handleCancelretirarFondosModal()
		} catch (error) {
			console.log(error)
		}
	}

	// Funciones (Fx)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)
	// FONDO TOTAL: current + actions
	const currentAmount = user?.currentAmount ?? 0
	const totalActions = user?.accionsAmountTotal ?? 0
	const foundsTotal = currentAmount + totalActions

	// Función para obtener una cookie específica
	const getCookie = (name: string): string | null => {
		const cookies = document.cookie.split('; ')
		const cookie = cookies.find((row) => row.startsWith(`${name}=`))
		return cookie ? decodeURIComponent(cookie.split('=')[1]) : null
	}

	const { data: bancAccount } = useFetchDataWithToken<IBancAccount>(`${baseUrl}/api/cuenta-banco`)

	// GET de "OBJETIVOS FINANCIEROS Y PROGRESO"
	useEffect(() => {
		const token = getCookie('authToken')
		if (!token) {
			setError('No se encontró un token de autenticación.')
			return
		}
		setLoadingUserData(true)

		fetch(`https://h4-09-fintech-production.up.railway.app/api/user/goals`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		})
			.then((res) => {
				if (!res.ok) throw new Error('Error al obtener los objetivos.')
				return res.json()
			})
			.then((data) => {
				console.log('data objetivos', data)
				setObjetivos(data.length > 0 ? data : []) // Asegurarse de manejar un array vacío
				setError(null)
			})
			.catch((err) => {
				console.error(err)
				setError('No se pudieron cargar los objetivos.')
			})
			.finally(() => {
				setLoadingUserData(false)
			})
	}, [])
	//GET de "ALL NOTIFICACIONES"
	useEffect(() => {
		const token = getCookie('authToken')
		const fetchNotifies = async () => {
			try {
				const res = await fetch(`https://h4-09-fintech-production.up.railway.app/api/notifications/all`, {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json'
					}
				})
				if (!res.ok) throw new Error('Error al obtener las notificaciones.')
				const data = await res.json()
				setNotifiesList(data)
			} catch (err) {
				console.error(err)
			}
		}
		fetchNotifies()
	}, [])

	const [file, setFile] = useState<File | null>(null)

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0]
		if (selectedFile) {
			setFile(selectedFile)
		}
	}
	// Función para manejar el envío del formulario
	const handleSubmitModal = async (event: React.FormEvent) => {
		event.preventDefault()
		setIsLoadingSendFile(true)
		const formData = new FormData()
		if (!file) {
			setError('Por favor, selecciona un archivo.')
			setIsLoadingSendFile(false)
			return
		}

		if (file) {
			formData.append('file', file) // Agregar el archivo solo si existe
		}

		if (monto <= 0) {
			setErrorMonto('El monto debe ser un número positivo.')
		} else {
			const token = getCookie('authToken')
			if (!token) {
				console.error('El token de autorización no está presente.')
				setError('No se encontró el token de autorización.')
				setLoadingUserData(false)
				return
			}

			try {
				const response = await fetch(`https://h4-09-fintech-production.up.railway.app/api/pagos/depositos?monto=${monto}`, {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${token}`
					},
					body: formData
				})

				if (!response.ok) {
					throw new Error('Error al realizar el depósito')
				}

				const data = await response.json()
				console.log(data)

				setModalMessage(`Monto de recarga: ${monto} \n Este depósito lo verás reflejado cuando sea verificado`)
				setIsModalOpen(true)

				// setTimeout(() => {
				// 	window.location.reload()
				// }, 2000)

				setOpen(false)
			} catch (err) {
				console.error(err)
				setError('Ocurrió un error al procesar el depósito.')
			} finally {
				setLoadingUserData(false)
				setIsLoadingSendFile(false)
			}
		}
	}

	// Condicional para botón de objetivos
	useEffect(() => {
		if (objetivos.length > 0) {
			setBtnObjetivo('objetivos')
		} else {
			setBtnObjetivo('Sin objetivos aún')
		}
	}, [objetivos])

	// Pantallas de carga y errores
	if (loadingUserData) {
		return (
			<div className='spinner-dash'>
				<img src={logocarga} alt='Cargando' />
				<CircularProgress
					style={{
						color: 'var(--color-fondo)'
					}}
				/>
			</div>
		)
	}

	// if (error) {
	// 	return <div>Error: {error}</div>
	// }

	// Estilos modal
	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '70vw',
		maxWidth: '600px',
		// height: '45vh',
		bgcolor: 'background.paper',
		borderRadius: '10px',
		boxShadow: 24,
		display: 'flex',
		textAlign: 'center',
		flexDirection: 'column',
		p: 4
	}

	return (
		<div className='dashboard'>
			<h1 className='titulo-dash'>
				Dashboard{' '}
				<Link to='/notificaciones' className='container-bell link-rrdom'>
					<div className='counter-notif'>2</div>
					<BellAlertIcon className='iconos-hero' />
				</Link>
			</h1>
			<NoteDash notificaciones={notifiesList} />
			<div className='container-usuario flex'>
				{user?.profileImageUrl === null ? <UserIcon id='foto-perfil' /> : <img src={user?.profileImageUrl} id='foto-perfil' alt='Foto de perfil' />}
				<div>
					<h2>¡Hola {user?.name}!</h2>
					<small className='correo-usuario-dash'>{user?.email}</small>
				</div>
				<small className='free-plan'>Free plan</small>
			</div>

			<div onClick={handleOpen} className='fondos-dash'>
				<div className='fondo-disponible'>
					<h6>Total en Iupi</h6>
					<span>
						$
						{foundsTotal
							? foundsTotal.toLocaleString('es-AR', {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2
							  })
							: '0,00'}
					</span>
				</div>
				<div className='other-funds'>
					<div>
						<h6>Fondo disponible</h6>
						<span>
							$
							{user?.currentAmount
								? user?.currentAmount.toLocaleString('es-AR', {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2
								  })
								: '0,00'}
						</span>
					</div>
					<div>
						<h6>Total acciones</h6>
						<span>
							$
							{user?.accionsAmountTotal
								? user?.accionsAmountTotal.toLocaleString('es-AR', {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2
								  })
								: '0,00'}
						</span>
					</div>
				</div>
				<small>cargar</small>
			</div>
			<div className='retirarFondosContainer'>
				<button type='button' className='retirarfondosButton' onClick={handleShowretirarFondosModal}>
					Retirar fondos
				</button>
			</div>

			<BarChartComponent
				data={objetivos.map((goal) => ({
					name: goal.name,
					Progreso: goal.progressTotal
				}))}
				dataKey='Progreso'
				xAxisKey='name'
				boton={btnObjetivo}
			/>
			<Example />
			<Circular />
			{retirarFondosModal && (
				<div className='modalOverlay' onClick={handleCancelretirarFondosModal}>
					<div className='modalRetiro' onClick={(event) => event.stopPropagation()}>
						<h5 className='body2'>¿Deseas retirar fondos de Iupi?</h5>
						<span>
							Tus fondos: $
							{user?.currentAmount?.toLocaleString('es-AR', {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2
							})}
						</span>

						<div className='inputContainer'>
							<label htmlFor='amount'>Cantidad a retirar:</label>
							<input type='number' className='retiro-input' id='amount' min={1} max={user?.currentAmount} value={montoARetirar} onChange={(e) => setMontoARetirar(Number(e.target.value))} />
							<label htmlFor='cbu'>Indica tu cbu:</label>
							<input type='text' className='retiro-input' id='cbu' value={cbuARetirar} onChange={(e) => setCbuARetirar(e.target.value)} />
						</div>
						<div className='modalButtons'>
							<button type='button' onClick={handleWithdrawFounds} className='secondaryButton'>
								{loadingRetirarFondos ? <Spinner /> : 'Retirar fondos'}
							</button>
							<button type='button' onClick={handleCancelretirarFondosModal} className='primaryButton'>
								Cancelar
							</button>
						</div>
						<p>*Esta operacion debe ser confirmada por nuestros administradores </p>
					</div>
				</div>
			)}
			<div className='modal-fondos'>
				<Modal open={open} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
					<Box sx={style}>
						<Typography id='modal-modal-title' variant='h6' component='h2'>
							<XMarkIcon className='iconos-hero xmark-icono' onClick={handleClose} />

							<h3>Añadir fondos</h3>
							<p>Ingresa la cantidad dinero que deseas cargar a tu cartera </p>
						</Typography>
						<Typography id='modal-modal-description' sx={{ mt: 2 }}>
							{/* <div className='monto-recarga'>
								<h5>Tu monto actual es de :</h5>
								<span>${userdata.currentAmount}</span>
							</div> */}
							<form onSubmit={handleSubmitModal}>
								<input
									type='number'
									// value={monto}
									onChange={(e) => setMonto(Number(e.target.value))}
									placeholder='$..'
								/>
								{errorMonto && <span>{errorMonto}</span>}
								<div className='bancAccountinfo'>
									<p>Estos son los datos bancarios de Iupi para que puedas realizar una transferencia desde tu banco.</p>
									<p>Titular: {bancAccount?.titular}</p>
									<p>Cuit: {bancAccount?.cuit}</p>
									<p>CBU:{bancAccount?.cbu}</p>
									<p>Alias:{bancAccount?.alias}</p>
								</div>
								<br />
								<p className='modal-subtitle'>Carga aqui tu comprobante</p>
								<input type='file' accept='image/*' onChange={handleFileChange} className='fileInput' />
								{error && <p>{error}</p>}
								<div className='boton-modal'>
									<button type='submit' className='secondaryButton'>
										{isLoadingSendFile ? <Spinner /> : 'Enviar'}
									</button>
								</div>
                <br />
								<p>*Esta operacion debe ser confirmada por nuestros administradores </p>
							</form>
						</Typography>
					</Box>
				</Modal>
			</div>
			{isModalOpen && <Modals isOpen={isModalOpen} title='Mensaje' message={modalMessage} onClose={() => setIsModalOpen(false)} />}
		</div>
	)
}

export default Dashboard
