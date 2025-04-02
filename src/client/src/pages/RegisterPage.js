// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { registerUser } from '../utils/fetch'; // Importing the registerUser function

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        userId: '',
        firstName: '',
        lastName: '',
        dob: '',
        addressUnit: '',
        addressStreet: '',
        addressCity: '',
        addressStateProv: '',
        addressCountry: '',
        addressPostCode: '',
        phone: '',
        email: '',
        password: '',
        emergContactName: '',
        emergContactPhone: '',
        emergContactRel: '',
        userRole: 'user'
    });

    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const response = await registerUser(formData); // Using registerUser from fetch.jsx
            alert(response.message); // Handle success
        } catch (err) {
            setError(err.message); // Handle error
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="userId"
                    placeholder="User ID"
                    value={formData.userId}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="dob"
                    placeholder="Date of Birth"
                    value={formData.dob}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="addressUnit"
                    placeholder="Address Unit"
                    value={formData.addressUnit}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="addressStreet"
                    placeholder="Address Street"
                    value={formData.addressStreet}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="addressCity"
                    placeholder="City"
                    value={formData.addressCity}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="addressStateProv"
                    placeholder="State/Province"
                    value={formData.addressStateProv}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="addressCountry"
                    placeholder="Country"
                    value={formData.addressCountry}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="addressPostCode"
                    placeholder="Postal Code"
                    value={formData.addressPostCode}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="emergContactName"
                    placeholder="Emergency Contact Name"
                    value={formData.emergContactName}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="emergContactPhone"
                    placeholder="Emergency Contact Phone"
                    value={formData.emergContactPhone}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="emergContactRel"
                    placeholder="Emergency Contact Relationship"
                    value={formData.emergContactRel}
                    onChange={handleChange}
                />
                <select
                    name="userRole"
                    value={formData.userRole}
                    onChange={handleChange}
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;
