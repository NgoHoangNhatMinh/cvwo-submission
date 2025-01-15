import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { Category } from "../../interfaces";
import Logo from '../../assets/react.svg'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Avatar, InputAdornment} from "@mui/material";
import { useTheme } from "../contexts/ThemeContext";
import axios from "axios";
import { AccountMenu } from "./AccountMenu";
import ContrastIcon from '@mui/icons-material/Contrast';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

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
    const [error, setError] = useState<string>("");

    function handleLogout() {
        setLoggedIn(false);
        localStorage.removeItem("auth_token");
        navigate("/");
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
        navigate("/user")
    }

    function handleThemeChange() {
        localStorage.setItem('is_dark', String(!isDarkMode));
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

        // Fetch current user information and logged in status based on token verification
        if (token === null) {
            setLoggedIn(false);
            setUser(undefined);
        } else {
            setLoggedIn(true);
            axios.get(`${API_URL}/current_user`, {
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
                        setUser(response.data)
                    }
                })
                .catch (error => {
                    setError(error.message);
                    throw new Error(error.message);
                }) 
        }

        // Set theme based on existing preference
        const isDark = localStorage.getItem('is_dark');
        if (isDark === null) {
            setIsDarkMode(false);
        } else {
            setIsDarkMode(isDark === "true");
        } 
    }, [])

    // Fetch categories data on mount
    useEffect(() => {
        axios.get(`${API_URL}/categories`)
            .then(response => {setCategories(response.data)})
    }, [])

    useEffect(() => {
        // Toggle dark/light theme by changing the data-theme attribute
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
      }, [isDarkMode]);

    return <div className="HeaderContainer">
        <Link to="/" className="LeftHeader"><Avatar src={Logo}></Avatar></Link>
        {/* In small screen, search form should turn into icon that can expand the whole bar upon click */}
        <div className="MiddleHeader">
            <FormControl
                className="Form"
                component="form" // Ensures this acts as a form element
                onSubmit={handleSearch}
                sx={{
                    m: 1,
                    minWidth: 200,
                    display: { xs: 'none', sm: 'flex' },
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "center",
                }
            }
            >
                <TextField
                    className="TextField"
                    id="searchbox"
                    label="Search Forum"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    slotProps={{
                    input: {
                        startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                        ),
                    },
                    }}
                    variant="outlined"
                />
                {/* <InputLabel id="category-select-label" sx={{ whiteSpace: "nowrap" }}></InputLabel>
                <Select
                    className="Select"
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
                </Select> */}
            </FormControl>
        </div>
        <div className="RightHeader">
            <Button onClick={handleThemeChange}><ContrastIcon></ContrastIcon></Button>
            {loggedIn 
                ? <>
                    <Button onClick={handleLogout}>Log out</Button>
                    <Button onClick={handleCreate}><AddIcon></AddIcon> Create</Button>
                    <AccountMenu handleLogout={handleLogout} handleProfile={handleProfile}></AccountMenu>
                </> 
                : <>
                    <Button onClick={handleSignup}>Sign up</Button>
                    <Button onClick={handleLogin}>Log in</Button>
                </>
            }
        </div>
    </div>
}

export default Header;