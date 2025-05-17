import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages & Components
import LandingPage from './LandingPage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ChangePassword from './components/ChangePassword';
import AccountRecoveryForgotPassword from './components/AccountRecoveryForgotPassword';
import ResetPassword from './components/ResetPassword';
import Dashboard from './pages/Dashboard/DashboardHome';

// Context & Utilities
import AuthProvider from './context/AuthContext';
import PrivateRoute from './utils/PrivateRoute';
// import { useState } from 'react';


function App() {

  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          {/* Public routes */}
          {/* <Route path="/" element={<LandingPage />} /> */}
          <Route path="/" element={<LandingPage/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/forgot-password" element={<AccountRecoveryForgotPassword />} />
          <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
          
          {/* Protected routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/change-password" element={<ChangePassword />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
