import { Post, PostData } from "../../interfaces";
import { useState } from "react";

function UpdatePost({post, handleEditState, handleChange, navigate}: {post: Post | undefined, handleEditState: any, handleChange: any, navigate: any}): JSX.Element {
    // To return early for empty post
    if (!post) {
        return <div>
            <h1>Nothing to see here...</h1>
        </div>;
    }

    const [topic, setTopic] = useState<string>(post.topic);
    const [content, setContent] = useState<string>(post.content);

    const API_URL: string | undefined = import.meta.env.VITE_API_URL;

    async function handleUpdate(e: React.FormEvent) {
        e.preventDefault()

        if (!post)
            return

        const token = localStorage.getItem('auth_token');

        const postData: PostData = {
            // FIX HOW TO FETCH CURRENT USER AND CATEGORY
            // CURRENTLY USING DEFAULT ID=1
            post: {topic, content, category_id: 1},
        }

        // Send PUT request to server with the updated post data
        try {
            const response: Response = await fetch(`${API_URL}/posts/${post.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${token}`
                },
                body: JSON.stringify(postData)
            })

            if (response.status === 401) {
                alert("You must log in first")
                navigate("/login")
            } else if (!response.ok) {
                alert("Failed to update post");
            } else {
                handleChange(topic, content);
            }
        } catch(e) {
            alert('Failed to update post');
        }
        // Toggle back to read mode
        handleEditState();
        // Update post topic and content in read mode
    }

    return (
        <div>
            <h1>Editing...</h1>
            <form onSubmit={handleUpdate}>
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


export default UpdatePost;