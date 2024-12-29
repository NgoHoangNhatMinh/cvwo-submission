import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Create() {
    const API_URL: string | undefined = import.meta.env.VITE_API_URL;
    const [topic, setTopic] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const navigate = useNavigate();

    async function handleSubmit(e: any) {
        e.preventDefault();

        const postData = {
            post: {topic, content},
        }

        try {
            const response = await fetch(`${API_URL}/posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData)
            })

            if (response.ok) {
                const data = await response.json();
                alert("Post created successfully!");
                navigate(`/posts/${data.id}`);
            } else {
                alert("Failed to create post");
            }
        } catch(e) {
            alert('Failed to create post.');
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

export default Create;