import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Destroy from './Destroy';
import Update from './Update';
import { Post } from '../interfaces';

function Show() {
    const API_URL: string | undefined = import.meta.env.VITE_API_URL;
    const {id} = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [edit, setEdit] = useState<boolean>(false);

    async function handleDelete() {
        // Request DELETE current post to the server
        // return true for successful deletion and false otherwise
        const success: boolean = await Destroy(post);

        // If DELETE successfully, navigate to homepage
        if (success) {
            navigate(`/`);
        }
    }

    // Toggle between edit mode and read mode
    function handleEditState() {
        setEdit(!edit);
    }

    // After user edit the post information, handleChange fetch the new title and new content
    // and use setPost to update post information for display in current page
    function handleChange(topic:string, content:string) {
        setPost(prevPost => {
            if (!prevPost) return prevPost
            return {
                ...prevPost,
                topic: topic,
                content: content,
            }
        })
    }

    // Fetch post data on mount
    useEffect(() => {
        fetch(`${API_URL}/posts/${id}`)
            .then(response => {
                if (!response.ok)
                    throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                setPost(data);
                setLoading(false);
            })
            .catch(error => setError(error.message))
    }, []);

    // If there are no post with this id
    if (!post) {
        return <div>There are no such post</div>
    }

    // While waiting to fetch post data from the server
    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!edit) {
        // Read mode
        return (
            <div>
                <h1>{post.topic}</h1>
                <p>{post.content}</p>
                <button onClick={handleEditState}>Edit post</button><br />
                <button onClick={handleDelete}>Delete post</button><br />
                <Link to="/">Go back</Link>
            </div>
        )
    } else if (edit) {
        // Edit mode
        return <div>
            {/* React component cannot be defined as asynchronous function */}
            <Update post={post} handleEditState={handleEditState} handleChange={handleChange}/>
        </div>
    }
}

export default Show;
