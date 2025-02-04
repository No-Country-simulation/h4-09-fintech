import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import './GestionInversiones.css'
import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { baseUrl } from '../../config/envs'
import { useFetchDataWithToken } from '../../hooks/useFetchDataWithToken'
// import Cookies from 'js-cookie'
// import InvestmentCard from './components/InvestmentCard'
import Spinner from '../../components/spiner/Spiner'
import UserInvestmentCard, { IUserInvestmentCardProp } from './components/UserInvestmentCard'

import { getInvestmentRecommendation, investmentsTypes, InvestmentType, IUnifyInvestment, IUser } from './utils'
import NewInvestmentCard from './components/NewInvestmentCard'


export const GestionInversiones = (): JSX.Element => {
	const { data: user, loading: loadingUser, error: errorUser } = useFetchDataWithToken<IUser>(`${baseUrl}/api/auth/check-login`)
	console.log('user', user);
	
	const [showSaldo, setShowSaldo] = useState(true)
	const [selectedInvestmentType, setSelectedInvestmentType] = useState<InvestmentType>(investmentsTypes[0])
	// console.log('selectedInvestmentType', selectedInvestmentType)

	// const [loadingDetails, setLoadingDetails] = useState(false)
	// const yourToken = Cookies.get('authToken')

	const { data: userInvestments, loading: loadingUserInvestments } = useFetchDataWithToken<IUserInvestmentCardProp[] | []>(`${baseUrl}/api/stocks/transactions`)
	console.log('userInvestments', userInvestments)

	const { data: allInvestments, loading: loadingAllInvestments } = useFetchDataWithToken<IUnifyInvestment[]>(`${baseUrl}/api/market/all-financial`)
	console.log('allInvestments', allInvestments)

	const getDisplayedData = () => {
		if (!allInvestments || allInvestments.length === 0) return [] // Verifica que haya datos

		return allInvestments?.filter((investment) => investment.typeAsset === selectedInvestmentType.link)
	}

	const displayedData = getDisplayedData()
	// console.log('displayedData', displayedData)

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

	const getCurrentTotalValue = () => {
		let totalValue = user?.currentAmount || 0 // Saldo disponible

		userInvestments?.forEach((investment) => {
			const { stockSymbol, quantity } = investment
			const matchedInvestment = allInvestments?.find((item) => item.name === stockSymbol)
			const currentPrice = matchedInvestment?.price || 0
			totalValue += quantity * currentPrice
		})
		return totalValue
	}

	const currentTotalValue = getCurrentTotalValue().toLocaleString('es-AR', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	})

	console.log('Valor total actual de los activos:', currentTotalValue)

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
					{loadingUserInvestments && <Spinner />}
					{userInvestments?.map((investment, index) => {
						const similarStock = allInvestments?.find((stock) => stock.name === investment.stockSymbol)

						return <UserInvestmentCard key={index} userInvestment={investment} similarStock={similarStock} />
					})}
					{!userInvestments || (userInvestments.length === 0 && <p>No tenés inversiones</p>)}
				</div>
				<br />
				<h3 className='subtitle'>
					Valor total actual de tus ahorros *: <span>${currentTotalValue}</span>{' '}
				</h3>
				<small>*tu saldo disponible mas el valor actual de tus inversiones</small>
				<br />
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
					{loadingAllInvestments ? (
						<Spinner />
					) : (
						displayedData.map((item, index) => {
							return <NewInvestmentCard key={index} investment={item} user={user} />
						})
					)}
					{displayedData.length === 0 && <p>No hay datos para mostrar. Reintente en unos segundos.</p>}
				</section>
			</div>
		</div>
	)
}
