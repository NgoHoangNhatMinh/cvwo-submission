import './App.css'
import IndexPosts from './components/IndexPosts'
import { Link } from 'react-router-dom'

// Display the homepage - index most recent posts
function App() {
  return (
    <div>
      <h1>Posts</h1>
      <Link to="/posts/new">Create new post</Link>
      <IndexPosts />
    </div>
  )
}

export default App
