import React, { useState, useEffect } from 'react';
import { getAllUsers, updateUserRole, deleteUser } from '../utils/fetch';

const ManagerDashboardPage = () => {
    const [users, setUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        userRole: 'user',
    });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getAllUsers();
                setUsers(data);
            } catch (err) {
                console.error('Error fetching users:', err);
            }
        };

        fetchUsers();
    }, []);

    const handleRoleChange = async (userId, newRole) => {
        try {
            const res = await updateUserRole(userId, newRole);
            if (res.success) {
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user.userId === userId ? { ...user, userRole: newRole } : user
                    )
                );
            } else {
                console.error("Role update failed:", res.message);
            }
        } catch (err) {
            console.error("Error updating role:", err.message);
        }
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await deleteUser(userId);
                setUsers(prevUsers => prevUsers.filter(u => u.userId !== userId));
            } catch (error) {
                console.error("Delete failed:", error.message);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-5xl bg-white border border-gray-300 shadow-lg rounded-xl p-8">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Manager Dashboard</h1>

                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse border border-gray-300 rounded-lg overflow-hidden">
                        <thead className="bg-gray-200">
                        <tr>
                            <th className="border border-gray-300 px-4 py-3 text-left">Name</th>
                            <th className="border border-gray-300 px-4 py-3 text-left">Email</th>
                            <th className="border border-gray-300 px-4 py-3 text-left">Role</th>
                            <th className="border border-gray-300 px-4 py-3 text-left">Change Role</th>
                            <th className="border border-gray-300 px-4 py-3 text-left">Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.length > 0 ? (
                            users.map((u, index) => (
                                <tr
                                    key={u.userId}
                                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                                >
                                    <td className="border border-gray-300 px-4 py-2">
                                        {u.firstName} {u.lastName}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">{u.email}</td>
                                    <td className="border border-gray-300 px-4 py-2 capitalize">{u.userRole}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <select
                                            value={u.userRole}
                                            onChange={(e) => handleRoleChange(u.userId, e.target.value)}
                                            className="border px-2 py-1 rounded w-full"
                                        >
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <button
                                            onClick={() => handleDeleteUser(u.userId)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-full"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-gray-500">
                                    No users found.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManagerDashboardPage;
