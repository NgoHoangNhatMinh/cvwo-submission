import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Category, PostData } from "../../interfaces";
import "../../styles/CreatePost.css"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function CreatePost(): JSX.Element {
    const API_URL: string | undefined = import.meta.env.VITE_API_URL;
    const [topic, setTopic] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryID, setCategoryID] = useState<number | undefined>();
    const navigate = useNavigate();

    // On submitting form, send POST request to server with the post data
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();

        if(!categoryID) {
            throw new Error("Must enter category")
        }

        const token = localStorage.getItem('auth_token');
        const postData: PostData = {
            // FIX HOW TO FETCH AND CATEGORY
            // CURRENTLY USING DEFAULT ID=1
            post: {topic, content, category_id: categoryID},
        }

        const response = await fetch(`${API_URL}/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`
            },
            body: JSON.stringify(postData)
        })

        if (response.status === 401) {
            alert("You must log in first")
            navigate("/login")
        } else if (response.ok) {
            const data = await response.json();
            alert("Post created successfully!");
            navigate(`/posts/${data.id}`);
        } else {
            console.error("Validation errors");
            alert("Failed to create post");
        }
    }

    useEffect(() => {
        fetch(`${API_URL}/categories`)
            .then(response => response.json())
            .then(data => {setCategories(data)})
    }, [])

    return (
        <div className="CreatePostContainer">
            <h1>Create new post</h1>
            <form onSubmit={handleSubmit}>
                {/* <select name="categories" id="categories" onChange={e => setCategoryID(Number(e.target.value))}>
                    {categories.map((category => <option value={category.id} key={category.id}>{category.name}</option>))}
                </select> */}
                <FormControl sx={{ minWidth: 200, marginBottom: 2 }}>
                    <InputLabel>Category</InputLabel>
                    <Select onChange={e => setCategoryID(Number(e.target.value))}>
                        {categories.map((category => <MenuItem value={category.id} key={category.id}>{category.name}</MenuItem>))}
                    </Select>
                </FormControl>
                <div>
                    <input 
                        type="text"
                        placeholder="Topic"
                        value={topic}
                        onChange={e => setTopic(e.target.value)}
                        required 
                    />
                </div>
                <div>
                    <input 
                        type="text"
                        placeholder="Content"
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

export default CreatePost;