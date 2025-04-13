import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ManagerDashboardPage from './pages/ManagerDashboardPage'; // Import ManagerDashboardPage
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute component

const RouterComponent = () => {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />

                {/* Protected Routes */}
                <Route
                    path="/dashboard"
                    element={<ProtectedRoute component={DashboardPage} roles={['user', 'admin']} />}
                />
                <Route
                    path="/admindashboard"
                    element={<ProtectedRoute component={ManagerDashboardPage} roles={['admin']} />}
                />
            </Routes>
        </Router>
    );
};

export default RouterComponent;
