import { CommentData } from "../interfaces";
import { useState } from "react";
import "../styles/Comment.css"

function CreateComment({post_id, handleNew}: {post_id: number, handleNew: any}): JSX.Element {
    const API_URL: string | undefined = import.meta.env.VITE_API_URL;
    const [content, setContent] = useState<string>("");
    
    // On submitting form, send POST request to server with the comment data
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();

        const commentData: CommentData = {
            // FIX HOW TO FETCH CURRENT USER AND CATEGORY
            // CURRENTLY USING DEFAULT ID=1
            comment: {content, user_id: 1, post_id},
        }

        try {
            const response = await fetch(`${API_URL}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(commentData)
            })
            
            const data = await response.json();
            if (response.ok) {
                handleNew(data);
                alert("Comment created successfully!");
            } else {
                console.error("Validation errors:", data.errors);
                alert("Failed to create comment");
            }
        } catch(e) {
            alert('Failed to create comment');
        }
        setContent("");
    }

    return (
        <div className="AddComment">
            <p>Add comment</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <input 
                        type="textbox"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        required 
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateComment;