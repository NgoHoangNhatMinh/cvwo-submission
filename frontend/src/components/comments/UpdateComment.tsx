import { useState } from "react";
import { Comment, CommentData } from "../../interfaces";

function UpdateComment({comment, handleEditState, handleChange, navigate}: {comment: Comment, handleEditState: any, handleChange: any, navigate: any}) {
    const API_URL: string | undefined = import.meta.env.VITE_API_URL;
    const [content, setContent] = useState<string>(comment.content);

    async function handleSubmit(e: any) {
        e.preventDefault();

        const token = localStorage.getItem('auth_token');

        const commentData: CommentData = {
            comment: {
                ...comment,
                content: content,
            }
        }

        try {
            const response: Response = await fetch(`${API_URL}/comments/${comment.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${token}`
                },
                body: JSON.stringify(commentData)
            });
            if (response.status === 401) {
                alert("You must log in first")
                navigate("/login")
            } else if (response.ok) {
                alert("Update successfully");
            } else {
                alert("Failed to update comment");
            }
        } catch (error) {
            alert("Failed to update comment");
        }

        handleEditState(comment);
        handleChange(content, comment.id);
    }

    return <div>
        <form onSubmit={handleSubmit}>
            <input type="textbox" value={content} onChange={e => setContent(e.target.value)}/>
            <button type="submit">Submit</button>
        </form>
    </div>
}

export default UpdateComment;