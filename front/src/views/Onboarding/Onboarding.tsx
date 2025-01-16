import { useState } from 'react'
import styles from './Onboarding.module.css'
import { baseUrl } from '../../config/envs'
import { onboardingSteps } from './(components)/steps'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../components/spiner/Spiner'
import IupiSmallIcon from '../../assets/icons/IupiSmallIcon'
import BigLine from '../../assets/BigLine'
import PigIcon from '../../assets/icons/PigIcon'
import BookIcon from '../../assets/icons/BookIcon'
import RiskIcon from '../../assets/icons/RiskIcon'
import { usePatchDataWithToken } from '../../hooks/usePatchDataWithToken'
// import Cookies from 'js-cookie'

interface IFormData {
	mainGoal: string
	financialKnowledge: string
	riskPreference: string
}
// const token = Cookies.get('authToken') // Recupera la cookie

export default function Onboarding() {
	const navigate = useNavigate()
	const { data, loading, error, patchData } = usePatchDataWithToken(`${baseUrl}/api/preferences`)
	const [stepIndex, setStepIndex] = useState(0) // Controla el índice del paso actual
	const [formData, setFormData] = useState<IFormData>({
		mainGoal: '',
		financialKnowledge: '',
		riskPreference: ''
	})
	const currentStep = onboardingSteps[stepIndex]

	const handleOptionChange = (value: string) => {
		const field = Object.keys(formData)[stepIndex] as keyof IFormData
		setFormData({ ...formData, [field]: value })
	}

	const handleNextStep = () => {
		if (stepIndex <= onboardingSteps.length - 1) {
			setStepIndex(stepIndex + 1)
		}
	}

	const handleBackStep = () => {
		if (stepIndex > 0) {
			setStepIndex(stepIndex - 1)
		}
	}

	const handleSubmit = async () => {
		console.log(formData)
		//send info to backend
		const response = await patchData(formData)
		console.log(response)
		console.log(data)

		if (error) {
			console.error(error)
			alert(`${error}`)
		}

		alert('formulario enviado')
		navigate('/dashboard')
	}

	const isNextButtonDisabled = !formData[Object.keys(formData)[stepIndex] as keyof IFormData]

	return (
		<div className={styles.onboardingview}>
			{stepIndex < onboardingSteps.length ? (
				<div className={styles.contentContainer}>
					<div className={styles.icon}>{<currentStep.icon />}</div>
					<h5 className={styles.title}>{currentStep.title}</h5>
					<span className={styles.subtitle}>{currentStep.subtitle}</span>
					<div className={styles.options}>
						{currentStep.options.map((option) => (
							<label key={option.value} className={styles.option}>
								<div className={styles.input}>
									<input
										type='radio' // Cambiar a radio si solo se permite seleccionar una opción
										value={option.value}
										checked={formData[Object.keys(formData)[stepIndex] as keyof IFormData] === option.value}
										onChange={() => handleOptionChange(option.value)}
									/>
									<div className={styles.text}>
										<span className={styles.value}>{option.value}</span>
										<small className={styles.helper}>{option.helper}</small>
									</div>
								</div>
							</label>
						))}
					</div>
					<div className={styles.buttons}>
						{stepIndex > 0 && (
							<button type='button' onClick={handleBackStep} className='secondaryButton'>
								Atrás
							</button>
						)}
						<button type='button' onClick={handleNextStep} disabled={isNextButtonDisabled} className={`${styles.buttonEnabled} ${isNextButtonDisabled ? styles.buttonDisabled : ''}`}>
							Siguiente
						</button>
					</div>
				</div>
			) : (
				<div className={styles.resumeContainer}>
					<IupiSmallIcon />
					<span className={styles.resumeSubtitle}>Este es tu perfil financiero personalizado.</span>
					<BigLine />
					<ul className={styles.list}>
						<li className={styles.listitem}>
							<span className={styles.listitemtitle}>Objetivo financiero:</span>
							<span className={styles.listitemvalue}>
								<PigIcon /> {formData.mainGoal}
							</span>
						</li>
						<li className={styles.listitem}>
							<span className={styles.listitemtitle}>Nivel de experiencia:</span>
							<span className={styles.listitemvalue}>
								{' '}
								<BookIcon /> {formData.financialKnowledge}
							</span>
						</li>
						<li className={styles.listitem}>
							<span className={styles.listitemtitle}>Toleracia al riesgo:</span>
							<span className={styles.listitemvalue}>
								<RiskIcon />
								{formData.riskPreference}
							</span>
						</li>
					</ul>
					<button type='button' onClick={handleSubmit} className='primaryButton'>
						{loading ? <Spinner /> : '¡Comienza a invertir!'}
					</button>
				</div>
			)}
		</div>
	)
}
