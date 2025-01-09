import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { useEffect, useState } from "react";
import { useUser } from "./contexts/UserContext";
import { Category } from "../interfaces";
import Logo from '../assets/react.svg'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useTheme } from "./contexts/ThemeContext";
import { ClassNames } from "@emotion/react";

function Header() {
    const {loggedIn, setLoggedIn} = useAuth();
    const {setUser} = useUser();
    const {isDarkMode, setIsDarkMode} = useTheme();
    const API_URL: string | undefined = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [search, setSearch] = useState<string>("")
    const [searchParams, setSearchParams] = useSearchParams();
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryID, setCategoryID] = useState<number | undefined>();

    function handleLogout() {
        setLoggedIn(false);
        localStorage.removeItem("auth_token");
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
        navigate('/user');
    }

    function handleThemeChange() {
        setIsDarkMode(!isDarkMode);
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

    useEffect(() => {
        // Toggle dark/light theme by changing the data-theme attribute
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
      }, [isDarkMode]);

    return <div className="HeaderContainer">
        <Link to="/" className="Logo"><img src={Logo} alt="" width='30px'/></Link>
        <FormControl
            className="Form"
            component="form" // Ensures this acts as a form element
            onSubmit={handleSearch}
            sx={{
                m: 1,
                minWidth: 200,
                display: "flex",
                flexDirection: "row",
                gap: 2,
                alignItems: "center",
            }
        }
        >
            <TextField
                id="searchbox"
                label="Search Forum"
                variant="outlined"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <InputLabel id="category-select-label" sx={{ whiteSpace: "nowrap" }}></InputLabel>
            <Select
                labelId="category-select-label"
                id="category-select"
                value={categoryID}
                onChange={(e) => setCategoryID(Number(e.target.value))}
            >
                {categories.map((category) => (
                <MenuItem value={category.id} key={category.id}>
                    {category.name}
                </MenuItem>
                ))}
            </Select>
            <Button type="submit" variant="contained">Search</Button>
        </FormControl>
        <div className="Options">
            <button onClick={handleThemeChange}>{isDarkMode ? "Light Mode" : "Dark Mode"}</button>
            {loggedIn 
                ? <>
                    <button onClick={handleLogout}>Log out</button>
                    <button onClick={handleCreate}>Create</button>
                    <button onClick={handleProfile}>Profile</button>
                </> 
                : <>
                    <button onClick={handleSignup}>Sign up</button>
                    <button onClick={handleLogin}>Log in</button>
                </>
            }
        </div>
    </div>
}

export default Header;