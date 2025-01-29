import styles from './ContainerForoCards.module.css'
// import { IPost } from '../../mocks/posts.mock'
import PostCard from './PostCard'
import { ExampleObject } from '../../mocks/posts.mock'
type Props = {
	posts: ExampleObject[]
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
