const API_URL = 'http://localhost:5000';

// Helper function to handle the response
const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
    }
    return response.json();
};

// Fetch all users (for manager dashboard)
export const getAllUsers = async () => {
    const response = await fetch(`${API_URL}/users`, {
        method: 'GET',
        credentials: 'include', // to include the cookie with JWT
    });
    return handleResponse(response);
};

// Register User
export const registerUser = async (userData) => {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include', // Include cookies with the request
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
        credentials: 'include', // Include cookies with the request
    });
    return handleResponse(response);
};

// User Dashboard (protected)
export const getDashboardData = async () => {
    const response = await fetch(`${API_URL}/dashboard`, {
        method: 'GET',
        credentials: 'include', // Include cookies with the request
    });

    if (!response.ok) {
        const errorData = await response.json(); // Get the response error message
        throw new Error(errorData.message || 'Failed to fetch dashboard data');
    }

    return await response.json(); // Return response data
};

export const deleteUser = async (userId) => {
    try {
        const response = await fetch(`http://localhost:5000/users/${userId}`, {
            method: 'DELETE',
            credentials: 'include', // if using cookies
        });

        if (!response.ok) {
            const errorText = await response.text(); // safely read HTML fallback
            throw new Error(errorText);
        }

        const data = await response.json(); // should be safe now
        return data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};

export const updateUserRole = async (userId, newRole) => {
    try {
        const response = await fetch(`http://localhost:5000/users/${userId}/role`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userRole: newRole }),
        });

        if (!response.ok) {
            throw new Error('Failed to update role');
        }

        return await response.json();
    } catch (err) {
        console.error("Error updating role:", err);
        return { success: false, message: err.message };
    }
};
