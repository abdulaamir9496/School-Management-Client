import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import PropTypes from 'prop-types';

const PrivateRoute = () => {
    const { currentUser, loading, authChecked } = useAuth();
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    
    // After initial check, set initialLoad to false
    useEffect(() => {
        if (authChecked) {
            // Give a brief delay to prevent flickering
            const timer = setTimeout(() => {
                setIsInitialLoad(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [authChecked]);
    
    // Show loading indicator while checking authentication
    if ((loading || isInitialLoad) && !currentUser) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <p className="mt-4 text-gray-700">Checking authentication...</p>
            </div>
        );
    }
    
    // If not authenticated, redirect to login
    if (!currentUser && authChecked) {
        console.log("User not authenticated, redirecting to login");
        return <Navigate to="/login" />;
    }
    
    // Render the protected route
    return <Outlet />;
};

export default PrivateRoute;