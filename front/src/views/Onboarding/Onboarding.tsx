import { useState } from 'react'
import styles from './onboarding.module.css'
import { baseUrl } from '../../config/envs'
import { onboardingSteps } from './(components)/steps'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../components/spiner/Spiner'
import IupiSmallIcon from '../../assets/icons/(iupi)/IupiSmallIcon'
import BigLine from '../../assets/BigLine'
import PigIcon from '../../assets/icons/(onboarding)/PigIcon'
import BookIcon from '../../assets/icons/(onboarding)/BookIcon'
import RiskIcon from '../../assets/icons/(onboarding)/RiskIcon'
import { usePatchDataWithToken } from '../../hooks/usePatchDataWithToken'
import GoBackIcon from '../../assets/icons/GoBackIcon'
import CompleteQuestions from '../../assets/icons/(onboarding)/CompleteQuestions'
// import Cookies from 'js-cookie'

export interface IFormData {
	mainGoal: string
	financialKnowledge: string
	riskPreference: string
	onboardingComplete: boolean
}
// const token = Cookies.get('authToken') // Recupera la cookie

export default function Onboarding() {
	const navigate = useNavigate()
	const { loading, error, patchData } = usePatchDataWithToken(`${baseUrl}/api/preferences`)
	const [stepIndex, setStepIndex] = useState(0)
	const [formData, setFormData] = useState<IFormData>({
		mainGoal: '',
		financialKnowledge: '',
		riskPreference: '',
		onboardingComplete: false
	})

	const [showModal, setShowModal] = useState(false)

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
		setFormData((prevFormData) => ({
			...prevFormData,
			onboardingComplete: true
		}))
		const updatedFormData = {
			...formData,
			onboardingComplete: true
		}
		console.log(updatedFormData)
		//send info to backend
		await patchData(updatedFormData)

		if (error) {
			console.error(error)
			alert(`${error}`)
		}

		alert('formulario enviado')
		navigate('/dashboard')
	}

	const handleSkip = () => {
		setShowModal(true)
	}

	const handleConfirmSkip = async () => {
		await patchData(formData)
		navigate('/dashboard')
	}

	const handleCancelSkip = () => {
		setShowModal(false)
	}

	const isNextButtonDisabled = !formData[Object.keys(formData)[stepIndex] as keyof IFormData]

	return (
		<div className={styles.onboardingview}>
			{stepIndex < onboardingSteps.length ? (
				<div className={styles.contentContainer}>
					{stepIndex > 0 && stepIndex < 3 && (
						<p onClick={handleBackStep} className={styles.buttonSkip}>
							<GoBackIcon />
						</p>
					)}
					<div className={styles.icon}>{<currentStep.icon />}</div>
					<h5 className='body2'>{currentStep.title}</h5>
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
						<button type='button' onClick={handleNextStep} disabled={isNextButtonDisabled} className={`${styles.buttonEnabled} ${isNextButtonDisabled ? styles.buttonDisabled : ''}`}>
							Siguiente
						</button>
						<button type='button' onClick={handleSkip} className='secondaryButton'>
							Omitir
						</button>
					</div>
				</div>
			) : (
				<div className={styles.background}>
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
				</div>
			)}
			{/* Modal para confirmar omisión */}
			{showModal && (
				<div className={styles.modalOverlay} onClick={handleCancelSkip}>
					<div className={styles.modal}>
						<CompleteQuestions />
						<h5 className='body2'>¡Completa las preguntas!</h5>
						<span>Necesitamos que respondas las preguntas restantes para crear tu perfil financiero personalizado y aprovechar al máximo tu experiencia con IUPI.</span>
						<div className={styles.modalButtons}>
							<button type='button' onClick={handleConfirmSkip} className='secondaryButton'>
								{loading ? <Spinner /> : 'Saltar'}
							</button>
							<button type='button' onClick={handleCancelSkip} className='primaryButton'>
								Continuar con las preguntas
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
