import { useState, useEffect } from 'react'
import { Comment } from '../interfaces';
import DestroyComment from './DestroyComment';

function IndexComments({post_id}: {post_id: number}): JSX.Element {
    const API_URL: string | undefined = import.meta.env.VITE_API_URL;
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState<Boolean>(true);
    const [error, setError] = useState<string>("");

    async function handleDelete(comment: Comment) {
        // Request DELETE current post to the server
        // return true for successful deletion and false otherwise
        const success: boolean = await DestroyComment(comment);

        // If DELETE successfully?
        if (success) {
        }
    }

    // fetch comments data on mount
    useEffect(() => {
        fetch(`${API_URL}/posts/${post_id}/comments`)
            .then(response => {
                if (!response.ok)
                    throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                setComments(data);
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

    if (!comments) {
        return <div>There are no comments</div>
    }

    // Display most recent 10 comments
    const firstTenComments: Comment[] = comments.slice(0, 10);

    return (
        <div>
            <h3>Comments:</h3>
            {
                firstTenComments.map((comment) => {
                    return <div>
                        <p>{comment.content}</p>
                        <button onClick={() => handleDelete(comment)}>Delete comment</button>
                    </div>
                })
            }
        </div>
    )
}

export default IndexComments;
