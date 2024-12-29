import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

function Index() {
    const API_URL: string | undefined = import.meta.env.VITE_API_URL;
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!posts) {
        return <div>There are no posts</div>
    }

    return (
        <div>
            {
                posts.map((post) => {
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
