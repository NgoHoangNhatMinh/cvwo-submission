import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { Outlet, useNavigate } from "react-router-dom";

function Profile () {
    const API_URL: string | undefined = import.meta.env.VITE_API_URL;
    const {user, setUser} = useUser();
    const [username, setUsername] = useState("");
    const [image, setImage] = useState<FileList | null>();
    const navigate = useNavigate()

    function handlePosts() {
        navigate("/user/posts")
    }

    function handleComments() {
        navigate("/user/comments")
    }

    async function handleUpdateProfile(e: any) {
        e.preventDefault();

        if (!image || image.length === 0) {
            alert("Please upload an image");
            return;
        }
    
        console.log(image[0])

        // Image cannot be sent as json file, instead isomg formData
        const formData = new FormData();
        formData.append("user[username]", username);
        formData.append("user[image]", image[0]);

        for (const value of formData.values()) {
            console.log(value)
        }

        const token = localStorage.getItem('auth_token');

        try {
            const response = await fetch(`${API_URL}/signup`, {
                method: "PATCH",
                headers: {
                    Authorization: `${token}`,
                },
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error("Failed to update profile.");
            }
    
            const data = await response.json();
            setUser(data);
        } catch (error: any) {
        }
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
        <img src={user.image_url} alt="" width={`50px`}/>
        <h1>{`${user.username}`}</h1>
        <p>{`${user.email}`}</p>
        <button onClick={handlePosts}>Posts</button>
        <button onClick={handleComments}>Comments</button>
        <form onSubmit={handleUpdateProfile}>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
            <label htmlFor="">Upload Image</label>
            <input type="file" accept="image/*" onChange={e => setImage(e.target.files)}/>
            <button type="submit">Change</button>    
        </form>        
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