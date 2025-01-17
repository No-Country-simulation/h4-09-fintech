import OnboardingIcon1 from "../../../assets/icons/(onboarding)/OnboardingIcon1"
import OnboardingIcon2 from '../../../assets/icons/(onboarding)/OnboardingIcon2'
import OnboardingIcon3 from '../../../assets/icons/(onboarding)/OnboardingIcon3'

// interface Ioptions {
// 	value: string
// 	helper?: string
// }

// export interface Isteps {
//   icon: ReactNode
// 	title: string
// 	subtitle: string
// 	options: Ioptions[]
// }

export const onboardingSteps = [
	{
		icon: OnboardingIcon1,
		title: '¿Qué metas te gustaría lograr con iupi?',
		subtitle: 'Selecciona tu objetivo financiero principal:',
		options: [
			{
				value: 'Retiro',
				helper: 'Mi objetivo es a muy largo plazo'
			},
			{
				value: 'Comprar una casa',
				helper: 'Mi objetivo es a largo plazo'
			},
			{
				value: 'Comprar un auto',
				helper: 'Mi objetivo es a mediano plazo'
			},
			{
				value: 'Vacaciones',
				helper: 'Mi objetivo es a corto plazo'
			},
			{
				value: 'Otros',
				helper: 'No lo tengo definido'
			}
		]
	},
	{
    icon: OnboardingIcon2,
		title: '¿Cuál es tu nivel de experiencia con las finanzas e inversiones?',
		subtitle: 'Selecciona la opción que mejor te describa:',
		options: [
			{
				value: 'Básico',
				helper: 'Quiero aprender lo básico.'
			},
			{
				value: 'Intermedio',
				helper: 'Tengo algo de experiencia invirtiendo.'
			},
			{
				value: 'Avanzado',
				helper: 'Conozco instrumentos financieros complejos.'
			}
		]
	},
	{
    icon: OnboardingIcon3,
		title: '¿Cómo te sientes al asumir riesgos financieros?',
		subtitle: 'Elige la opción que mejor refleje tu preferencia:',
		options: [
			{
				value: 'Conservador',
				helper: 'Prefiero opciones seguras y estables.'
			},
			{
				value: 'Moderado',
				helper: 'Acepto la aventura para obtener mejor utilidad.'
			},
			{
				value: 'Arriesgado',
				helper: 'Asumir riesgos elevados por mayores ganancias.'
			}
		]
	}
]
