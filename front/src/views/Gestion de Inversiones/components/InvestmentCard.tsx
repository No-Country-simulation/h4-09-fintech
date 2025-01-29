import React, { useState } from 'react'
import '../GestionInversiones.css'
import { IUser } from '../GestionInversiones'
import { usePatchDataWithToken } from '../../../hooks/usePatchDataWithToken'
import { baseUrl } from '../../../config/envs'
import Spinner from '../../../components/spiner/Spiner'
import { usePostDataWithToken } from '../../../hooks/usePostDataWithToken'
// import Spinner from '../../../components/spiner/Spiner'

interface InvestmentCardProps {
	name: string
	cedear: string
	price: number
	percentageLastMonth: number
	percentageLastYear: number
	user: IUser | null
}

const InvestmentCard: React.FC<InvestmentCardProps> = ({ name, cedear, price, percentageLastMonth, percentageLastYear, user }) => {
	const [selectedAmount, setSelectedAmount] = useState<number>(1)
	const { loading, error, patchData } = usePatchDataWithToken(`${baseUrl}/api/user/add_funds`)
  const { postData } = usePostDataWithToken(`${baseUrl}/api/stocks/buy`)
	const [showModal, setShowModal] = useState(false)
	const handleShowModal = () => {
		setShowModal(true)
	}
	const handleCancelModal = () => {
		setShowModal(false)
		setSelectedAmount(1)
	}

	const handleConfirmBuy = async () => {
		if (!user) return
		if (selectedAmount > maxUnits) return
    const body = {
      quantity: selectedAmount,
      pricePerUnit: price,
      stockSymbol: cedear,
      stockName: name,
    }

		const buyingPrice = selectedAmount * price
		const negativeBuyingPrice = -buyingPrice
    //solicitud que le reduce el saldo al usuario
		const response = await patchData({ amount: negativeBuyingPrice })
    //solicitud que le agrega la cantidad de acciones al usuario
    const buyResponse = await postData(body)
    console.log(buyResponse);
		console.log(response)
		setShowModal(false)
		window.location.reload()
	}

	// Calcular la cantidad máxima que se puede comprar
	const maxUnits = user?.currentAmount ? Math.floor(user.currentAmount / price) : 0

	const buttonDisabled = selectedAmount > maxUnits || selectedAmount < 1

	return (
		<>
			<div className='card' onClick={handleShowModal}>
				<div className='cardHeader'>
					<p className='cardTitle'>{name}</p>
					<p className='clave'>{cedear}</p>
				</div>
				<div className='cardHeader'>
					<p>Precio: ${price.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
					<div className='porcentajes'>
						<p>
							Variación último mes <span className={percentageLastMonth > 0 ? 'subida' : 'bajada'}>{percentageLastMonth}%</span>
						</p>
						<p>
							Variación último año <span className={percentageLastYear > 0 ? 'subida' : 'bajada'}>{percentageLastYear}%</span>
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
						<span>Precio unitario: ${price.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
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

export default InvestmentCard
