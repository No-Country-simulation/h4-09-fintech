import { IApiArticle } from '../../mocks/news.mock'
import styles from '../(forum)/ContainerForoCards.module.css'
import NewsCard from './NewsCard'

type Props = {
	news: IApiArticle[]
}

export default function ContainerNewsCards({ news }: Props) {
	return (
		<div className={styles.grid}>
			{news.map((article) => (
				<NewsCard key={article.id} article={article} />
			))}
		</div>
	)
}
