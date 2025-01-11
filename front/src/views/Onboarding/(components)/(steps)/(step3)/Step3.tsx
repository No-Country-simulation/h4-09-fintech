import Styles from './Step3.module.css'
import { IFormdata } from '../../../Onboarding'

interface Step0Props {
	nextStep: () => void
	step: number
	formData: IFormdata
	setFormData: React.Dispatch<React.SetStateAction<IFormdata>>
	options: string[] | undefined
}

export default function Step3({ nextStep, step, formData, setFormData, options }: Step0Props) {
	const handleChange = (e: { target: { name: string; value: string } }) => {
		const { name, value } = e.target
		setFormData((data) => ({
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
				<label htmlFor='riskPreference' className={Styles.formContainer}>
					{' '}
					En cuanto al riesgo que estas dispuesto a asumir en tus inversiones, dirías que tienes un perfil:
					<select name='riskPreference' id='riskPreference' onChange={handleChange} value={formData.riskPreference}>
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
