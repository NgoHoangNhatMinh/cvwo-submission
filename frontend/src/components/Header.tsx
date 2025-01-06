import "../styles/Layout.css"
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContex";
import { useEffect } from "react";

function Header() {
    const {loggedIn, setLoggedIn} = useAuth();
    const navigate = useNavigate();

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
                : <>
                    <button onClick={handleSignup}>Sign up</button>
                    <button onClick={handleLogin}>Log in</button>
                </>
            }
        </div>
    </div>
}

export default Header;