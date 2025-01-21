import styles from './NewsCard.module.css'
import { INew } from '../mocks/news.mock'
// import ShareIcon from '../../../assets/icons/(community)/ShareIcon'
import BookmarkIcon from '../../../assets/icons/(community)/BookmarkIcon'
import BigerLine from '../../../assets/BigerLine'
import { useState } from 'react'
import BookmarkFullIcon from '../../../assets/icons/(community)/BookmarkFullIcon'

type Props = {
	notice: INew
}

export default function NewsCard({ notice }: Props) {
	const [isBookmarked, setIsBookmarked] = useState(false)

	return (
		<div className={styles.card}>
			<div className={styles.header}>
				<div className={styles.headerSection}>
					<img src={notice.avatar} className={styles.avatar} alt='avatar' />
					<h2 className={styles.source}>{notice.source}</h2>
				</div>
				<div className={styles.headerSection}>
					{/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
						<ShareIcon />
					</div> */}
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
			<h3 className={styles.title}>{notice.title}</h3>
			<img src={notice.img} alt='imagen' className={styles.img} />
			<p className={styles.subtitle}>{notice.subtitle}</p>
			<p>{notice.description}</p>
			<div style={{ display: 'flex', alignSelf: 'center', justifySelf: 'center' }}>
				<BigerLine />
			</div>
			<div className={styles.footer}>
				<span>{notice.creationDate}</span>
				<span className={styles.categorypill}>{notice.category}</span>
			</div>
		</div>
	)
}
