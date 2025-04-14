import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/fetch';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const userData = { email, password };

        try {
            const response = await loginUser('/login', 'POST', userData);
            console.log("Login response:", response);

            if (response && response.message === "Login successful!") {
                localStorage.setItem('authToken', response.token);
                localStorage.setItem('userRole', response.userRole);

                navigate(response.userRole === 'admin' ? '/admindashboard' : '/dashboard');
            } else {
                setErrorMessage(response?.error || "Login failed.");
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("An error occurred while logging in.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                        Login
                    </button>
                </form>
                {errorMessage && <p className="text-red-500 text-sm mt-4 text-center">{errorMessage}</p>}
            </div>
        </div>
    );
};

export default LoginPage;
