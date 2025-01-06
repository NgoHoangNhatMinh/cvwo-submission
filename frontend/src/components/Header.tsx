import "../styles/Layout.css"
import { Link, useNavigate } from "react-router-dom";
import Logout from "./authorization/Logout";
import { useAuth } from "./authorization/AuthContex";
import { useEffect } from "react";

function Header() {
    const {loggedIn, setLoggedIn} = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        setLoggedIn(false);
        Logout();
    }

    function handleLogin() {
        navigate("/login");
    }

    function handleCreate() {
        navigate("/posts/new")
    }

    function handleProfile() {

    }

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (token === null) {
            setLoggedIn(false);
        } else {
            setLoggedIn(true);
        }
    }, [loggedIn])

    return <div className="HeaderContainer">
        <Link to="/" className="Logo">Logo</Link>
        <div className="Options">
            {loggedIn 
                ? <>
                    <button onClick={handleLogout}>Log out</button>
                    <button onClick={handleCreate}>Create</button>
                    <button onClick={handleProfile}>Profile</button>
                </> 
                // : <Link to="/login" className="LoginOption">Log In</Link>
                : <button onClick={handleLogin}>Log in</button>
            }
        </div>
    </div>
}

export default Header;