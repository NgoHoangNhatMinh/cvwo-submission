import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContex";
import { useUser } from "../contexts/UserContext";
import "../../styles/Authorization.css"

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
            const token = response.headers.get("Authorization") + "";
            const userData = data.data;
            localStorage.setItem('auth_token', token);
            localStorage.setItem('user_data', userData)
            setLoggedIn(true);
            setUser(userData);
            navigate("/")
        } else {
            alert("No such user")
        }
    };

    return <div className="LoginContainer">
        <h1>Welcome Back</h1>
        <p>Enter your credentials to access your account</p>
        <form onSubmit={handleLogin}>
                <div>
                    <input
                        type="text"
                        placeholder="Enter your email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Log In</button>
            </form>
    </div>
}

export default Login;