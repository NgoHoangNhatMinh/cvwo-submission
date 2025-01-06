import { Comment } from "../../interfaces";

async function DestroyComment(comment: Comment | undefined, navigate: any): Promise<boolean> {
    // Return early for empty comment
    if (!comment) {
        return false;
    }

    const API_URL: string | undefined = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('auth_token');

    try {
        const response = await fetch(`${API_URL}/comments/${comment.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`
            },
        })

        if (response.status === 401) {
            alert("You must log in first")
            navigate("/login")
        } else if (response.ok) {
            alert("Comment deleted successfully!");
            return true;
        } else {
            alert("Failed to delete comment");
        }
    } catch(e) {
        alert('Failed to delete comment');
    }
    return false;
}


export default DestroyComment;