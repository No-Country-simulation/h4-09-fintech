import { Link, useParams } from 'react-router-dom'
import { posts } from '../../mocks/posts'
import styles from './PostView.module.css'
import GoBackIcon from '../../../../assets/icons/GoBackIcon'
export default function PostView() {
	const params = useParams()
	const post = posts.find((post) => post.id === Number(params.id))
	console.log(post)

	return (
		<div className={styles.pageView}>
			<div className={styles.contentContainer}>
				<Link to={'/community/forum'}>
					{' '}
					<GoBackIcon />{' '}
				</Link>
				<h2 className={styles.title}>{post?.title}</h2>

				<h3 className={styles.subtitle}>{post?.subtitle}</h3>
				<span className={styles.author}>Creado por: {post?.creationUser}</span>
				<p>{post?.text}</p>
			</div>
		</div>
	)
}
