import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../utils/fetch';

const RegisterPage = () => {
    const navigate = useNavigate();

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
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const response = await registerUser(formData);
            alert(response.message);
            navigate('/login');
        } catch (err) {
            setError(err.message || 'Registration failed.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 py-12 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4 mb-6">
                        {Object.entries(formData).map(([key, value]) => (
                            <div key={key}>
                                <label className="block text-sm font-medium text-gray-700">
                                    {key.replace(/([A-Z])/g, ' $1')}
                                </label>
                                <input
                                    type={key === 'dob' ? 'date' : key === 'email' ? 'email' : key === 'password' ? 'password' : 'text'}
                                    name={key}
                                    value={value}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        ))}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Registering...' : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
