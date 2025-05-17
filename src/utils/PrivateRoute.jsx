import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Spinner from "../components/ui/Spinner";

const PrivateRoute = () => {
    const { currentUser, loading } = useContext(AuthContext);

    // Show loading spinner while checking authentication
    if (loading) {
        return <Spinner />;
    }

    // Redirect to login if not authenticated
    return currentUser ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
