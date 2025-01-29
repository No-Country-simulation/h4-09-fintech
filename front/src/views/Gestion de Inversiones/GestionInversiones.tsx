/* eslint-disable @typescript-eslint/no-explicit-any */
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import './GestionInversiones.css'
import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { baseUrl } from '../../config/envs'
import { useFetchDataWithToken } from '../../hooks/useFetchDataWithToken'
import Cookies from 'js-cookie'
import InvestmentCard from './components/InvestmentCard'
import Spinner from '../../components/spiner/Spiner'
import UserInvestmentCard from './components/UserInvestmentCard'

export interface IUser {
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
export interface INotFunds {
	// clave: string
	data: {
		cedear: string
		name: string
		percentageLastMonth: number
		percentageLastYear: number
		price: number
	}
}
export interface IFundsData {
	cedear: string
	name: string
	percentageLastMonth: number
	percentageLastYear: number
	price: number
}
export interface IUserInvestment {
	id?: number
	quantity: number
	stockSymbol: string
	stockName: string
	pricePerUnit: number
	totalCost: number
	transactionDate: string
}

const getInvestmentRecommendation = (riskPreference: string | undefined | null) => {
	switch (riskPreference) {
		case 'Arriesgado':
			return 'Acciones'
		case 'Moderado':
			return 'Cedears y Bonos'
		default:
			return 'Fondos'
	}
}

export const GestionInversiones = (): JSX.Element => {
	const [showSaldo, setShowSaldo] = useState(true)
	const [selectedInvestmentType, setSelectedInvestmentType] = useState<InvestmentType>(investmentsTypes[0])
	const [cedearsDetails, setCedearsDetails] = useState<INotFunds[]>([])
	const [bondsDetails, setBondsDetails] = useState<INotFunds[]>([])
	const [actionsDetails, setActionsDetails] = useState<INotFunds[]>([])
	const [fundsDetails, setFundsDetails] = useState<IFundsData[]>([])
	const [loadingDetails, setLoadingDetails] = useState(false)

	const { data: userInvestments } = useFetchDataWithToken<IUserInvestment[] | []>(`${baseUrl}/api/stocks/transactions`)
	const { data: user, loading: loadingUser, error: errorUser } = useFetchDataWithToken<IUser>(`${baseUrl}/api/auth/check-login`)
	const { data: cedearsData } = useFetchDataWithToken<IpreData[]>(`${baseUrl}/api/market/cedears`)
	const { data: bondsData } = useFetchDataWithToken<IpreData[]>(`${baseUrl}/api/market/bonds`)
	const { data: actionsData } = useFetchDataWithToken<IpreData[]>(`${baseUrl}/api/market/actions`)
	const { data: fundsData } = useFetchDataWithToken<IFundsData[]>(`${baseUrl}/api/market/investment-funds`)
	// console.log('user', user)
	// console.log('userInvestments', userInvestments)

	const userFounds = user?.currentAmount?.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
	const investmentRecommendation = getInvestmentRecommendation(user?.riskPreference)
	useEffect(() => {
		if (user?.riskPreference) {
			switch (user.riskPreference) {
				case 'Arriesgado':
					setSelectedInvestmentType(investmentsTypes.find((type) => type.name === 'Acciones') || investmentsTypes[0])
					break
				case 'Moderado':
					setSelectedInvestmentType(investmentsTypes.find((type) => type.name === 'Cedears') || investmentsTypes[0])
					break
				default:
					setSelectedInvestmentType(investmentsTypes.find((type) => type.name === 'Fondos') || investmentsTypes[0])
			}
		}
	}, [user?.riskPreference, investmentsTypes])
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
	const getSimilarStocks = () => {
		const similarNotFunds: INotFunds[] = []
		const similarFunds: IFundsData[] = []

		userInvestments?.forEach((investment) => {
			// console.log('actionsDetails', actionsDetails)

			const matchedCedear = cedearsDetails?.find((option) => (option as any)?.cedear === investment.stockSymbol)
			const matchedBond = bondsDetails?.find((option) => (option as any)?.cedear === investment.stockSymbol)
			const matchedAction = actionsDetails.find((option) => (option as any)?.cedear === investment.stockSymbol)
			const matchedFund = fundsDetails?.find((option) => option?.cedear === investment.stockSymbol)
			// console.log('matchedCedear', matchedCedear, 'matchedBond', matchedBond, 'matchedAction', matchedAction, 'matchedFund', matchedFund)

			if (matchedCedear) similarNotFunds.push(matchedCedear)
			if (matchedBond) similarNotFunds.push(matchedBond)
			if (matchedAction) similarNotFunds.push(matchedAction)
			if (matchedFund) similarFunds.push(matchedFund)
		})
		// console.log('similarNotFunds', similarNotFunds)
		// console.log('similarFunds', similarFunds)

		return { similarNotFunds, similarFunds }
	}
	const [similarNotFunds, setSimilarNotFunds] = useState<INotFunds[]>([])
	const [similarFunds, setSimilarFunds] = useState<IFundsData[]>([])

	useEffect(() => {
		const { similarNotFunds, similarFunds } = getSimilarStocks()
		setSimilarNotFunds(similarNotFunds)
		setSimilarFunds(similarFunds)
	}, [userInvestments, cedearsDetails, bondsDetails, actionsDetails, fundsDetails])

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
				{loadingUser ? <p>Cargando...</p> : <div className='saldoContainer'>{showSaldo ? <span className='saldo'>$ {userFounds}</span> : <span className='saldo'>$ ********</span>}</div>}

				<div className='headerContainer'>
					<h3 className='subtitle'>Tu cartera:</h3>
				</div>
				<div className='cardsContainer'>
					{userInvestments?.map((investment, index) => {
						// Encuentra el "similarStock" en `similarNotFunds` o `similarFunds`
						const similarStock = similarNotFunds?.find((stock) => (stock as any).cedear === investment.stockSymbol) || similarFunds?.find((fund) => fund.cedear === investment.stockSymbol)

						return (
							<UserInvestmentCard
								key={index}
								userInvestment={investment}
								similarStock={similarStock} // Pasa el similarStock como prop
							/>
						)
					})}
					{!userInvestments && <p>No tenés inversiones</p>}
				</div>
				<div className='headerContainer'>
					<h3 className='subtitle'>¿En qué desea invertir?</h3>
				</div>
				<p>Invertí de manera fácil y rápida en el mercado.</p>
				<h5>En base a tu perfil, te recomendamos esta cartera de inversiones: {investmentRecommendation}</h5>

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
						// <p>Cargando ...</p>
						<Spinner />
					) : (
						displayedData.map((item, index) => {
							const { name, cedear, price, percentageLastMonth, percentageLastYear } = selectedInvestmentType.name === 'Fondos' ? (item as IFundsData) : (item as INotFunds['data'])

							return <InvestmentCard key={index} name={name} cedear={cedear} price={price} percentageLastMonth={percentageLastMonth} percentageLastYear={percentageLastYear} user={user} />
						})
					)}
					{!loadingDetails && displayedData.length === 0 && <p>No hay datos para mostrar. Reintente en unos segundos.</p>}
				</section>
			</div>
		</div>
	)
}
