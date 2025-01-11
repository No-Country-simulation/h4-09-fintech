import { useState } from 'react'
import style from './Onboarding.module.css'
import Step1 from './(components)/(steps)/(step1)/Step1'
import Step0 from './(components)/(steps)/(step0)/Step0'
import { baseUrl } from '../../config/envs'
import { useFetchDataWithToken } from '../../hooks/useFetchDataWithToken'
import Step2 from './(components)/(steps)/(step2)/Step2'
import Step3 from './(components)/(steps)/(step3)/Step3'
import Step4 from './(components)/(steps)/(step4)/Step4'

export interface IFormdata {
	mainGoal: string
	riskPreference: string
	financialKnowledge: string
}

interface Iresponse {
	financialKnowledge: string[]
	mainGoal: string[]
	riskPreference: string[]
}

export default function Onboarding() {
	const [step, setStep] = useState(0)

	const [formData, setFormData] = useState<IFormdata>({
		mainGoal: '',
		riskPreference: '',
		financialKnowledge: ''
	})
	const nextStep = () => {
		setStep((step) => step + 1)
	}

	const response  =  useFetchDataWithToken<Iresponse>(`${baseUrl}/api/enums`).data
	// console.log(response);
	const mainGoalOptions = response?.mainGoal
	const financialKnowledgeOptions = response?.financialKnowledge
	const riskPreferenceOptions = response?.riskPreference

	return (
		<div className={style.onboardingview}>
			<h3>Creación de perfil de inversor</h3>
			{step === 0 && <Step0 nextStep={nextStep} />}
			{step === 1 && <Step1 nextStep={nextStep} step={step} formData={formData} setFormData={setFormData} options={mainGoalOptions} />}
			{step === 2 && <Step2 nextStep={nextStep} step={step} formData={formData} setFormData={setFormData} options={financialKnowledgeOptions} />}
			{step === 3 && <Step3 nextStep={nextStep} step={step} formData={formData} setFormData={setFormData} options={riskPreferenceOptions} />}
			{step === 4 && <Step4 formData={formData}  />}
		</div>
	)
}
