import Spinner from '../../components/spiner/Spiner'
import { baseUrl } from '../../config/envs'
import { useFetchDataWithToken } from '../../hooks/useFetchDataWithToken'
import { useState } from 'react'
import styles from './community.module.css'
import ContainerForoCards from './components/(forum)/ContainerForoCards'
import { foros } from './mocks/foros.mock'
import ContainerNewsCards from './components/(news)/ContainerNewsCards'
import { IApiArticle } from './mocks/news.mock'

export default function Community() {
	const [showNews, setShowNews] = useState(true)
	const { data, loading, error } = useFetchDataWithToken<IApiArticle[]>(`${baseUrl}/api/news`)
	if (loading) {
		return (
			<div className={styles.loadingview}>
				<Spinner />
			</div>
		)
	}
	// console.log(data)
	// console.log(error)

	return (
		<div className={styles.pageView}>
			<div className={styles.contentContainer}>
				{error && (
					<div>
						<p className={styles.error}> Hubo un error al recueperar las noticias</p>
					</div>
				)}
				<h1 className={styles.title}>Comunidad & Noticias</h1>
				<div className={styles.buttonsrow}>
					<button type='button' onClick={() => setShowNews(true)} className={showNews ? styles.activeButton : ''}>
						Novedades
					</button>
					<button type='button' onClick={() => setShowNews(false)} className={!showNews ? styles.activeButton : ''}>
						Foros
					</button>
				</div>
				{data && showNews ? <ContainerNewsCards news={data} /> : <ContainerForoCards foros={foros} />}
			</div>
		</div>
	)
}
