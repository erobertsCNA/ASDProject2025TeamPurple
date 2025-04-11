import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { loginUser } from '../utils/fetch'; // Named import for loginUser
import '../styles/LoginPage.css'; // Corrected path for styles

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogin = async (e) => {
        e.preventDefault();

        const userData = { email, password };

        try {
            // Make POST request to backend API using loginUser from utils
            const response = await loginUser('/login', 'POST', userData);
            console.log("Login response:", response);

            if (response && response.message === "Login successful!") {
                localStorage.setItem('authToken', response.token);
                localStorage.setItem('userRole', response.userRole);

                if (response.userRole === 'admin') {
                    navigate('/admindashboard');
                } else {
                    navigate('/dashboard');
                }
            }
            else {
                setErrorMessage(response?.error || "Login failed.");
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("An error occurred while logging in.");
        }
    };

    return (
        <div className="loginPageContainer">
            <div className="loginContainer">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="inputField"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="inputField"
                            required
                        />
                    </div>
                    <button type="submit" className="submitButton">Login</button>
                </form>
                {errorMessage && <p className="errorMessage">{errorMessage}</p>}
            </div>
        </div>
    );
};

export default LoginPage;
