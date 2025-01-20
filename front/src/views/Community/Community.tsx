// import { log } from 'console'
// import Spinner from '../../components/spiner/Spiner'
// import { baseUrl } from '../../config/envs'
// import { useFetchDataWithToken } from '../../hooks/useFetchDataWithToken'
import styles from './community.module.css'
import { Link } from 'react-router-dom'

export interface IUser {
	name: string
	lastname: string
}

export interface IPost {
	id: string
	createdAt: string | Date
	createdBy?: string | IUser
	title: string
	subtitle: string
	text: string
}

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

	return (
		<div className={styles.pageView}>
			<div className={styles.contentContainer}>
				{/* {error && (
					<div>
						<p className={styles.error}> Hubo un error al recueperar los posteos</p>
					</div>
				)} */}
				<h4 className={styles.title}>Comunidad & Noticias</h4>
				<h5>Estos son los últimos posteos de la comunidad</h5>
				<div>post</div>
				<div>post</div>
				<div>post</div>
				<div>post</div>
				<Link to='/community/forum'>ver mas</Link>
				<h5>Estas son las últimas noticias del mercado financiero </h5>
				<div>post</div>
				<div>post</div>
				<div>post</div>
				<div>post</div>
				<Link to='/community//news'>ver mas</Link>
			</div>
		</div>
	)
}
