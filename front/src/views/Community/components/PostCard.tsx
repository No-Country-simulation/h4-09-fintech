import styles from './PostCard.module.css'
import { IPost } from '../mocks/posts'
import { Link } from 'react-router-dom'

type Props = {
	post: IPost
}

export default function PostCard({ post }: Props) {
	

	return (
		<Link to={`/community/forum/${post.id}`}>
			<div className={styles.card}>
				<h3>{post.title}</h3>
				<h5>{post.subtitle}</h5>
				<p>{post.text}</p>
				<span>Creado por: {post.creationUser}</span>
			</div>
		</Link>
	)
}
