import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { PostData } from "../interfaces";
import "../styles/CreatePost.css"

function CreatePost(): JSX.Element {
    const API_URL: string | undefined = import.meta.env.VITE_API_URL;
    const [topic, setTopic] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const navigate = useNavigate();

    // On submitting form, send POST request to server with the post data
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();

        let token = localStorage.getItem('auth_token');
        // const token = "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJhNzJkNTVjMS1mNWMwLTRhYWMtOWNiZi01ZDI3YmVjMzNmNGQiLCJzdWIiOiIxIiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNzM2MDc5OTUyLCJleHAiOjE3MzYwODE3NTJ9.pvghSZnU5MJ1AUVvN49Z-eaehxamE3sZAIthr8li_6g";
        const postData: PostData = {
            // FIX HOW TO FETCH AND CATEGORY
            // CURRENTLY USING DEFAULT ID=1
            post: {topic, content, category_id: 1},
        }

        const response = await fetch(`${API_URL}/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`
            },
            body: JSON.stringify(postData)
        })

        if (response.status=== 401) {
            alert("Error 401")
            navigate("/login")
        } else if (response.ok) {
            const data = await response.json();
            alert("Post created successfully!");
            navigate(`/posts/${data.id}`);
        } else {
            console.error("Validation errors");
            alert("Failed to create post");
        }
    }

    return (
        <div className="CreatePost">
            <h1>Create new post</h1>
            <Link to="/">Go back</Link>
            <form onSubmit={handleSubmit}>
                <div>
                    <label >Topic: </label>
                    <input 
                        type="text"
                        value={topic}
                        onChange={e => setTopic(e.target.value)}
                        required 
                    />
                </div>
                <div>
                    <label >Content: </label>
                    <input 
                        type="text"
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

export default CreatePost;