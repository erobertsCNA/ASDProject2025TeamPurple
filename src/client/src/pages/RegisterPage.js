// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { registerUser } from '../utils/fetch'; // Importing the registerUser function
import '../styles/RegisterPage.css'; // Import the CSS for styling

const RegisterPage = () => {
    const navigate = useNavigate(); // Hook to navigate programmatically

    const [formData, setFormData] = useState({
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
        emergContactRel: ''
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
            navigate('/login'); // Redirect to login page after successful registration
        } catch (err) {
            setError(err.message); // Handle error
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="registerPageContainer">
            <div className="registerContainer">
                <h1>Register</h1>
                {error && <p className="errorMessage">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="formGrid">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="inputField"
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="inputField"
                        />
                        <input
                            type="date"
                            name="dob"
                            placeholder="Date of Birth"
                            value={formData.dob}
                            onChange={handleChange}
                            className="inputField"
                        />
                        <input
                            type="text"
                            name="addressUnit"
                            placeholder="Address Unit"
                            value={formData.addressUnit}
                            onChange={handleChange}
                            className="inputField"
                        />
                        <input
                            type="text"
                            name="addressStreet"
                            placeholder="Address Street"
                            value={formData.addressStreet}
                            onChange={handleChange}
                            className="inputField"
                        />
                        <input
                            type="text"
                            name="addressCity"
                            placeholder="City"
                            value={formData.addressCity}
                            onChange={handleChange}
                            className="inputField"
                        />
                        <input
                            type="text"
                            name="addressStateProv"
                            placeholder="State/Province"
                            value={formData.addressStateProv}
                            onChange={handleChange}
                            className="inputField"
                        />
                        <input
                            type="text"
                            name="addressCountry"
                            placeholder="Country"
                            value={formData.addressCountry}
                            onChange={handleChange}
                            className="inputField"
                        />
                        <input
                            type="text"
                            name="addressPostCode"
                            placeholder="Postal Code"
                            value={formData.addressPostCode}
                            onChange={handleChange}
                            className="inputField"
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="inputField"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="inputField"
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="inputField"
                        />
                        <input
                            type="text"
                            name="emergContactName"
                            placeholder="Emergency Contact Name"
                            value={formData.emergContactName}
                            onChange={handleChange}
                            className="inputField"
                        />
                        <input
                            type="text"
                            name="emergContactPhone"
                            placeholder="Emergency Contact Phone"
                            value={formData.emergContactPhone}
                            onChange={handleChange}
                            className="inputField"
                        />
                        <input
                            type="text"
                            name="emergContactRel"
                            placeholder="Emergency Contact Relationship"
                            value={formData.emergContactRel}
                            onChange={handleChange}
                            className="inputField"
                        />
                    </div>
                    <button type="submit" className="submitButton" disabled={isSubmitting}>
                        {isSubmitting ? 'Registering...' : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
