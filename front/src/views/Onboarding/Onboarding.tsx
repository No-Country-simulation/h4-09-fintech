import { useState } from 'react'
import style from './Onboarding.module.css'
import Step1 from './(components)/(steps)/(step1)/Step1'
import Step0 from './(components)/(steps)/(step0)/Step0'

export default function Onboarding() {
	const [step, setStep] = useState(0)

	const nextStep = () => {
		setStep((step) => step + 1)
	}
	// const prevStep = () => {
	// 	setStep((step) => step - 1)
	// }

	return (
		<div className={style.onboardingview}>
			<h3>Creación de perfil de inversor</h3>
			{step === 0 && <Step0 nextStep={nextStep} />}
			{step === 1 && <Step1 nextStep={nextStep} step={step} />}
		</div>
	)
}
