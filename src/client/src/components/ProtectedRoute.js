// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, roles = [], ...rest }) => {
    const token = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole'); // Retrieve userRole from localStorage

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (roles.length > 0 && !roles.includes(userRole)) {
        // If user's role is not in allowed roles, redirect to unauthorized or login
        return <Navigate to="/dashboard" />; // or show a "403 Unauthorized" page
    }

    return <Component {...rest} />;
};

export default ProtectedRoute;
