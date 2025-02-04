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
	profileImageUrl?: string
}

export interface IpreData {
	symbol: string
	description: string
}

export interface InvestmentType {
	name: string
	link: string
}
export const investmentsTypes: InvestmentType[] = [
	{ name: 'Cedears', link: 'cedear' },
	{ name: 'Bonos', link: 'bono' },
	{ name: 'Fondos', link: 'fondo-inversion' },
	{ name: 'Acciones', link: 'accion' }
]
export interface INotFunds {
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

export const getInvestmentRecommendation = (riskPreference: string | undefined | null) => {
	switch (riskPreference) {
		case 'Arriesgado':
			return 'Acciones'
		case 'Moderado':
			return 'Cedears y Bonos'
		default:
			return 'Fondos'
	}
}

export interface IUnifyInvestment {
	id: number
	name: string
	description: string
	price: number
	percentageLastMonth: number
	percentageLastYear: number
	typeAsset: string
	lastUpdate: string
	openingBalance: number
}

// export const getDisplayedData = () => {
// 	switch (selectedInvestmentType.name) {
// 		case 'Cedears':
// 			return cedearsDetails
// 		case 'Bonos':
// 			return bondsDetails
// 		case 'Acciones':
// 			return actionsDetails
// 		case 'Fondos':
// 			return fundsDetails
// 		default:
// 			return []
// 	}
// }

// const displayedData = getDisplayedData()

// const getCurrentTotalValue = () => {
// 	let totalValue = user?.currentAmount || 0 // Saldo disponible

// 	userInvestments?.forEach((investment) => {
// 		const { stockSymbol, quantity } = investment

// 		// Buscar el precio actual en cada tipo de inversión
// 		const matchedCedear = cedearsDetails.find((item) => (item as any).cedear === stockSymbol)
// 		const matchedBond = bondsDetails.find((item) => (item as any).cedear === stockSymbol)
// 		const matchedAction = actionsDetails.find((item) => (item as any).cedear === stockSymbol)
// 		const matchedFund = fundsDetails.find((item) => item.cedear === stockSymbol)

// 		// Obtener el precio actual (suponiendo que `price` es la propiedad con el precio actual)
// 		const currentPrice = (matchedCedear as any)?.price || (matchedBond as any)?.price || (matchedAction as any)?.price || (matchedFund as any)?.price || 0
// 		// console.log('currentPrice', currentPrice)

// 		// Sumar al total
// 		totalValue += quantity * currentPrice
// 	})

// 	return totalValue
// }

// const currentTotalValue = getCurrentTotalValue().toLocaleString('es-AR', {
// 	minimumFractionDigits: 2,
// 	maximumFractionDigits: 2
// })

// console.log('Valor total actual de los activos:', currentTotalValue)
