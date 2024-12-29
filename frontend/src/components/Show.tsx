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
        const success: boolean = await Destroy(post);

        if (success) {
            navigate(`/`);
        }
    }

    function handleEdit() {
        // If currently not in edit mode then enter edit mode and update the post
        // if (!edit) {
        //     Update(post);
        // }

        // Toggle between show mode and edit mode
        setEdit(!edit);
    }

    // fetch post data on mount
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

    if (!post) {
        return <div>There are no such post</div>
    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!edit) {
        return (
            <div>
                <h1>{post.topic}</h1>
                <p>{post.content}</p>
                <button onClick={handleEdit}>Edit post</button><br />
                <button onClick={handleDelete}>Delete post</button><br />
                <Link to="/">Go back</Link>
            </div>
        )
    } else if (edit) {
        return <div>
            {/* React component cannot be defined as asynchronous function */}
            <Update post={post}/>
            <button onClick={handleEdit}>Go back</button><br />
        </div>
    }
}

export default Show;
