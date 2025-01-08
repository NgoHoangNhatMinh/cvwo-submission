import "../styles/Layout.css"
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "./contexts/AuthContex";
import { useEffect, useState } from "react";
import { useUser } from "./contexts/UserContext";
import { Category } from "../interfaces";

function Header() {
    const {loggedIn, setLoggedIn} = useAuth();
    const {setUser} = useUser();
    const API_URL: string | undefined = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [search, setSearch] = useState<string>("")
    const [searchParams, setSearchParams] = useSearchParams();
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryID, setCategoryID] = useState<number | undefined>();

    function handleLogout() {
        setLoggedIn(false);
        localStorage.removeItem("auth_token");
        alert("Logged out successfully");
        // navigate("/login"); // Redirect to login after logout
    }

    function handleLogin() {
        navigate("/login");
    }

    function handleSignup() {
        navigate("/signup");
    }

    function handleCreate() {
        navigate("/posts/new")
    }

    function handleProfile() {
        navigate('/user')
    }

    function handleSearch(event: any) {
        event.preventDefault()

        const newParams = new URLSearchParams(searchParams); // Clone existing params
        newParams.set("q", search); // Add or update the "q" parameter
        newParams.set("category_id", String(categoryID))
        setSearchParams(newParams); // Update the URL with the new parameters

        setSearch("");
    }

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (token === null) {
            setLoggedIn(false);
            setUser(undefined);
        } else {
            setLoggedIn(true);
            fetch(`${API_URL}/current_user`, {
                headers: {
                    "Authorization": `${token}`
                }
            })
                .then(response => {
                    if (response.status === 401) {
                        setLoggedIn(false);
                        localStorage.removeItem('auth_token');
                        return undefined;
                    } else {
                        return response.json()
                    }
                })
                .then(data => setUser(data))
        }
    }, [])

    useEffect(() => {
        fetch(`${API_URL}/categories`)
            .then(response => response.json())
            .then(data => {setCategories(data)})
    }, [])

    return <div className="HeaderContainer">
        <Link to="/" className="Logo">Logo</Link>
        <form onSubmit={handleSearch}>
            <input 
                type="text" 
                value={search}
                placeholder="Search Forum"
                onChange={e => setSearch(e.target.value)}
            />
            <select name="categories" id="categories" onChange={e => setCategoryID(Number(e.target.value))}>
                    {categories.map((category => <option value={category.id} key={category.id}>{category.name}</option>))}
            </select>
            <button type="submit">Search</button>
        </form>
        <div className="Options">
            {loggedIn 
                ? <>
                    <button onClick={handleLogout}>Log out</button>
                    <button onClick={handleCreate}>Create</button>
                    <button onClick={handleProfile}>Profile</button>
                </> 
                // : <Link to="/login" className="LoginOption">Log In</Link>
                : <>
                    <button onClick={handleSignup}>Sign up</button>
                    <button onClick={handleLogin}>Log in</button>
                </>
            }
        </div>
    </div>
}

export default Header;