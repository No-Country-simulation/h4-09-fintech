import { IFundsData, INotFunds, IUserInvestment } from '../GestionInversiones'
import '../GestionInversiones.css'

type Props = {
	userInvestment: IUserInvestment
	similarStock?: IFundsData | INotFunds | undefined
}

export default function UserInvestmentCard({ userInvestment, similarStock }: Props) {
	const currentPrice = similarStock && 'price' in similarStock ? (similarStock as IFundsData).price : undefined

	// Calcula la variación en porcentaje
	const variationPercentage = currentPrice !== undefined ? ((currentPrice - userInvestment.pricePerUnit) / userInvestment.pricePerUnit) * 100 : undefined

	// Determina el color según la variación
	const variationColor = variationPercentage !== undefined ? (variationPercentage > 0 ? 'green' : variationPercentage < 0 ? 'red' : 'blue') : 'gray'

	return (
		<div className='userInvestmentCard'>
			<div className='cardHeader'>
				<p className='cardTitle'>{userInvestment.stockName}</p>
				<p className='clave'>{userInvestment.stockSymbol}</p>
			</div>
			<div className='cardHeader'>
				<p>
					Precio de compra: $
					{userInvestment.pricePerUnit.toLocaleString('es-AR', {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2
					})}
				</p>

				<p>Cantidad: {userInvestment.quantity}</p>
			</div>
			<div className='cardHeader'>
				<p>
					Precio actual:{' '}
					{currentPrice !== undefined
						? `$${currentPrice.toLocaleString('es-AR', {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2
						  })}`
						: 'Cargando...'}
				</p>
				{/* Muestra la variación en porcentaje */}
				{variationPercentage !== undefined && (
					<p style={{ color: variationColor }}>
						{' '}
						Variación {variationPercentage > 0 ? '+' : ''}
						{variationPercentage.toLocaleString('es-AR', {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2
						})}
						%
					</p>
				)}
			</div>
			<div className='cardHeader'>
				<button type='button'  >Vender</button>
			</div>
		</div>
	)
}
