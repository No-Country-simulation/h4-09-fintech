import { INew } from "../mocks/news.mock"
import styles from './ContainerForoCards.module.css'
import NewsCard from "./NewsCard"

type Props = {
  news: INew[]
}

export default function ContainerNewsCards({ news }: Props) {
  return (
		<div className={styles.grid}>
			{news.map((notice) => (
				<NewsCard key={notice.id} notice={notice} />
			))}
		</div>
	)
}