/* eslint-disable @typescript-eslint/no-unused-vars */
import styles from './NewsCard.module.css'
import { IApiArticle } from '../../mocks/news.mock'
import BookmarkIcon from '../../../../assets/icons/(community)/BookmarkIcon'
import BigerLine from '../../../../assets/BigerLine'
import { useState } from 'react'
import BookmarkFullIcon from '../../../../assets/icons/(community)/BookmarkFullIcon'
import { Link } from 'react-router-dom'
import ShareIcon from '../../../../assets/icons/(community)/ShareIcon'
import ContactCard from '../(forum)/ContactCard'
import { socials } from '../(forum)/socials'
import BigLine from '../../../../assets/BigLine'
import { contacts } from '../../mocks/contacts.mock'

type Props = {
	article: IApiArticle
}

export default function NewsCard({ article }: Props) {
		const [showModal, setShowModal] = useState(false)
		const [isClosing, setIsClosing] = useState(false)
	const [isBookmarked, setIsBookmarked] = useState(false)

	const date = new Date(article.published_utc)
	const formattedDate = new Intl.DateTimeFormat('es-AR', {
		dateStyle: 'long' // Cambiar a 'long' para un formato más detallado
		// timeStyle: 'short'
	}).format(date)

		const handleShowShare = () => {
			setShowModal(true)
		}

		const handleCancelShare = () => {
			setIsClosing(true)
			setTimeout(() => {
				setShowModal(false)
				setIsClosing(false)
			}, 400) // Tiempo de la animación
		}

	return (
		<div className={styles.card}>
			<div className={styles.header}>
				<div className={styles.headerSection}>
					<img src={article.publisher.favicon_url} className={styles.avatar} alt='avatar' />
					<h2 className={styles.source}>{article.publisher.name}</h2>
				</div>
				<div className={styles.headerSection}>
					<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} onClick={handleShowShare}>
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
			{/* Modal para confirmar omisión */}
			{showModal && (
				<div className={styles.modalOverlay} onClick={handleCancelShare}>
					<div className={`${styles.modal} ${isClosing ? styles.modalClosing : styles.modalVisible}`}>
						<small>Los enlaces que compartes están asociados a ti y se pueden usar para mejorar las sugerencias y anuncios que ves. Más Información</small>
						<input type='text' name='contact' id='contact' placeholder='Buscar Contatos' />
						<p>Compartir con </p>
						<div className={styles.contactsContainer}>
							{contacts.map((contact) => (
								<ContactCard key={contact.id} contact={contact} />
							))}
						</div>
						<BigLine />
						<div className={styles.contactsContainer}>
							{socials.map((social) => (
								<ContactCard key={social.id} contact={social} />
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
