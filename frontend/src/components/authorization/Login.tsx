import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContex";
import { useUser } from "../contexts/UserContext";

function Login() {
    const {setLoggedIn} = useAuth();
    const {setUser} = useUser();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    async function handleLogin(event: any) {
        event.preventDefault();
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user: { email, password } }),
        });
        if (response.ok) {
            const data = await response.json()
            alert("Log in successfully")
            const token = response.headers.get("Authorization") + "";
            localStorage.setItem('auth_token', token);
            setLoggedIn(true);
            setUser(data.data);
            navigate("/")
        } else {
            alert("No such user")
        }
    };

    return <div>
        <h1>Logging in...</h1>
        <Link to="/">Go back</Link>
        <form onSubmit={handleLogin}>
                <div>
                    <label >Email: </label>
                    <input 
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required 
                    />
                </div>
                <div>
                    <label >Password: </label>
                    <input 
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required 
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
    </div>
}

export default Login;