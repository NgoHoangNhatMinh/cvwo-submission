import { Post } from "../interfaces";

async function Destroy(post: Post | null) {
    // Return early for null post
    if (!post) {
        return false;
    }

    const API_URL: string | undefined = import.meta.env.VITE_API_URL;

    alert(`You are deleting \"${post.topic}\"`);

    try {
        const response = await fetch(`${API_URL}/posts/${post.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })

        if (response.ok) {
            alert("Post deleted successfully!");
            return true;
        } else {
            alert("Failed to delete post");
        }
    } catch(e) {
        alert('Failed to delete post');
    }
    return false;
}


export default Destroy;