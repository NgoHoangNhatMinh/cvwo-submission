import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import DestroyPost from './DestroyPost';
import UpdatePost from './UpdatePost';
import { Post } from '../interfaces';
import IndexComments from './IndexComments';
import CreateComment from './CreateComment';
import "../styles/ShowPost.css"

function ShowPost(): JSX.Element | undefined {
    // Show may return undefined as user may navigate to a different page after deleting the current post for instance

    const API_URL: string | undefined = import.meta.env.VITE_API_URL;
    const {id} = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState<Post | undefined>();
    const [loading, setLoading] = useState<Boolean>(true);
    const [error, setError] = useState<String>("");
    const [edit, setEdit] = useState<boolean>(false);

    async function handleDelete() {
        // Request DELETE current post to the server
        // return true for successful deletion and false otherwise
        const success: boolean = await DestroyPost(post);

        // If DELETE successfully, navigate to homepage
        if (success) {
            navigate(`/`);
        }
    }

    // Toggle between edit mode and read mode
    function handleEditState(): void {
        setEdit(!edit);
    }

    // After user edit the post information, handleChange fetch the new title and new content
    // and use setPost to update post information for display in current page
    function handleChange(topic:string, content:string): void {
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
                <div className="PostContainer">
                    <h1>{post.topic}</h1>
                    <h2>{post.content}</h2>
                    <button onClick={handleEditState}>Edit post</button>
                    <button onClick={handleDelete}>Delete post</button>
                </div>
                
                <IndexComments post_id={post.id}/>
                <Link to="/">Go back</Link>
            </div>
        )
    } else if (edit) {
        // Edit mode
        return <div>
            {/* React component cannot be defined as asynchronous function */}
            <UpdatePost post={post} handleEditState={handleEditState} handleChange={handleChange}/>
        </div>
    }
}

export default ShowPost;
