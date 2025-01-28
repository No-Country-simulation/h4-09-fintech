import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
// import mastercard from '../../assets/svg/MASTERCARD.svg'
import './GestionInversiones.css'
import { NavLink, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { baseUrl } from '../../config/envs'
import { useFetchDataWithToken } from '../../hooks/useFetchDataWithToken'
import Cookies from 'js-cookie'

interface IUser {
	currentAmount: number
	financialKnowledge: null | string
	lastName: string
	mainGoal: null | string
	name: string
	onboardingComplete: boolean
	riskPreference: null | string
	userId: string
	username: string
}

interface IpreData {
	symbol: string
	description: string
}

interface InvestmentType {
	name: string
	link: string
}
const investmentsTypes: InvestmentType[] = [
	{ name: 'Cedears', link: 'cedears' },
	{ name: 'Bonos', link: 'bonds' },
	{ name: 'Fondos', link: 'investment-funds' },
	{ name: 'Acciones', link: 'actions' }
]
interface INotFunds {
	// clave: string
	data: {
		cedear: string
		name: string
		percentageLastMonth: number
		percentageLastYear: number
		price: number
	}
}
interface IFundsData {
	cedear: string
	name: string
	percentageLastMonth: number
	percentageLastYear: number
	price: number
}

export const GestionInversiones = (): JSX.Element => {
	const [showSaldo, setShowSaldo] = useState(true)
	const [selectedInvestmentType, setSelectedInvestmentType] = useState<InvestmentType>(investmentsTypes[0])
	const [cedearsDetails, setCedearsDetails] = useState<INotFunds[]>([])
	const [bondsDetails, setBondsDetails] = useState<INotFunds[]>([])
	const [actionsDetails, setActionsDetails] = useState<INotFunds[]>([])
	const [fundsDetails, setFundsDetails] = useState<IFundsData[]>([])
	const [loadingDetails, setLoadingDetails] = useState(false)

	const { data: user, loading: loadingUser, error: errorUser } = useFetchDataWithToken<IUser>(`${baseUrl}/api/auth/check-login`)
	const { data: cedearsData } = useFetchDataWithToken<IpreData[]>(`${baseUrl}/api/market/cedears`)
	const { data: bondsData } = useFetchDataWithToken<IpreData[]>(`${baseUrl}/api/market/bonds`)
	const { data: actionsData } = useFetchDataWithToken<IpreData[]>(`${baseUrl}/api/market/actions`)
	const { data: fundsData } = useFetchDataWithToken<IFundsData[]>(`${baseUrl}/api/market/investment-funds`)

	const yourToken = Cookies.get('authToken')

	const fetchInvestmentDetails = async (data: IpreData[], type: string) => {
    	setLoadingDetails(true)
		if (!data) return []
		const promises = data.map(async (item) => {
			try {
				const response = await fetch(`${baseUrl}/api/market/${type}/${item.symbol}?name=${item.description}`, {
					headers: { Authorization: `Bearer ${yourToken}` }
				})
				if (!response.ok) return null
				const text = await response.text()
				return text ? JSON.parse(text) : null
			} catch {
				return null
			}
		})
		const results = await Promise.all(promises)
		return results.filter((result) => result !== null) as INotFunds[]
	}

	useEffect(() => {
		const fetchAllDetails = async () => {
			setLoadingDetails(true)
			try {
				const [cedears, bonds, actions] = await Promise.all([
					fetchInvestmentDetails(cedearsData || [], 'cedears'),
					fetchInvestmentDetails(bondsData || [], 'bonds'),
					fetchInvestmentDetails(actionsData || [], 'actions')
				])
				setCedearsDetails(cedears)
				setBondsDetails(bonds)
				setActionsDetails(actions)
				if (fundsData) setFundsDetails(fundsData)
			} catch (err) {
				console.error('Error fetching investment details:', err)
			} finally {
				setLoadingDetails(false)
			}
		}

		fetchAllDetails()
	}, [cedearsData, bondsData, actionsData, fundsData])

	const getDisplayedData = () => {
		switch (selectedInvestmentType.name) {
			case 'Cedears':
				return cedearsDetails
			case 'Bonos':
				return bondsDetails
			case 'Acciones':
				return actionsDetails
			case 'Fondos':
				return fundsDetails
			default:
				return []
		}
	}

	const displayedData = getDisplayedData()
	return (
		<div className='pageView'>
			<div className='contentContainer'>
				<h1 className='title'>Gestión de inversiones</h1>
				<div className='headerContainer'>
					<div className='saldoContainer'>
						{errorUser && <p>Error al cargar el usuario</p>}
						<h3 className='subtitle'>Saldo disponible</h3>
					</div>
					<div className='eye-icon' onClick={() => setShowSaldo(!showSaldo)}>
						{showSaldo ? <EyeIcon className='iconos-hero' /> : <EyeSlashIcon className='iconos-hero' />}
					</div>
				</div>
				{loadingUser ? <p>Cargando...</p> : <div className='saldoContainer'>{showSaldo ? <span className='saldo'>$ {user?.currentAmount}</span> : <span className='saldo'>$ ********</span>}</div>}
				<div className='headerContainer'>
					<h3 className='subtitle'>¿En qué desea invertir?</h3>
				</div>
				<p>Invertí de manera fácil y rápida en el mercado.</p>
				<div className='inversiones-btn-group'>
					{investmentsTypes.map((boton, index) => (
						<button type='button' className={selectedInvestmentType.name === boton.name ? 'activeButton' : 'button'} onClick={() => setSelectedInvestmentType(boton)} key={index}>
							{boton.name}
						</button>
					))}
				</div>
				<h5>Añadidos recientemente</h5>
				<section className='cardsContainer'>
					<Outlet />
					{loadingDetails ? (
						<p>Cargando ...</p>
					) : (
						displayedData.map((item, index) => {
							if (selectedInvestmentType.name === 'Fondos') {
								const fundItem = item as IFundsData
								return (
									<NavLink to={`/fondos/${fundItem.cedear}`} className='card' key={index}>
										<div className='cardHeader'>
											<p className='cardTitle'>{fundItem.name}</p>
											<p className='clave'>{fundItem.cedear}</p>
										</div>
										<div className='cardHeader'>
											<p>Precio: ${fundItem.price}</p>
											<div className='porcentajes'>
												<p>
													Variación último mes <span className={fundItem.percentageLastMonth > 0 ? 'subida' : 'bajada'}>{fundItem.percentageLastMonth}%</span>
												</p>
												<p>
													Variación último año <span className={fundItem.percentageLastYear > 0 ? 'subida' : 'bajada'}>{fundItem.percentageLastYear}%</span>
												</p>
											</div>
										</div>
									</NavLink>
								)
							} else {
								const notFundItem = item as INotFunds['data']
								return (
									<NavLink to={`/acciones/${notFundItem.cedear}`} className='card' key={index}>
										<div className='cardHeader'>
											<p className='cardTitle'>{notFundItem.name}</p>
											<p className='clave'>{notFundItem.cedear}</p>
										</div>
										<div className='cardHeader'>
											<p>Precio: ${notFundItem.price}</p>
											<div className='porcentajes'>
												<p>
													Variación último mes <span className={notFundItem.percentageLastMonth > 0 ? 'subida' : 'bajada'}>{notFundItem.percentageLastMonth}%</span>
												</p>
												<p>
													Variación último año <span className={notFundItem.percentageLastYear > 0 ? 'subida' : 'bajada'}>{notFundItem.percentageLastYear}%</span>
												</p>
											</div>
										</div>
									</NavLink>
								)
							}
						})
					)}
					{!loadingDetails && displayedData.length === 0 && <p>No hay datos para mostrar. Reintente en unos segundos.</p>}
				</section>
			</div>
		</div>
	)
}
