import React from 'react'
import { IFormData } from '../../../Onboarding'
import Styles from './Step2.module.css'

type Props = {
	nextStep: () => void
	step: number
	formData: IFormData
	setFormData: React.Dispatch<React.SetStateAction<IFormData>>
	options: string[] | undefined
}

export default function Step2({ nextStep, step, formData, setFormData, options }: Props) {
	const handleChange = (e: { target: { name: string; value: string } }) => {
		const { name, value } = e.target
		setFormData((data: IFormData) => ({
			...data,
			[name]: value
		}))
	}

	const handleSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault()
		console.log(formData)
		nextStep()
	}

	return (
		<div className={Styles.contentContainer}>
			<form onSubmit={handleSubmit} className={Styles.formContainer}>
				<p> Paso {step} de 3</p>
				<label htmlFor='financialKnowledge' className={Styles.formContainer}>
					{' '}
					¿Qué nivel de experiencia tienes en administrar cartera de inversiones?
					<select name='financialKnowledge' id='financialKnowledge' onChange={handleChange} value={formData.financialKnowledge}>
						<option value='' disabled>
							Selecciona una opción
						</option>
						{options?.map((goal, index) => (
							<option key={index} value={goal}>
								{goal}
							</option>
						))}
					</select>
				</label>
				<button type='submit'>Siguiente</button>
			</form>
		</div>
	)
}