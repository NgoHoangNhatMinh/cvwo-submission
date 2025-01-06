import { Comment } from "../../interfaces";

async function DestroyComment(comment: Comment | undefined): Promise<boolean> {
    // Return early for empty comment
    if (!comment) {
        return false;
    }

    const API_URL: string | undefined = import.meta.env.VITE_API_URL;

    try {
        const response = await fetch(`${API_URL}/comments/${comment.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })

        if (response.ok) {
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