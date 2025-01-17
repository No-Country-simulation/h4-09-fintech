import { useState } from 'react'
import { useNavigate } from 'react-router-dom' // Importa useNavigate para redirecciones
import IupiBigIcon from '../../assets/icons/(iupi)/IupiBigIcon'
import styles from './landing.module.css'
import Intro1Icon from '../../assets/icons/(intro)/Intro1Icon'
import Intro2Icon from '../../assets/icons/(intro)/Intro2Icon'
import Intro3Icon from '../../assets/icons/(intro)/Intro3Icon'

export default function Landing() {
	const [isLanding, setIsLanding] = useState(true)
	const [step, setStep] = useState(0) // Estado para el paso actual
	const navigate = useNavigate()

	const steps = [
		{
			icon: <Intro1Icon />,
			title: '¡Toma el control de tus finanzas!',
			text: 'Organízate y descubre las mejores oportunidades para hacer crecer tu patrimonio.'
		},
		{
			icon: <Intro2Icon />,
			title: '¡Haz que tu dinero trabaje para ti!',
			text: 'Accede a opciones financieras avanzadas, como ETFs y bonos locales, sin complicaciones.'
		},
		{
			icon: <Intro3Icon />,
			title: '¡Simplifica tu futuro en un solo lugar!',
			text: 'Administra tus ahorros e inversiones con herramientas claras y personalizadas para tus metas.'
		}
	]

	const handleNextStep = () => {
		if (step < steps.length - 1) {
			setStep(step + 1)
		} else {
			localStorage.setItem('firstTime', 'true')
			navigate('/auth')
		}
	}
	const startIntro = () => {
		const isNotFirstTime = localStorage.getItem('firstTime')
		if (isNotFirstTime) {
			navigate('/auth')
		}
		setIsLanding(false)
	}

	return (
		<div className={styles.pageview}>
			{isLanding ? (
				<div className={styles.pageview}>
					<div className={styles.landingview}>
						<IupiBigIcon />
						<button type='button' className='secondaryButton' onClick={startIntro}>
							Comenzar
						</button>
					</div>
				</div>
			) : (
				<StepContent step={steps[step]} onNext={handleNextStep} />
			)}
		</div>
	)
}

interface StepContentProps {
	step: { icon: JSX.Element; title: string; text: string }
	onNext: () => void
}

const StepContent = ({ step, onNext }: StepContentProps) => {
	return (
		<div className={styles.stepsview}>
			<div className={styles.contentcontainer}>
				<div>{step.icon}</div>
				<h5>{step.title}</h5>
				<span>{step.text}</span>
			</div>
			<button type='button' onClick={onNext} className='primaryButton'>
				Siguiente
			</button>
		</div>
	)
}
