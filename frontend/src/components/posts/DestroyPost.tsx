import { Post } from "../../interfaces";

async function DestroyPost(post: Post | undefined): Promise<boolean> {
    // Return early for empty post
    if (!post) {
        return false;
    }

    const API_URL: string | undefined = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('auth_token');

    // alert(`You are deleting \"${post.topic}\"`);

    try {
        const response = await fetch(`${API_URL}/posts/${post.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`
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


export default DestroyPost;