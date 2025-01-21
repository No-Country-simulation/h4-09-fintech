import styles from './ContainerForoCards.module.css'
import PostCard from './ForoCard'
import { IForo } from '../mocks/foros.mock'

type Props = {
	foros: IForo[]
}

export default function ContainerForoCards({ foros }: Props) {

	return (
		<div className={styles.grid}>
			{foros.map((foro) => (
				<PostCard key={foro.id} foro={foro} />
			))}
		</div>
	)
}
