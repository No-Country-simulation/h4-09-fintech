import { Link, useParams } from 'react-router-dom'
import styles from './ForumView.module.css'
import GoBackIcon from '../../../../assets/icons/GoBackIcon'
import { foros } from '../../mocks/foros.mock'
import { posts } from '../../mocks/posts.mock'
import ContainerPostCards from '../../components/(forum)/ContainerPostCards'

export default function ForumView() {
	const params = useParams()
	console.log(params)

	const foro = foros.find((foro) => foro.category === params.category)
	console.log('foro', foro)

	const post = posts.filter((post) => post.category === params.category)
	console.log('posts', post)

	return (
		<div className={styles.pageView}>
			<div className={styles.contentContainer}>
				<Link to={'/community'}>
					{' '}
					<GoBackIcon />{' '}
				</Link>
				<div className={styles.header}>
					<img src={foro?.avatar} alt='avatar' className={styles.avatar} />
					<h2 className={styles.title}>{foro?.title}</h2>
				</div>
					<ContainerPostCards posts={post} />
			</div>
		</div>
	)
}
