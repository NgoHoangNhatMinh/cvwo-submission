import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Post } from '../interfaces';

function Index(): JSX.Element {
    const API_URL: string | undefined = import.meta.env.VITE_API_URL;
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<Boolean>(true);
    const [error, setError] = useState<string>("");

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
        <div>
            {
                firstTenPosts.map((post) => {
                    return <div>
                        <h2>{"Post " + post.id + " - " + post.topic}</h2>
                        <p>{post.content}</p>
                        <Link to={`/posts/${post.id}`}>Go to post</Link>
                    </div>
                })
            }
        </div>
    )
}

export default Index;
