import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Spinner from './ui/Spinner';

const AccountRecoveryForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [resetToken, setResetToken] = useState('');
    
    const { forgotPassword, loading } = useContext(AuthContext);

    const validateForm = () => {
        const errors = {};
        
        if (!email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            errors.email = 'Email is invalid';
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
        
        const result = await forgotPassword(email);
        
        if (result.success) {
            setIsSubmitted(true);
            setResetToken(result.resetToken);
        }
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">
                <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                    {!isSubmitted ? (
                        <>
                            <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Forgot your password?
                            </h1>
                            <p className="font-light text-gray-500 dark:text-gray-400">Don't fret! Just type in your email and we will send you a code to reset your password!</p>
                            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Email</label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        id="email" 
                                        className={`bg-gray-50 border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                        placeholder="name@company.com" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {formErrors.email && <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>}
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
                                    Reset password
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    <Link to="/" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Back to login</Link>
                                </p>
                            </form>
                        </>
                    ) : (
                        <div className="text-center">
                            <div className="flex justify-center mb-4 text-green-500">
                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                                Password Reset Email Sent
                            </h2>
                            <p className="mb-4 text-gray-600 dark:text-gray-400">
                                We've sent a password reset link to <span className="font-medium">{email}</span>
                            </p>
                            
                            {/* For demo purposes only - in a real app this would be emailed */}
                            <div className="p-4 my-4 border rounded bg-gray-50 dark:bg-gray-700">
                                <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">Demo: Use this reset token</p>
                                <div className="bg-white dark:bg-gray-800 p-2 rounded border dark:border-gray-600">
                                    <code className="text-sm break-all">{resetToken}</code>
                                </div>
                                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                    (In a production app, this would be sent via email)
                                </p>
                            </div>
                            
                            <Link 
                                to={`/reset-password/${resetToken}`} 
                                className="w-full inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4"
                            >
                                Reset Password
                            </Link>
                            
                            <p className="mt-4 text-sm font-light text-gray-500 dark:text-gray-400">
                                <Link to="/" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Back to login</Link>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default AccountRecoveryForgotPassword;


// import { Link } from 'react-router-dom'
// const AccountRecoveryForgotPassword = () => {
//     return (
//         <>
//             <section className="bg-gray-50 dark:bg-gray-900">
//                 <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//                     <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
//                         <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//                             Forgot your password?
//                         </h1>
//                         <p className="font-light text-gray-500 dark:text-gray-400">Don't fret! Just type in your email and we will send you a code to reset your password!</p>
//                         <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
//                             <div>
//                                 <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Email</label>
//                                 <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
//                             </div>
//                             <div className="flex items-start">
//                                 <div className="flex items-center h-5">
//                                     <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
//                                 </div>
//                                 <div className="ml-3 text-sm">
//                                     <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
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

// export default AccountRecoveryForgotPassword