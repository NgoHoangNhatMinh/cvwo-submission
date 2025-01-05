import "../styles/Layout.css"
import { Link } from "react-router-dom";
import handleLogout from "./Signout";

function Header() {
    return <div className="HeaderContainer">
        <Link to="/" className="Logo">Logo</Link>
        <div className="Options">
            <button onClick={handleLogout}>Log out</button>
            <Link to="/login" className="LoginOption">Log In</Link>
            <Link to="/posts/new" className="CreateOption">+ Create</Link>
            <p>Profile</p>
        </div>
    </div>
}

export default Header;