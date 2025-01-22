import styles from './PostCard.module.css'
import { IPost } from '../../mocks/posts.mock'
import ShareIcon from '../../../../assets/icons/(community)/ShareIcon'
import BookmarkFullIcon from '../../../../assets/icons/(community)/BookmarkFullIcon'
import BookmarkIcon from '../../../../assets/icons/(community)/BookmarkIcon'
import { useState } from 'react'

type Props = {
	post: IPost
}

export default function PostCard({ post }: Props) {
	console.log(post)
	const date = new Date(post.creationDate)
	const formattedDate = new Intl.DateTimeFormat('es-AR', {
		dateStyle: 'long' // Cambiar a 'long' para un formato más detallado
		// timeStyle: 'short'
	}).format(date)
	const [isBookmarked, setIsBookmarked] = useState(false)
	return (
		<div className={styles.card}>
			<div className={styles.header}>
				<h3 className={styles.title}>{post.title}</h3>
				<div className={styles.headerSection}>
					<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
						<ShareIcon />
					</div>
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
			<div className={styles.header}>
				<p>{post.creationUser}</p>
				<p>{formattedDate}</p>
			</div>
			<p className={styles.subtitle}>{post.subtitle}</p>
			<p>{post.text}</p>
			<p className={styles.categorypill}>{post.category}</p>
		</div>
	)
}
