import { useParams } from "react-router-dom"
import { posts } from "../../mocks/posts.mock"



export default function PostView() {
  	const params = useParams()
    console.log(params);
      const post = posts.filter((post) => post.category === params.id)
      console.log('posts', post)
  return (
    <div>PostView</div>
  )
}