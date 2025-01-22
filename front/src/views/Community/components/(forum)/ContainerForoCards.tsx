import styles from './ContainerForoCards.module.css'
import ForoCard from './ForoCard'
import { IForo } from '../../mocks/foros.mock'

type Props = {
	foros: IForo[]
}

export default function ContainerForoCards({ foros }: Props) {
	return (
		<div className={styles.grid}>
			{foros.map((foro) => (
				<ForoCard key={foro.id} foro={foro} />
			))}
		</div>
	)
}
