import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { loginUser } from '../utils/fetch'; // Named import for loginUser

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

            if (response && response.message === "Login successful!") {
                // Store the authentication token (use the token from the backend response)
                localStorage.setItem('authToken', response.token); // Set the actual token from the response

                // Navigate to dashboard after successful login
                navigate('/dashboard');
            } else {
                setErrorMessage(response?.error || "Login failed.");
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("An error occurred while logging in.");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};

export default LoginPage;
