import { useUser } from "../contexts/UserContext";
import { Outlet, useNavigate } from "react-router-dom";

function Profile () {
    const {user} = useUser();
    const navigate = useNavigate()

    function handlePosts() {
        navigate("/user/posts")
    }

    function handleComments() {
        navigate("/user/comments")
    }
    
    if (!user) {
        return (
            <div>
                <h1>No such user</h1>
                <p>Awkward...</p>
            </div>
        )
    }

    return <div>
        <h1>Profile...</h1>
        <p>{`User: ${user.id}`}</p>
        <p>{`Email: ${user.email}`}</p>
        <p>{`Created at: ${user.created_at}`}</p>
        <button onClick={handlePosts}>Posts</button>
        <button onClick={handleComments}>Comments</button>
        <Outlet/>
        {/* <h2>User's posts</h2>
            <h2>User's comments</h2>
        {
            comments.length > 0
                ? comments.map(comment => {return <div key={comment.id}>{comment.content}</div>})
                : <p>No comments available</p>
        } */}
    </div>
}

export default Profile;