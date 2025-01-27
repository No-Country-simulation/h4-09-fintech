import React from 'react'
import { IContact } from '../../mocks/contacts.mock'
import Styles from './PostCard.module.css'

type Props = {
	contact: IContact
}

export default function ContactCard({ contact }: Props) {
	return (
		<div className={Styles.contactCard}>
			<img src={contact.avatarUrl} alt='contact-avatar' />
			<span>{contact.name}</span>
		</div>
	)
}
