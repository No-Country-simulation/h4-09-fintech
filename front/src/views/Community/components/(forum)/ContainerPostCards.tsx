import styles from './ContainerForoCards.module.css'
import { IPost } from '../../mocks/posts.mock'
import PostCard from './PostCard'

type Props = {
	posts: IPost[]
}

export default function ContainerPostCards({ posts }: Props) {
	return (
		<div className={styles.grid}>
			{posts.map((post) => (
				<PostCard key={post.id} post={post} />
			))}
		</div>
	)
}
