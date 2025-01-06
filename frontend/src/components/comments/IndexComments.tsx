import { useState, useEffect } from 'react'
import { Comment } from '../../interfaces';
import DestroyComment from './DestroyComment';
import UpdateComment from './UpdateComment';
import CreateComment from './CreateComment';
import "../../styles/Comment.css"
import { useNavigate } from 'react-router-dom';

function IndexComments({post_id}: {post_id: number}): JSX.Element {
    const API_URL: string | undefined = import.meta.env.VITE_API_URL;
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState<Boolean>(true);
    const [error, setError] = useState<string>("");
    const [edit, setEdit] = useState<Record<number,boolean>>({});
    const navigate = useNavigate();

    async function handleDelete(comment: Comment) {
        // Request DELETE current post to the server
        // return true for successful deletion and false otherwise
        const success: boolean = await DestroyComment(comment, navigate);

        // If DELETE successfully, stop displaying comment
        if (success) {
            setComments((prevComments) =>
                prevComments.filter((c) => c.id !== comment.id)
            );
        }
    }

    function handleEdit(comment: Comment) {
        setEdit(prevEdit => ({
            ...prevEdit,
            [comment.id]: !prevEdit[comment.id], 
        }))
    }

    // So that updated comment appears immediately without having to reload page to fetch from server
    function handleChange(updatedContent: string, id: number) {
        setComments(prevComments => prevComments.map(
            comment => comment.id === id
                ? {...comment, content: updatedContent}
                : comment 
        ))
    }

    // So that new comment appears immediately without having to reload page to fetch from server
    function handleNew(comment: Comment) {
        setComments(prevComments => [comment, ...prevComments])
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
        <div className="CommentsContainer">
            <CreateComment post_id={post_id} handleNew={handleNew} navigate={navigate}/>
            <div className="Comments">
                <h3>Comments:</h3>
                {
                    firstTenComments.map((comment) => {
                        if (!edit[comment.id]) {
                            return <div>
                                <p>{comment.content}</p>
                                <button onClick={() => handleEdit(comment)}>Edit</button>
                                <button onClick={() => handleDelete(comment)}>Delete comment</button>
                            </div>
                        } else {
                            return <div>
                                <UpdateComment comment={comment} handleEditState={handleEdit} handleChange={handleChange} navigate={navigate}/>
                            </div>
                        }
                    })
                }
            </div>
        </div>
    )
}

export default IndexComments;
