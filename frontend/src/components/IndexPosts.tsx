import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Post } from '../interfaces';
import '../styles/IndexPosts.css'

function IndexPosts(): JSX.Element {
    const API_URL: string | undefined = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<Boolean>(true);
    const [error, setError] = useState<string>("");

    function navigateToPost(id: number) {
        navigate(`/posts/${id}`);
    }

    // fetch posts data on mount
    useEffect(() => {
        fetch(`${API_URL}/posts`)
            .then(response => {
                if (!response.ok)
                    throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                setPosts(data);
                setLoading(false);
            })
            .catch(error => setError(error.message))
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (!posts) {
        return <div>There are no posts</div>
    }

    // Display most recent 10 posts
    const firstTenPosts: Post[] = posts.slice(0, 10);

    return (
        <div className="PostsContainer">
            {
                firstTenPosts.map((post) => {
                    return <div onClick={() => navigateToPost(post.id)} className="Post">
                        <h2>{"Post " + post.id + " - " + post.topic}</h2>
                        <p>{post.content}</p>
                    </div>
                })
            }
        </div>
    )
}

export default IndexPosts;
