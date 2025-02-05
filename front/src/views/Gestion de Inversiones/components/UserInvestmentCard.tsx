import { useState } from 'react'
import { IFundsData, INotFunds, IUnifyInvestment } from '../utils'
import '../GestionInversiones.css'
import { baseUrl } from '../../../config/envs'
import { usePatchDataWithToken } from '../../../hooks/usePatchDataWithToken'
import Spinner from '../../../components/spiner/Spiner'

export interface IUserInvestmentCardProp {
	id: number
	pricePerUnitBuy: number
	pricePorUnitNow: number
	quantity: number
	stockName: string
	stockSymbol: string
	totalCostBuy: number
	totalCostNow: number
	transactionDate: string
}

type Props = {
	userInvestment: IUserInvestmentCardProp
	similarStock?: IFundsData | INotFunds | undefined | IUnifyInvestment
}

export default function UserInvestmentCard({ userInvestment, similarStock }: Props) {
	// const currentPrice = similarStock && 'price' in similarStock ? (similarStock as IFundsData).price : undefined
	// Calcula la variación en porcentaje
	const variationPercentage = userInvestment.pricePerUnitBuy/ userInvestment.pricePorUnitNow - 1
	// Determina el color según la variación
	const variationColor = variationPercentage !== undefined ? (variationPercentage > 0 ? 'green' : variationPercentage < 0 ? 'red' : 'blue') : 'gray'
	// console.log('userInvestment', userInvestment)
	// console.log('similarStock', similarStock)
	const { loading, error, patchData } = usePatchDataWithToken(`${baseUrl}/api/stocks/transactions/${userInvestment.id}`)
	const { data: dataFunds, loading: loadingFunds, error: errorFunds, patchData: patchDataFunds } = usePatchDataWithToken(`${baseUrl}/api/user/add_funds`)
	const [showModal, setShowModal] = useState(false)
	const handleShowModal = () => {
		setShowModal(true)
	}
	const handleCancelModal = () => {
		setShowModal(false)
	}
	const [quantityToSell, setQuantityToSell] = useState<number>(1)

	const handleSell = async () => {
		console.log('userInvestment tosell', userInvestment)
		console.log('quantityToSell', quantityToSell)
		if (quantityToSell > userInvestment.quantity) {
			alert('No puedes vender más acciones de las que tienes')
			return
		}

		await patchData({ quantity: quantityToSell })
		// console.log(data)
		// console.error(error)
		if (error) {
			console.error(error)
			alert('Hubo un error al realizar la operación')
		}

		await patchDataFunds({ amount: quantityToSell * userInvestment.pricePorUnitNow })
		console.log(dataFunds)

		alert('Operación realizada con éxito')
		window.location.reload()
	}

	return (
		<>
			<div className='userInvestmentCard'>
				<div className='cardHeader'>
					<p className='cardTitle'>{userInvestment.stockName}</p>
					<p className='clave'>{userInvestment.stockSymbol}</p>
				</div>
				<div className='cardHeader'>
					<p>
						Precio de compra: $
						{userInvestment.pricePerUnitBuy.toLocaleString('es-AR', {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2
						})}
					</p>

					<p>Cantidad: {userInvestment.quantity}</p>
				</div>
				<div className='cardHeader'>
					<p>
						Precio actual:{' '}
						{userInvestment.pricePorUnitNow}
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
					<button type='button' onClick={handleShowModal}>
						Vender
					</button>
				</div>
			</div>
			{showModal && (
				<div className='modalOverlay' onClick={handleCancelModal}>
					<div className='modal' onClick={(event) => event.stopPropagation()}>
						{error ? <div className='error'>Hubo un error al procesar tu venta</div> : null}
						{errorFunds ? <div className='error'>Hubo un error al procesar tu venta</div> : null}
						<h5 className='body2'>¿Deseas vender esta inversión?</h5>

						<span>
							Precio unitario actual:{' '}
							{similarStock && 'price' in similarStock ? `$${(similarStock as IFundsData).price.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 'N/A'}
						</span>
						<span>
							Unidades disponibles: <b>{userInvestment.quantity}</b>
						</span>
						<div className='inputContainer'>
							<label htmlFor='amount'>Cantidad a vender:</label>
							<input type='number' id='amount' min={1} max={userInvestment.quantity} value={quantityToSell} onChange={(e) => setQuantityToSell(Number(e.target.value))} />
						</div>
						<br />
						<span>
							Te acreditaremos: ${' '}
							{(quantityToSell * (similarStock && 'price' in similarStock ? (similarStock as IFundsData).price : 0)).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
						</span>
						<div className='modalButtons'>
							<button type='button' onClick={handleSell} className='secondaryButton'>
								{loading || loadingFunds ? <Spinner /> : 'Vender'}
							</button>
							<button type='button' onClick={handleCancelModal} className='primaryButton'>
								Cancelar
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
