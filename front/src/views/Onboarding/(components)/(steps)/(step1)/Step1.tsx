import { useState } from "react"
import Styles from "./Step1.module.css"

interface Step0Props {
	nextStep: () => void;
  step:number
}
interface IFormdata{
  mainGoal: string
}
//deberia traerme las opciones desde el backend con id y valro de cada opcion
const mainGoalOptions = [
  "Selecciona una opción",
  'Retiro',
  'Comprar una casa',
  'Comprar un auto',
  'Viaje',
  'Otro'
]

export default function Step1({ nextStep, step }: Step0Props) {
	const [formData, setFormData] = useState<IFormdata>({
		mainGoal: ''
	})
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
    // enviar formData al backend
    nextStep()
  }
	return (
		<div className={Styles.contentContainer}>
			<form onSubmit={handleSubmit} className={Styles.formContainer}>
				<p> Paso {step} de 3</p>
				<label htmlFor='mainGoal' className={Styles.formContainer}>
					{' '}
					¿Cúal es tu objetivo a alcanzar con tus inversiones?
					<select name='mainGoal' id='mainGoal' onChange={handleChange} value={formData.mainGoal} defaultValue={'Selecciona una opción'}>
						{mainGoalOptions.map((goal, index) => (
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
