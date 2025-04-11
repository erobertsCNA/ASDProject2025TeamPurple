import React, { useEffect, useState } from 'react';
import { getDashboardData } from '../utils/fetch'; // Utility function to fetch dashboard data

const DashboardPage = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch data when the component mounts
        const fetchData = async () => {
            try {
                const response = await getDashboardData(); // API call to get data
                console.log("Dashboard response:", response); // <-- add this
                setDashboardData(response); // Set data to state
            } catch (err) {
                setError('Failed to fetch dashboard data');
            }
        };
        fetchData();
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    if (!dashboardData) {
        return <p>Loading...</p>; // Show loading state
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>{dashboardData.message}</p>
            {/* Add more user-specific content here */}
        </div>
    );
};

export default DashboardPage;
