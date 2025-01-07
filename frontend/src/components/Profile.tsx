import { useEffect, useState } from "react";
import { useUser } from "./contexts/UserContext";
import { Comment, Post } from "../interfaces";

function Profile () {
    const {user} = useUser();
    const API_URL: string | undefined = import.meta.env.VITE_API_URL;
    const [posts, setPosts] = useState<Post[]>([])
    const [comments, setComments] = useState<Comment[]>([])

    useEffect(() => { 
        if (user) {
            try {
                fetch(`${API_URL}/user/${user.id}/posts`)
                    .then(response => response.json())
                    .then(data => setPosts(data))
            } catch (error: any) {
                console.log(error.message)
            }

            try {
                fetch(`${API_URL}/user/${user.id}/comments`)
                    .then(response => response.json())
                    .then(data => setComments(data))
            } catch (error: any) {
                console.log(error.message)
            }
        }
    }, [user, API_URL])
    
    if (!user) {
        return (
            <div>
                <h1>No such user</h1>
                <p>Awkward...</p>
            </div>
        )
    }

    return <div>
        <h1>Profile...</h1>
        <p>{`User: ${user.id}`}</p>
        <p>{`Email: ${user.email}`}</p>
        <p>{`Created at: ${user.created_at}`}</p>
        <h2>User's posts</h2>
        {
            posts.length > 0
                ? posts.map(post => {return <div key={post.id}>{post.content}</div>})
                : <p>No posts available</p>
        }
                <h2>User's comments</h2>
        {
            comments.length > 0
                ? comments.map(comment => {return <div key={comment.id}>{comment.content}</div>})
                : <p>No comments available</p>
        }
    </div>
}

export default Profile;