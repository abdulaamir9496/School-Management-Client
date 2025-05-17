import React, { useState } from 'react';

const Login = ({ onLoginSuccess, setPage }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Simple validation
        if (!email || !password) {
            setError('Please enter both email and password');
            return;
        }
        
        // Handle login logic here (you can replace this with real API calls)
        console.log('Login attempt with:', { email, password });

        // Simulate a successful login
        // In a real app, you would verify credentials with your backend
        if (email && password) {
            // Call the onLoginSuccess function passed from the App component
            onLoginSuccess();
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="container flex justify-center items-center min-h-screen p-4 bg-gradient-to-br from-indigo-100 to-blue-50">
            <div className="login-card bg-white shadow-lg rounded-lg p-8 w-full max-w-xs md:max-w-md transition-all duration-300 hover:shadow-2xl">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Welcome back</h2>
                    <p className="text-gray-500">Sign in to access your account</p>
                </div>

                {error && (
                    <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="border border-gray-300 p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <div className="flex justify-between mb-1">
                            <label className="block text-gray-700 font-medium">Password</label>
                            <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="border border-gray-300 p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium w-full py-2 rounded-md transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Sign In
                    </button>

                    <div className="text-center text-gray-600 mt-4">
                        <span>Don't have an account? </span>
                        <button 
                            onClick={() => setPage('register')} 
                            className="text-blue-600 hover:underline font-medium"
                        >
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;