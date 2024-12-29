import { useState, useEffect } from 'react'



function Index() {
    const API_URL: string | undefined = import.meta.env.VITE_API_URL;
    const [posts, setPosts] = useState<any[]>([])

    // fetch posts data on mount
    useEffect(() => {
        fetch(`${API_URL}/posts`)
            .then(response => {
                if (!response.ok)
                    throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => setPosts(data))
            .catch(error => console.error('There was a problem with the fetch operation:', error))
    }, [])

    console.log(posts);

    return (
        <div>
            {
                posts.map((post) => {
                    return <div>
                        <h2>{post.topic}</h2>
                        <p>{post.content}</p>
                    </div>
                })
            }
        </div>
    )
}

export default Index;
