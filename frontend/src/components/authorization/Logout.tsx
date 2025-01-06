import { useEffect } from "react";
import { useUser } from "../contexts/UserContext";

function Logout() {
    const { setUser } = useUser();

    localStorage.removeItem("auth_token");
    alert("Log out successfully")
}

export default Logout