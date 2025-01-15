import Styles from './Step1.module.css'
import { IFormdata } from '../../../Onboarding'

interface Step0Props {
	nextStep: () => void
	step: number
	formData: IFormdata
	setFormData: React.Dispatch<React.SetStateAction<IFormdata>>
	options: string[] | undefined
}

export default function Step1({ nextStep, step, formData, setFormData, options }: Step0Props) {
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
				<h5> </h5>
				<label htmlFor='mainGoal' className={Styles.formContainer}>
					{' '}
					¿Cúal es tu objetivo a alcanzar con tus inversiones?
					<select name='mainGoal' id='mainGoal' onChange={handleChange} value={formData.mainGoal}>
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
