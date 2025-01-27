import { Link, useParams } from 'react-router-dom'
import styles from './ForumView.module.css'
import GoBackIcon from '../../../../assets/icons/GoBackIcon'
import { foros } from '../../mocks/foros.mock'

import ContainerPostCards from '../../components/(forum)/ContainerPostCards'
import { useFetchDataWithToken } from '../../../../hooks/useFetchDataWithToken'
import { baseUrl } from '../../../../config/envs'
import { ExampleObject } from '../../mocks/posts.mock'

export default function ForumView() {
	const params = useParams()
	console.log(params)

	const foro = foros.find((foro) => foro.category === params.category)
	console.log('foro', foro)

	// const post = posts.filter((post) => post.category === params.category)
	// console.log('posts', post)

	const { data: posts, loading, error } = useFetchDataWithToken<ExampleObject[]>(`${baseUrl}/api/post/postcategory/${params.category}`)

	console.log('posts', posts)
	console.warn('loading', loading)
	console.error('error', error)

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
				<div style={{ marginBlock: '1rem' }}>
					<Link to={`/community/create/${params.category}`} type='button' className={styles.createButton}>
						Crear
					</Link>
				</div>
				<>{loading && <p>Cargando...</p>}</>

				<>{posts && <ContainerPostCards posts={posts} />}</>
			</div>
		</div>
	)
}
