import { CommentData } from "../../interfaces";
import { useState } from "react";
import "../../styles/Comment.css"
import { Button, FormControl, InputLabel, TextField } from "@mui/material";

function CreateComment({post_id, handleNew, navigate}: {post_id: number, handleNew: any, navigate: any}): JSX.Element {
    const API_URL: string | undefined = import.meta.env.VITE_API_URL;
    const [content, setContent] = useState<string>("");
    
    // On submitting form, send POST request to server with the comment data
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();

        const token = localStorage.getItem('auth_token');
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
                    "Authorization": `${token}`
                },
                body: JSON.stringify(commentData)
            })
            
            if (response.status === 401) {
                alert("You must log in first")
                navigate("/login")
            } else if (response.ok) {
                const data = await response.json();
                handleNew(data);
                alert("Comment created successfully!");
            } else {
                alert("Failed to create comment");
            }
        } catch(e) {
            alert('Failed to create comment');
        }
        setContent("");
    }

    return (
        <div className="AddComment">
            <FormControl
                className="FormControl"
                component="form" // Ensures this acts as a form element
                onSubmit={handleSubmit}
                sx={{
                    m: 1,
                    minWidth: 200,
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "center",
                }
            }
            >
                <TextField
                    className="TextField"
                    id="addcommentbox"
                    label="Add Comment"
                    variant="outlined"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <Button type="submit" variant="contained">Comment</Button>
            </FormControl>
        </div>
    )
}

export default CreateComment;