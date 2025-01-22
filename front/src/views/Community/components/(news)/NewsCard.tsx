import styles from './NewsCard.module.css'
import { IApiArticle } from '../../mocks/news.mock'
import BookmarkIcon from '../../../../assets/icons/(community)/BookmarkIcon'
import BigerLine from '../../../../assets/BigerLine'
import { useState } from 'react'
import BookmarkFullIcon from '../../../../assets/icons/(community)/BookmarkFullIcon'
import { Link } from 'react-router-dom'
import ShareIcon from '../../../../assets/icons/(community)/ShareIcon'

type Props = {
	article: IApiArticle
}

export default function NewsCard({ article }: Props) {
	const [isBookmarked, setIsBookmarked] = useState(false)
	// console.log(article)

	const date = new Date(article.published_utc)
	const formattedDate = new Intl.DateTimeFormat('es-AR', {
		dateStyle: 'long' // Cambiar a 'long' para un formato más detallado
		// timeStyle: 'short'
	}).format(date)

	return (
		<div className={styles.card}>
			<div className={styles.header}>
				<div className={styles.headerSection}>
					<img src={article.publisher.favicon_url} className={styles.avatar} alt='avatar' />
					<h2 className={styles.source}>{article.publisher.name}</h2>
				</div>
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

			<h3 className={styles.title}>{article.title}</h3>
			<img src={article.image_url} alt='imagen' className={styles.img} />
			<p className={styles.subtitle}>
				<span>Tags: </span>
				{article.tickers.map((ticker) => (
					<span>{ticker}</span>
				))}
			</p>
			<p>{article.description}</p>
			<div style={{ display: 'flex', alignSelf: 'center', justifySelf: 'center' }}>
				<BigerLine />
			</div>
			<div className={styles.footer}>
				<span>{formattedDate}</span>
				<span className={styles.categorypill}>
					<Link to={article.article_url} target='_blank'>
						{' '}
						Visitar
					</Link>
				</span>
			</div>
		</div>
	)
}
