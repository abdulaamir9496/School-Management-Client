import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [authChecked, setAuthChecked] = useState(false);

    // Base URL for API requests
    const BASE_URL = 'https://school-management-server-1pvb.onrender.com';

    // Configure axios defaults
    useEffect(() => {
        axios.defaults.withCredentials = true;
    }, []);

    // Axios interceptor to handle token expiration
    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (!error.response) {
                    return Promise.reject(error);
                }

                const originalRequest = error.config;

                // If error is 401 and not already retrying
                if (
                    error.response.status === 401 &&
                    !originalRequest._retry &&
                    !originalRequest.url.includes('/api/auth/refresh-token')
                ) {
                    originalRequest._retry = true;

                    try {
                        // Try to refresh the token
                        const { data } = await axios.post(`${BASE_URL}/api/auth/refresh-token`);

                        // If successful, retry the original request
                        if (data.success) {
                            return axios(originalRequest);
                        }
                    } catch (refreshError) {
                        // If refresh fails, log out the user
                        setCurrentUser(null);
                        return Promise.reject(refreshError);
                    }
                }

                return Promise.reject(error);
            }
        );

        // Clean up interceptor on component unmount
        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, [BASE_URL]);

    // Check if user is authenticated on initial load
    useEffect(() => {
        const checkUser = async () => {
            try {
                // Try with /api prefix first
                const { data } = await axios.get(`${BASE_URL}/api/auth/me`);
                
                if (data.success) {
                    setCurrentUser(data.admin || data.data);
                }
            } catch {
                try {
                    // If first attempt fails, try without /api prefix
                    const { data } = await axios.get(`${BASE_URL}/auth/me`);
                    
                    if (data.success) {
                        setCurrentUser(data.admin || data.data);
                    }
                } catch {
                    // Both attempts failed, log error and set user to null
                    console.log('Auth check error:', error);
                    setCurrentUser(null);
                }
            } finally {
                setLoading(false);
                setAuthChecked(true);
            }
        };

        checkUser();
    }, [BASE_URL]);

    // Register user
    const register = async (userData) => {
        try {
            setLoading(true);
            setError(null);

            const { data } = await axios.post(`${BASE_URL}/api/auth/register`, userData);

            if (data.success) {
                setCurrentUser(data.admin);
                toast.success('Registration successful!');
                return { success: true };
            }
        } catch {
            // Try without /api prefix if first attempt fails
            try {
                const { data } = await axios.post(`${BASE_URL}/auth/register`, userData);
                
                if (data.success) {
                    setCurrentUser(data.admin);
                    toast.success('Registration successful!');
                    return { success: true };
                }
            } catch {
                const message = error.response?.data?.message || 'Registration failed';
                setError(message);
                toast.error(message);
                return { success: false, message };
            }
        } finally {
            setLoading(false);
        }
    };

    // Login user
    const login = async (credentials) => {
        try {
            setLoading(true);
            setError(null);

            const { data } = await axios.post(`${BASE_URL}/api/auth/login`, credentials);

            if (data.success) {
                setCurrentUser(data.admin);
                toast.success('Login successful!');
                return { success: true };
            }
        } catch {
            // Try without /api prefix if first attempt fails
            try {
                const { data } = await axios.post(`${BASE_URL}/auth/login`, credentials);
                
                if (data.success) {
                    setCurrentUser(data.admin);
                    toast.success('Login successful!');
                    return { success: true };
                }
            } catch {
                const message = error.response?.data?.message || 'Login failed';
                setError(message);
                toast.error(message);
                return { success: false, message };
            }
        } finally {
            setLoading(false);
        }
    };

    // Logout user
    const logout = async () => {
        try {
            setLoading(true);
            
            // Try with /api prefix first
            try {
                await axios.get(`${BASE_URL}/api/auth/logout`);
            } catch {
                // If fails, try without /api prefix
                await axios.get(`${BASE_URL}/auth/logout`);
            }
            
            setCurrentUser(null);
            toast.info('Logged out successfully');
        } catch {
            console.error('Logout error:', error);
        } finally {
            setLoading(false);
        }
    };

    // Change password
    const changePassword = async (passwordData) => {
        try {
            setLoading(true);
            setError(null);

            // Try with /api prefix first
            try {
                const { data } = await axios.put(`${BASE_URL}/api/auth/change-password`, passwordData);
                
                if (data.success) {
                    toast.success('Password changed successfully!');
                    return { success: true };
                }
            } catch {
                // If fails, try without /api prefix
                const { data } = await axios.put(`${BASE_URL}/auth/change-password`, passwordData);
                
                if (data.success) {
                    toast.success('Password changed successfully!');
                    return { success: true };
                }
            }
        } catch {
            const message = error.response?.data?.message || 'Failed to change password';
            setError(message);
            toast.error(message);
            return { success: false, message };
        } finally {
            setLoading(false);
        }
    };

    // Forgot password
    const forgotPassword = async (email) => {
        try {
            setLoading(true);
            setError(null);

            // Try with /api prefix first
            try {
                const { data } = await axios.post(`${BASE_URL}/api/auth/forgot-password`, { email });
                
                if (data.success) {
                    toast.success('Password reset email sent!');
                    return { success: true, resetToken: data.resetToken };
                }
            } catch {
                // If fails, try without /api prefix
                const { data } = await axios.post(`${BASE_URL}/auth/forgot-password`, { email });
                
                if (data.success) {
                    toast.success('Password reset email sent!');
                    return { success: true, resetToken: data.resetToken };
                }
            }
        } catch {
            const message = error.response?.data?.message || 'Failed to send reset email';
            setError(message);
            toast.error(message);
            return { success: false, message };
        } finally {
            setLoading(false);
        }
    };

    // Reset password
    const resetPassword = async (resetToken, password) => {
        try {
            setLoading(true);
            setError(null);

            // Try with /api prefix first
            try {
                const { data } = await axios.put(`${BASE_URL}/api/auth/reset-password/${resetToken}`, { password });
                
                if (data.success) {
                    setCurrentUser(data.admin);
                    toast.success('Password reset successful!');
                    return { success: true };
                }
            } catch {
                // If fails, try without /api prefix
                const { data } = await axios.put(`${BASE_URL}/auth/reset-password/${resetToken}`, { password });
                
                if (data.success) {
                    setCurrentUser(data.admin);
                    toast.success('Password reset successful!');
                    return { success: true };
                }
            }
        } catch {
            const message = error.response?.data?.message || 'Failed to reset password';
            setError(message);
            toast.error(message);
            return { success: false, message };
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                loading,
                error,
                authChecked,
                register,
                login,
                logout,
                changePassword,
                forgotPassword,
                resetPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;
