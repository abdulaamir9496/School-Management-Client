import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Spinner from './ui/Spinner';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    
    const navigate = useNavigate();
    const { login, loading } = useContext(AuthContext);

    const validateForm = () => {
        const errors = {};
        
        if (!email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            errors.email = 'Email is invalid';
        }
        
        if (!password) {
            errors.password = 'Password is required';
        }
        
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        const result = await login({ email, password, rememberMe });
        
        if (result.success) {
            navigate('/dashboard');
        }
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Email</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    className={`bg-gray-50 border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                    placeholder="name@company.com" 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    value={email}
                                />
                                {formErrors.email && <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>}
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    placeholder="••••••••" 
                                    className={`bg-gray-50 border ${formErrors.password ? 'border-red-500' : 'border-gray-300'} text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    value={password}
                                />
                                {formErrors.password && <p className="mt-1 text-sm text-red-500">{formErrors.password}</p>}
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input 
                                            id="remember" 
                                            aria-describedby="remember" 
                                            type="checkbox" 
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" 
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <Link to="/forgot-password" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Forgot password?</Link>
                            </div>
                            <button 
                                type="submit" 
                                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Sign in
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don't have an account yet? 
                                <Link to="/register" className="ml-1 font-medium text-blue-600 hover:underline dark:text-blue-500">
                                    Sign up
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;


// import { Link } from 'react-router-dom'
// import axios from 'axios';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         axios.post('http://localhost:5000/login', { email, password })
//         .then(result => {console.log(result)
//             if(result.data === "success") {
//                 alert("Login Successful");
//                 navigate('/dashboard')
//             } else {
//                 alert(result.data);
//             }
//         })
//         .catch(err => console.log(err))
//     }

//     return (
//         <>
//             <section className="bg-gray-50 dark:bg-gray-900">
//                 <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//                     <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//                         <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//                             <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//                                 Sign in to your account
//                             </h1>
//                             <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
//                                 <div>
//                                     <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Email</label>
//                                     <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required 
//                                     onChange={(e) => setEmail(e.target.value)} value={email}
//                                     />
//                                 </div>
//                                 <div>
//                                     <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
//                                     <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required 
//                                     onChange={(e) => setPassword(e.target.value)} value={password}
//                                     />
//                                 </div>
//                                 <div className="flex items-center justify-between">
//                                     <div className="flex items-start">
//                                         <div className="flex items-center h-5">
//                                             <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
//                                         </div>
//                                         <div className="ml-3 text-sm">
//                                             <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
//                                         </div>
//                                     </div>
//                                     <Link to="/forgot-password" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>
//                                 </div>
//                                 <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign in</button>
//                                 <p className="text-sm font-light text-gray-500 dark:text-gray-400">
//                                     Don't have an account yet? 
//                                     <Link to="/register" 
//                                     className="font-medium text-primary-600 hover:underline dark:text-primary-500"
//                                     >
//                                         Sign up
//                                     </Link>
//                                 </p>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </>
//     )
// }

// export default Login