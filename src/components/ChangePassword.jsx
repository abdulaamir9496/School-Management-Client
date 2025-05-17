import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from './ui/Navbar';
import Spinner from './ui/Spinner';

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    
    const navigate = useNavigate();
    const { changePassword, loading } = useContext(AuthContext);

    const validateForm = () => {
        const errors = {};
        
        if (!currentPassword) {
            errors.currentPassword = 'Current password is required';
        }
        
        if (!newPassword) {
            errors.newPassword = 'New password is required';
        } else if (newPassword.length < 6) {
            errors.newPassword = 'New password must be at least 6 characters';
        }
        
        if (newPassword !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }
        
        if (!termsAccepted) {
            errors.terms = 'You must accept the terms and conditions';
        }
        
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        const result = await changePassword({ 
            currentPassword, 
            newPassword 
        });
        
        if (result.success) {
            navigate('/dashboard');
        }
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <>
            <Navbar />
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">
                    <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Change Password
                        </h2>
                        <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="current-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current Password</label>
                                <input 
                                    type="password" 
                                    name="current-password" 
                                    id="current-password" 
                                    placeholder="••••••••" 
                                    className={`bg-gray-50 border ${formErrors.currentPassword ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                />
                                {formErrors.currentPassword && <p className="mt-1 text-sm text-red-500">{formErrors.currentPassword}</p>}
                            </div>
                            <div>
                                <label htmlFor="new-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                                <input 
                                    type="password" 
                                    name="new-password" 
                                    id="new-password" 
                                    placeholder="••••••••" 
                                    className={`bg-gray-50 border ${formErrors.newPassword ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                {formErrors.newPassword && <p className="mt-1 text-sm text-red-500">{formErrors.newPassword}</p>}
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                <input 
                                    type="password" 
                                    name="confirm-password" 
                                    id="confirm-password" 
                                    placeholder="••••••••" 
                                    className={`bg-gray-50 border ${formErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                {formErrors.confirmPassword && <p className="mt-1 text-sm text-red-500">{formErrors.confirmPassword}</p>}
                            </div>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input 
                                        id="terms" 
                                        aria-describedby="terms" 
                                        type="checkbox" 
                                        className={`w-4 h-4 border ${formErrors.terms ? 'border-red-500' : 'border-gray-300'} rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800`}
                                        checked={termsAccepted}
                                        onChange={(e) => setTermsAccepted(e.target.checked)}
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className={`font-light ${formErrors.terms ? 'text-red-500' : 'text-gray-500 dark:text-gray-300'}`}>
                                        I accept the <a className="font-medium text-blue-600 hover:underline dark:text-blue-500" href="#">Terms and Conditions</a>
                                    </label>
                                </div>
                            </div>
                            <button 
                                type="submit" 
                                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Update password
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                <Link to="/dashboard" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Back to dashboard</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ChangePassword;


// import { Link } from 'react-router-dom'

// const ChangePassword = () => {
//     return (
//         <>
//             <section className="bg-gray-50 dark:bg-gray-900">
//                 <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//                     <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
//                         <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//                             Change Password
//                         </h2>
//                         <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
//                             <div>
//                                 <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Email</label>
//                                 <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
//                             </div>
//                             <div>
//                                 <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
//                                 <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
//                             </div>
//                             <div>
//                                 <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
//                                 <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
//                             </div>
//                             <div className="flex items-start">
//                                 <div className="flex items-center h-5">
//                                     <input id="newsletter" aria-describedby="newsletter" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
//                                 </div>
//                                 <div className="ml-3 text-sm">
//                                     <label htmlFor="newsletter" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
//                                 </div>
//                             </div>
//                             <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Reset password</button>
//                             <p className="text-sm font-light text-gray-500 dark:text-gray-400">
//                                 <Link to="/" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Back to login</Link>
//                             </p>
//                         </form>
//                     </div>
//                 </div>
//             </section>
//         </>
//     )
// }

// export default ChangePassword