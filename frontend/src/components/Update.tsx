import { Post, PostData } from "../interfaces";
import { useState } from "react";

function Update({post, handleEditState, handleChange}: {post: Post | undefined, handleEditState: any, handleChange: any}): JSX.Element {
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

        const postData: PostData = {
            post: {topic, content},
        }

        // Send PUT request to server with the updated post data
        try {
            const response: Response = await fetch(`${API_URL}/posts/${post.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData)
            })

            if (!response.ok) {
                alert("Failed to update post");
            }
        } catch(e) {
            alert('Failed to update post');
        }
        // Toggle back to read mode
        handleEditState();
        // Update post topic and content in read mode
        handleChange(topic, content);
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


export default Update;