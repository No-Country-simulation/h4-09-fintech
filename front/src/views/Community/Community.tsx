// import { log } from 'console'
// import Spinner from '../../components/spiner/Spiner'
// import { baseUrl } from '../../config/envs'
// import { useFetchDataWithToken } from '../../hooks/useFetchDataWithToken'
import styles from './community.module.css'
import { Link } from 'react-router-dom'
import ContainerPostCards from './components/ContainerPostCards'
import { posts } from './mocks/posts'



export default function Community() {
	// const { data, loading, error } = useFetchDataWithToken(`${baseUrl}/api/posts`)
	// if (loading) {
	// 	return (
	// 		<div className={styles.loadingview}>
	// 			<Spinner />
	// 		</div>
	// 	)
	// }
	// console.log(data)
	// console.log(error)

	const ultimosPosteos = posts.map((post) => post).slice(0, 3)

	return (
		<div className={styles.pageView}>
			<div className={styles.contentContainer}>
				{/* {error && (
					<div>
						<p className={styles.error}> Hubo un error al recueperar los posteos</p>
					</div>
				)} */}
				<h1 className={styles.title}>Comunidad & Noticias</h1>
				<h2 className='body3'>Estos son los últimos posteos de la comunidad</h2>
				<ContainerPostCards posts={ultimosPosteos} />
				<Link to='/community/forum'>ver mas</Link>
				<h2 className='body3'>Estas son las últimas noticias del mercado financiero </h2>
				<div>Noticia</div>
				<div>Noticia</div>
				<div>Noticia</div>
				<div>Noticia</div>
				<Link to='/community//news' >ver mas</Link>
			</div>
		</div>
	)
}
