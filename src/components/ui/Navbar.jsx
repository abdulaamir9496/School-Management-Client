import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, Settings } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
    const { currentUser, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <nav className="bg-blue-600 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/dashboard" className="flex-shrink-0 flex items-center">
                            <User className="h-8 w-8 mr-2" />
                            <span className="font-bold text-xl">Admin Portal</span>
                        </Link>
                    </div>

                    {currentUser && (
                        <div className="flex items-center">
                            <div className="hidden md:block">
                                <div className="flex items-center">
                                    <span className="mr-4">
                                        Welcome, {currentUser.name}
                                    </span>
                                    <Link
                                        to="/change-password"
                                        className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                                    >
                                        <Settings className="h-4 w-4 mr-2" />
                                        Settings
                                    </Link>

                                    <button
                                        onClick={handleLogout}
                                        className="ml-3 text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                                    >
                                        <LogOut className="h-4 w-4 mr-2" />
                                        Logout
                                    </button>
                                </div>
                            </div>

                            <div className="md:hidden flex items-center">
                                <button
                                    onClick={handleLogout}
                                    className="text-white hover:bg-blue-700 p-2 rounded-md"
                                >
                                    <LogOut className="h-6 w-6" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;