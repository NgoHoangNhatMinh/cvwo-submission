import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { PostData } from "../interfaces";

function CreatePost(): JSX.Element {
    const API_URL: string | undefined = import.meta.env.VITE_API_URL;
    const [topic, setTopic] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const navigate = useNavigate();

    // On submitting form, send POST request to server with the post data
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();

        const postData: PostData = {
            // FIX HOW TO FETCH CURRENT USER AND CATEGORY
            // CURRENTLY USING DEFAULT ID=1
            post: {topic, content, user_id: 1, category_id: 1},
        }

        try {
            const response = await fetch(`${API_URL}/posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData)
            })
            
            const data = await response.json();
            if (response.ok) {
                alert("Post created successfully!");
                navigate(`/posts/${data.id}`);
            } else {
                console.error("Validation errors:", data.errors);
                alert("Failed to create post");
            }
        } catch(e) {
            alert('Failed to create post');
        }
    }

    return (
        <div>
            <p>Create new post</p>
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