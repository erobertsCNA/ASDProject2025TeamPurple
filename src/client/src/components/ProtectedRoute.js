// src/components/ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// Function to check if the user is authenticated (based on the presence of a token)
const ProtectedRoute = ({ component: Component, ...rest }) => {
    const token = localStorage.getItem('authToken'); // Get token from localStorage

    return token ? (
        <Component {...rest} /> // Render the component if authenticated
    ) : (
        <Navigate to="/login" /> // Redirect to login if not authenticated
    );
};

export default ProtectedRoute;
