/* eslint-disable @typescript-eslint/no-unused-vars */
import styles from './PostCard.module.css'
import { ExampleObject } from '../../mocks/posts.mock'
import ShareIcon from '../../../../assets/icons/(community)/ShareIcon'
import BookmarkFullIcon from '../../../../assets/icons/(community)/BookmarkFullIcon'
import BookmarkIcon from '../../../../assets/icons/(community)/BookmarkIcon'
import { useState } from 'react'
import { contacts } from '../../mocks/contacts.mock'
import ContactCard from './ContactCard'
import BigLine from '../../../../assets/BigLine'
import { socials } from './socials'

type Props = {
	post: ExampleObject
}

export default function PostCard({ post }: Props) {
	const [showModal, setShowModal] = useState(false)
	const [isClosing, setIsClosing] = useState(false)


	
	console.log(post)
	const date = new Date(post.creationDate)
	const formattedDate = new Intl.DateTimeFormat('es-AR', {
		dateStyle: 'long' // Cambiar a 'long' para un formato más detallado
		// timeStyle: 'short'
	}).format(date)
	const [isBookmarked, setIsBookmarked] = useState(false)

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
				<h3 className={styles.title}>{post.title}</h3>
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
			<div className={styles.header}>
				<p>{post.userEntity.name}</p>
				<p>{formattedDate}</p>
			</div>
			<p className={styles.subtitle}>{post.subtitle}</p>
			<p>{post.text}</p>
			<p className={styles.categorypill}>{post.category}</p>
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
