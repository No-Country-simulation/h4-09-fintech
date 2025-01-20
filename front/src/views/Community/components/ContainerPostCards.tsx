import styles from './ContainerPostCards.module.css'
import { IPost } from '../mocks/posts'
import PostCard from './PostCard'

type Props = {
	posts: IPost[]
}

export default function ContainerPostCards({ posts }: Props) {
	// console.log(posts)

	return (
		<div className={styles.grid}>
			{posts.map((post) => (
				<PostCard key={post.id} post={post} />
			))}
		</div>
	)
}
