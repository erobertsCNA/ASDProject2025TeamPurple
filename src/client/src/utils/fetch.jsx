const API_URL = 'http://localhost:5000';

// Helper function to handle the response
const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
    }
    return response.json();
};

// Register User
export const registerUser = async (userData) => {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    return handleResponse(response);
};

// Login User
export const loginUser = async (url, method, credentials) => {
    const response = await fetch(`${API_URL}${url}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),  // credentials (email, password)
    });
    return handleResponse(response);
};

// User Dashboard (protected)
export const getDashboardData = async () => {
    const token = localStorage.getItem('authToken'); // Get the token

    if (!token) {
        throw new Error('No token found, please login.');
    }

    const response = await fetch(`${API_URL}/dashboard`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`, // Send token in Authorization header
        },
    });

    if (!response.ok) {
        const errorData = await response.json(); // Get the response error message
        throw new Error(errorData.message || 'Failed to fetch dashboard data');
    }

    return await response.json(); // Return response data
};
