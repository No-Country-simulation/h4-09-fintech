// import { log } from 'console'
// import Spinner from '../../components/spiner/Spiner'
// import { baseUrl } from '../../config/envs'
// import { useFetchDataWithToken } from '../../hooks/useFetchDataWithToken'
import { useState } from 'react'
import styles from './community.module.css'
import ContainerForoCards from './components/ContainerForoCards'
import { foros } from './mocks/foros.mock'
import ContainerNewsCards from './components/ContainerNewsCards'
import { news } from './mocks/news.mock'

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

	// const ultimosPosteos = posts.map((post) => post).slice(0, 3)

	const [showNews, setShowNews] = useState(true)

	return (
		<div className={styles.pageView}>
			<div className={styles.contentContainer}>
				{/* {error && (
					<div>
						<p className={styles.error}> Hubo un error al recueperar los posteos</p>
					</div>
				)} */}
				<h1 className={styles.title}>Comunidad & Noticias</h1>
				<div className={styles.buttonsrow}>
					<button type='button' onClick={() => setShowNews(true)} className={showNews ? styles.activeButton : ''}>
						Novedades
					</button>
					<button type='button' onClick={() => setShowNews(false)} className={!showNews ? styles.activeButton : ''}>
						Foros
					</button>
				</div>
				{showNews ? <ContainerNewsCards news={news} /> : <ContainerForoCards foros={foros} />}
			</div>
		</div>
	)
}
