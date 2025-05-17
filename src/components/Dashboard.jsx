import { useContext } from 'react';
import { User, Mail, Calendar, Settings, Info } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import Navbar from './ui/Navbar';
import Spinner from './ui/Spinner';

const Dashboard = () => {
    const { currentUser, loading } = useContext(AuthContext);

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Admin Dashboard
                    </h1>
                    <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
                        Welcome to your secure admin portal. Manage your account and settings below.
                    </p>
                </div>
                
                {/* Admin Profile Card */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-8">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="bg-blue-600 rounded-full p-4 mb-4 md:mb-0 md:mr-6">
                            <User className="h-12 w-12 text-white" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {currentUser?.name}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center md:justify-start mt-1">
                                <Mail className="h-4 w-4 mr-2" />
                                {currentUser?.email}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center md:justify-start mt-1">
                                <Calendar className="h-4 w-4 mr-2" />
                                Member since: {new Date(currentUser?.createdAt || Date.now()).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Account Settings Card */}
                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                        <div className="bg-blue-600 p-4">
                            <Settings className="h-8 w-8 text-white" />
                        </div>
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Account Settings</h3>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">
                                Update your profile information and account preferences
                            </p>
                            <div className="mt-4">
                                <a href="/change-password" className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400 font-medium">
                                    Change Password →
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    {/* Security Card */}
                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                        <div className="bg-green-600 p-4">
                            <Info className="h-8 w-8 text-white" />
                        </div>
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Security</h3>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">
                                Your account is protected with JWT authentication
                            </p>
                            <div className="mt-4">
                                <a href="#" className="text-green-600 hover:text-green-800 dark:text-green-500 dark:hover:text-green-400 font-medium">
                                    Learn More →
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    {/* Activity Card */}
                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                        <div className="bg-purple-600 p-4">
                            <Calendar className="h-8 w-8 text-white" />
                        </div>
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Activity</h3>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">
                                View your recent account activity and login history
                            </p>
                            <div className="mt-4">
                                <a href="#" className="text-purple-600 hover:text-purple-800 dark:text-purple-500 dark:hover:text-purple-400 font-medium">
                                    View Activity →
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

// const Dashboard = () => {
//     return (
//         <div>
//             <h1 className="text-3xl font-bold text-center mt-10">Welcome to the Dashboard Page</h1>
//             <p className="text-center mt-4">This is a simple Dashboard page for our application.</p>
//             <div className="flex justify-center mt-10">
//                 <img src="/path/to/your/image.jpg" alt="Home Image" className="w-1/2 h-auto rounded-lg shadow-lg" />
//             </div>
//         </div>
//     )
// }

// export default Dashboard
