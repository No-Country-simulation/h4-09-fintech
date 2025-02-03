// export interface IUser {
// 	currentAmount: number
// 	financialKnowledge: null | string
// 	lastName: string
// 	mainGoal: null | string
// 	name: string
// 	onboardingComplete: boolean
// 	riskPreference: null | string
// 	userId: string
// 	username: string
// }

// export interface IpreData {
// 	symbol: string
// 	description: string
// }

// export interface InvestmentType {
// 	name: string
// 	link: string
// }
// export const investmentsTypes: InvestmentType[] = [
// 	{ name: 'Cedears', link: 'cedears' },
// 	{ name: 'Bonos', link: 'bonds' },
// 	{ name: 'Fondos', link: 'investment-funds' },
// 	{ name: 'Acciones', link: 'actions' }
// ]
// export interface INotFunds {
// 	// clave: string
// 	data: {
// 		cedear: string
// 		name: string
// 		percentageLastMonth: number
// 		percentageLastYear: number
// 		price: number
// 	}
// }
// export interface IFundsData {
// 	cedear: string
// 	name: string
// 	percentageLastMonth: number
// 	percentageLastYear: number
// 	price: number
// }
// export interface IUserInvestment {
// 	id?: number
// 	quantity: number
// 	stockSymbol: string
// 	stockName: string
// 	pricePerUnit: number
// 	totalCost: number
// 	transactionDate: string
// }

// export const getInvestmentRecommendation = (riskPreference: string | undefined | null) => {
// 	switch (riskPreference) {
// 		case 'Arriesgado':
// 			return 'Acciones'
// 		case 'Moderado':
// 			return 'Cedears y Bonos'
// 		default:
// 			return 'Fondos'
// 	}
// }
