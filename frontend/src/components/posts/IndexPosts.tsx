import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Post } from '../../interfaces';
import '../../styles/IndexPosts.css'
import { InputLabel, FormControl, Select, MenuItem } from '@mui/material';

function IndexPosts(): JSX.Element {
    const API_URL: string | undefined = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<Boolean>(true);
    const [error, setError] = useState<string>("");
    const [searchParams, setSearchParams] = useSearchParams();

    function navigateToPost(id: number) {
        navigate(`/posts/${id}`);
    }

    function handleSort(event: any) {
        const newParams = new URLSearchParams(searchParams); // Clone existing params
        newParams.set("sort", event.target.value); // Add or update the "sort" parameter
        setSearchParams(newParams); // Update the URL with the new parameters
    }

    // fetch posts data on mount
    useEffect(() => {
        fetch(`${API_URL}/posts/?${searchParams}`)
        .then(response => {
            if (!response.ok)
                throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            setPosts(data);
            setLoading(false);
        })
        .catch(error => setError(error.message))
    }, [searchParams]);

    if (error) {
        return <div>{error}</div>;
    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (!posts) {
        return <div>There are no posts</div>
    }

    // Display most recent 10 posts
    const firstTenPosts: Post[] = posts.slice(0, 10);

    return (
        <div className="PostsContainer">
            <FormControl className='FormControlSelect' sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="sort-select-label">Sort By</InputLabel>
                <Select
                    className="Select"
                    labelId="sort-select-label"
                    id="sort-select"
                    onChange={handleSort}
                    label="Sort By"
                >
                    <MenuItem value="time">By Time</MenuItem>
                    <MenuItem value="rate">By Rating</MenuItem>
                </Select>
            </FormControl>
            {
                firstTenPosts.map((post) => {
                    let postDate = new Date(post.created_at);
                    return <div className="PostBorder">
                        <div onClick={() => navigateToPost(post.id)} className="Post" key={post.id}>
                            <p>{"Category: " + post.category_id}</p>
                            <h2>{"Post " + post.id + " - " + post.topic}</h2>
                            <p>{post.content}</p>
                            <p>{postDate.toLocaleDateString()}</p>
                        </div>
                    </div>
                })
            }
        </div>
    )
}

export default IndexPosts;
