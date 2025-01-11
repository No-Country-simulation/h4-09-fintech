import { IFormdata } from '../../../Onboarding'
import Styles from './step4.module.css'
import { baseUrl } from '../../../../../config/envs'
import { usePostDataWithToken } from '../../../../../hooks/usePostDataWithToken'
import Spinner from '../../../../../components/spiner/Spiner'
import { useNavigate } from 'react-router-dom'

type Props = {
	formData: IFormdata
}
interface ApiResponse {
	message: string
}

export default function Step4({ formData }: Props) {
	const navigate = useNavigate()
	const { loading, error, postData } = usePostDataWithToken<ApiResponse>(`${baseUrl}/algo`)

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault()
		//enviar informacion al back
		const response = await postData(formData)
    console.log(response);
    
		navigate('/dashboard')
	}

	return (
		<div className={Styles.contentContainer}>
			<form onSubmit={handleSubmit} className={Styles.formContainer}>
				<p>Estas son tus respuestas</p>
				<p>Objetivo: {formData.mainGoal}</p>
				<p>Experiencia administrando inversiones: {formData.financialKnowledge}</p>
				<p>Perfil ante el riesgo: {formData.riskPreference}</p>
				{loading ? (
					<button type='submit'>
						<Spinner />
					</button>
				) : (
					<button type='submit'>Enviar</button>
				)}

				{error && <p> {error.message}</p>}
			</form>
		</div>
	)
}
