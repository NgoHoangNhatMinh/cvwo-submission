import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { Comment } from "../../interfaces";

function UserComments() {
    const {user} = useUser();
    const API_URL: string | undefined = import.meta.env.VITE_API_URL;
    const [comments, setComments] = useState<Comment[]>([])

    useEffect(() => { 
        if (user) {
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
        <h1>User's comments</h1>
        {
            comments.length > 0
                ? comments.map(comment => {return <div key={comment.id}>{comment.content}</div>})
                : <p>No comments available</p>
        }
    </div>
}

export default UserComments