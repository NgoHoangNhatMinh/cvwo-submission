import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { Comment } from "../../interfaces";
import axios from "axios";

function UserComments() {
    const {user} = useUser();
    const API_URL: string | undefined = import.meta.env.VITE_API_URL;
    const [comments, setComments] = useState<Comment[]>([])

    // Get current user's comments data
    useEffect(() => { 
        if (user) {
            try {
                axios.get(`${API_URL}/user/${user.id}/comments`)
                    .then(response => setComments(response.data))
            } catch (error: any) {
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
        <h1>User's comments</h1>
        {
            comments.length > 0
                ? comments.map(comment => {return <div key={comment.id}>{comment.content}</div>})
                : <p>No comments available</p>
        }
    </div>
}

export default UserComments