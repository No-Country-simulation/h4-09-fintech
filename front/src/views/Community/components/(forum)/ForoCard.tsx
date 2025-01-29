import styles from './ForoCard.module.css'
import { IForo } from '../../mocks/foros.mock'
// import ShareIcon from '../../../assets/icons/(community)/ShareIcon'
import BookmarkIcon from '../../../../assets/icons/(community)/BookmarkIcon'
import BookmarkFullIcon from '../../../../assets/icons/(community)/BookmarkFullIcon'
import { useState } from 'react'
import { Link } from 'react-router-dom'

type Props = {
	foro: IForo
}

export default function ForoCard({ foro }: Props) {
	const [isBookmarked, setIsBookmarked] = useState(false)

	return (
		<div className={styles.card}>
			<div className={styles.header}>
				<div className={styles.headerSection}>
					<img src={foro.avatar} className={styles.avatar} alt='avatar' />
					<h3 className={styles.title}>{foro.title}</h3>
				</div>
				<div className={styles.headerSection}>
					{/* <ShareIcon /> */}
					{isBookmarked ? (
						<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} onClick={() => setIsBookmarked(false)}>
							<BookmarkFullIcon />
						</div>
					) : (
						<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} onClick={() => setIsBookmarked(true)}>
							<BookmarkIcon />
						</div>
					)}
				</div>
			</div>
			<img src={foro.img} alt='imagen' className={styles.img} />
			<p>{foro.description}</p>
			<Link to={`/community/forum/${foro.category}`} className={styles.createButton}>
				¡Únete ahora!
			</Link>
		</div>
	)
}
