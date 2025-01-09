import style from './Step0.module.css';
interface Step0Props {
  nextStep: () => void;
}
export default function Step0({nextStep}: Step0Props) {
  return (
		<div className={style.contentContainer}>
			<p>A continuación te haremos un breve cuestionario para definir tu perfil de inversor.</p>
			<p>Con esta información, podremos recomendarte una cartera de inversiones que se ajuste a tu perfil.</p>
			<div>
				<button type='button' onClick={nextStep}>Comenzar cuestionario</button>
			</div>
		</div>
	)
}