import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";

function Signup() {
    const {setLoggedIn} = useAuth();
    const {setUser} = useUser();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    async function handleSignup(event: any) {
        event.preventDefault();
        const response = await fetch('http://localhost:3000/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user: { email, password } }),
        });
        if (response.ok) {
            const data = await response.json()
            const token = response.headers.get("Authorization") + "";
            localStorage.setItem('auth_token', token);
            setLoggedIn(true);
            setUser(data.data);
            alert("Sign up successfully")
            navigate("/")
        } else {
            alert("No such user")
        }
    };

    return <div className="SignupContainer">
        <h1>Welcome</h1>
        <p>Enter your credentials to sign up</p>
        <form onSubmit={handleSignup}>
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
                <button type="submit">Sign Up</button>
            </form>
    </div>
}

export default Signup;