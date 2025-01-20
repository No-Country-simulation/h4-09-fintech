
import { IPost } from '../Community'

type Props = {
  post: IPost
}

export default function PostCard({post}: Props) {
  console.log(post);
  
  return (
    <div>PostCard</div>
  )
}