import { Link } from 'react-router-dom'
import styles from '../community.module.css'
import GoBackIcon from '../../../assets/icons/GoBackIcon'


export default function Forum() {
	//TODO traerme todos los posteos del back


	return (
		<div className={styles.pageView}>
			<div className={styles.contentContainer}>
				<Link to={'/community'}>
					{' '}
					<GoBackIcon />{' '}
				</Link>
				<div className={styles.headerContainer}>
					<h4 className={styles.title}>Posteos de la comunidad iupi</h4>
					<Link to={'/community/create'} className={styles.createButton}>
						Crear
					</Link>
				</div>
				<h2 className='body3'>Clickea en los posteos para verlos completos</h2>
			</div>
		</div>
	)
}
