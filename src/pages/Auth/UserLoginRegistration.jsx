import React, { useState } from 'react';

export default function UserLoginRegistration({ setPage }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        role: '',
        department: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false,
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: type === 'checkbox' ? checked : value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required.';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required.';
        if (!formData.email.trim()) newErrors.email = 'Email is required.';
        if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid.';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required.';
        if (!/^\d{10,15}$/.test(formData.phone)) newErrors.phone = 'Phone number must be 10-15 digits.';
        if (!formData.role) newErrors.role = 'Role is required.';
        if (!formData.department) newErrors.department = 'Department is required.';
        if (!formData.password) newErrors.password = 'Password is required.';
        if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}/.test(formData.password)) 
            newErrors.password = 'Password must meet complexity requirements.';
        if (formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = 'Passwords do not match.';
        if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept Terms & Conditions.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Simulate registration success
            alert('Registration successful! Redirecting to login...');
            setPage('login');
        }
    };

    return (
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left Side */}
                <div className="hidden md:block bg-blue-900 p-12 text-white">
                    <div className="h-full flex flex-col justify-between">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Join Gyanam School</h2>
                            <p className="text-blue-200 mb-8">Create your account and start simplifying your Gyanam school management today.</p>
                            
                            <div className="space-y-6 mt-12">
                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-800 rounded-full p-2 mt-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">Streamlined Administration</h3>
                                        <p className="text-blue-200 text-sm">Manage your entire school operations from a single dashboard.</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-800 rounded-full p-2 mt-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">Data Security</h3>
                                        <p className="text-blue-200 text-sm">Your data is encrypted and securely stored with regular backups.</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-800 rounded-full p-2 mt-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">24/7 Support</h3>
                                        <p className="text-blue-200 text-sm">Our dedicated support team is always available to assist you.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-auto">
                            <p className="text-sm text-blue-200">Already registered?</p>
                            <button 
                                onClick={() => setPage('login')}
                                className="text-white font-medium hover:underline"
                            >
                                Sign in to your account →
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Side - Registration Form */}
                <div className="p-8 md:p-12">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Your Account</h2>
                        <p className="text-gray-500">Register as an administrator or staff member</p>
                    </div>

                    <form onSubmit={handleSubmit} autoComplete="off" className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            {/* First Name */}
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                <input
                                    id="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-2"
                                />
                                {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
                            </div>
                            {/* Last Name */}
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                <input
                                    id="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-2"
                                />
                                {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-2"
                            />
                            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                        </div>

                        {/* Phone */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input
                                id="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-2"
                            />
                            {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Role */}
                            <div>
                                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                <select
                                    id="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-2"
                                >
                                    <option value="">Select Role</option>
                                    <option>Admin</option>
                                    <option>Tutor</option>
                                    <option>Staff</option>
                                </select>
                                {errors.role && <p className="text-red-500 text-xs">{errors.role}</p>}
                            </div>

                            {/* Department */}
                            <div>
                                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                                <select
                                    id="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-2"
                                >
                                    <option value="">Select Department</option>
                                    <option>Science</option>
                                    <option>Math</option>
                                    <option>English</option>
                                    <option>History</option>
                                </select>
                                {errors.department && <p className="text-red-500 text-xs">{errors.department}</p>}
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-2"
                            />
                            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                            <p className="mt-1 text-xs text-gray-500">Minimum 8 characters with uppercase, lowercase, number, and special character</p>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-2"
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
                        </div>

                        {/* Terms Checkbox */}
                        <div>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    id="termsAccepted"
                                    type="checkbox"
                                    checked={formData.termsAccepted}
                                    onChange={handleChange}
                                    className="rounded text-blue-600"
                                />
                                <span className="text-sm text-gray-700">I agree to the <a href="#" className="text-blue-600 hover:underline">Terms & Conditions</a></span>
                            </label>
                            {errors.termsAccepted && <p className="text-red-500 text-xs">{errors.termsAccepted}</p>}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-900 text-white font-medium py-3 rounded-lg hover:bg-blue-800 transition"
                        >
                            Create Account
                        </button>
                    </form>

                    {/* Already have an account link */}
                    <div className="mt-6 text-center text-sm text-gray-600 md:hidden">
                        Already have an account?
                        <button 
                            onClick={() => setPage('login')}
                            className="ml-1 text-blue-600 font-medium hover:underline"
                        >
                            Sign in
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
