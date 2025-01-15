import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import { Outlet, useNavigate } from "react-router-dom";
import "../../styles/Profile.css"
import axios from "axios";

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

    async function handleUpdateProfile(e: React.FormEvent) {
        e.preventDefault();
    
        // Image cannot be sent as json file, instead append to formData
        const formData = new FormData();
        formData.append("user[username]", username);
        if (image) {
            formData.append("user[image]", image[0]);
        }

        // Get token to verify current user to authorize updating comment data
        const token = localStorage.getItem('auth_token');

        try {
            const response = await axios.patch(`${API_URL}/signup`, formData, {
                headers: {
                    Authorization: `${token}`,
                },
            });
    
            setUser(response.data.data);
        } catch (error) {
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
        <div className="ProfileContainer">
            <img src={user.image_url} alt="" width={`50px`}/>
            <div className="ProfileInfo">
                <h1>{`${user.username}`}</h1>
                <p>{`${user.email}`}</p>
            </div>
        </div>
        <button onClick={handlePosts}>Posts</button>
        <button onClick={handleComments}>Comments</button>
        <form onSubmit={handleUpdateProfile}>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
            <label htmlFor="">Upload Image</label>
            <input type="file" accept="image/*" onChange={e => setImage(e.target.files)}/>
            <button type="submit">Change</button>    
        </form>        
        <Outlet/>
    </div>
}

export default Profile;