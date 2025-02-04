import React, { useState } from 'react'
import '../GestionInversiones.css'
import { IUnifyInvestment, IUser } from '../utils'
import { baseUrl } from '../../../config/envs'
import Spinner from '../../../components/spiner/Spiner'
import { usePostDataWithToken } from '../../../hooks/usePostDataWithToken'
// import Spinner from '../../../components/spiner/Spiner'

interface newInvestmentCardProps {
	investment: IUnifyInvestment
	user: IUser | null
}

const NewInvestmentCard: React.FC<newInvestmentCardProps> = ({ investment, user }) => {
	const [selectedAmount, setSelectedAmount] = useState<number>(1)
	const { loading, error, postData } = usePostDataWithToken(`${baseUrl}/api/stocks/buy`)
	const [showModal, setShowModal] = useState(false)
	const [isBuying, setIsBuying] = useState(false)
	const handleShowModal = () => {
		setShowModal(true)
	}
	const handleCancelModal = () => {
		setShowModal(false)
		setSelectedAmount(1)
	}

	const handleConfirmBuy = async () => {
		if (!user || isBuying) return
		if (selectedAmount > maxUnits) return

		setIsBuying(true)

		const body = {
			quantity: selectedAmount,
			pricePerUnit: investment.price,
			stockSymbol: investment.name,
			stockName: investment.description
		}

		const buyingPrice = selectedAmount * investment.price
		const negativeBuyingPrice = -buyingPrice

		console.log('user founds', user.currentAmount)
		console.log('buying price', buyingPrice)
		console.log('new user founds', user.currentAmount - buyingPrice)

		try {
			console.log(negativeBuyingPrice)
			console.log(body)

			await postData(body) // Registra la compra
		} catch (error) {
			console.error('Error en la compra:', error)
		} finally {
			setShowModal(false)
			setIsBuying(false) // Permite futuras compras
			window.location.reload()
		}
	}

	// Calcular la cantidad máxima que se puede comprar
	const maxUnits = user?.currentAmount ? Math.floor(user.currentAmount / investment.price) : 0

	const buttonDisabled = selectedAmount > maxUnits || selectedAmount < 1

	return (
		<>
			<div className='card' onClick={handleShowModal}>
				<div className='cardHeader'>
					<p className='cardTitle'>{investment.description}</p>
					<p className='clave'>{investment.name}</p>
				</div>
				<div className='cardHeader'>
					<p>Precio: ${investment.price.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
					<div className='porcentajes'>
						<p>
							Variación último mes <span className={investment.percentageLastMonth > 0 ? 'subida' : 'bajada'}>{investment.percentageLastMonth}%</span>
						</p>
						<p>
							Variación último año <span className={investment.percentageLastYear > 0 ? 'subida' : 'bajada'}>{investment.percentageLastYear}%</span>
						</p>
					</div>
				</div>
			</div>
			{showModal && (
				<div className='modalOverlay' onClick={handleCancelModal}>
					<div className='modal' onClick={(event) => event.stopPropagation()}>
						{error ? <div className='error'>Hubo un error al procesar tu compra</div> : null}
						<h5 className='body2'>¿Deseas comprar esta inversión?</h5>
						<span>
							Tus fondos: $
							{user?.currentAmount?.toLocaleString('es-AR', {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2
							})}
						</span>
						<span>Precio unitario: ${investment.price.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
						<span>
							Máximo que puedes comprar: <b>{maxUnits}</b> unidades
						</span>
						<div className='inputContainer'>
							<label htmlFor='amount'>Cantidad a comprar:</label>
							<input type='number' id='amount' min={1} max={maxUnits} value={selectedAmount} onChange={(e) => setSelectedAmount(Number(e.target.value))} />
						</div>
						<div className='modalButtons'>
							<button type='button' onClick={handleConfirmBuy} className={buttonDisabled ? 'disabledButton' : 'secondaryButton'} disabled={buttonDisabled}>
								{loading ? <Spinner /> : 'Comprar'}
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

export default NewInvestmentCard
