import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { IndianRupee } from 'lucide-react';
import { ScrollText } from 'lucide-react';
import NewRegistration from '../Registration/NewRegistration';
// import EnquiryForm from '../Enquiry/EnquiryForm';
import BonafideMainPage from '../Certificates/BonafideMainPage';
import StudentMainPage from '../Students/StudentMainPage';
import Communication from '../Communication/Communication';
import FeesMainPage from '../Fees/FeesMainPage';
import { AuthContext } from '../../context/AuthContext'; 
import logo from "../../assets/schlogo.png";
import Enquirymain from '../Enquiry/Enquirymain';
import NewRegistrationMainPage from '../Registration/NewRegistrationMain';
import CircularCalendar from '../../components/CircularCalendar';
 // Adjust path if needed


const Icons = {
    Dashboard: () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 6a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zm0 6a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z"></path></svg>,
    Enquiry: () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>,
    Registration: () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M8 9a3 3 0 100-6 3 3 0 000 6zm0 2a6 6 0 016 6H2a6 6 0 016-6z"></path></svg>,
    Student: () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path></svg>,
    Fees: () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>,
    Certificate: () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"></path></svg>,
    Menu: () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z" clipRule="evenodd"></path></svg>,
    Close: () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 01-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 011.414-1.414l4.829 4.828 4.828-4.828a1 1 0 111.414 1.414l-4.828 4.829 4.828 4.828z" clipRule="evenodd"></path></svg>,
    User: () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>,
    Notification: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
};

const DashboardHome = () => {
    const { logout } = useContext(AuthContext); // Get logout function from context
    const [currentTab, setCurrentTab] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { currentUser } = useContext(AuthContext); // Get user from context

    const [stats, setStats] = useState({
        totalStudents: 0,
        totalFeeCollection: 0,
        totalEnquiries: 0,
        certificatesGenerated: 0,
      });
      
     useEffect(() => {
  const fetchStats = async () => {
    if (currentTab === 'dashboard') {
      try {
        const { data } = await axios.get('http://localhost:5000/api/dashboard/stats');
        setStats(data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    }
  };

  fetchStats();
}, [currentTab]);

      

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const navItems = [
        { id: 'dashboard', name: 'Dashboard', icon: Icons.Dashboard },
        { id: 'enquiry', name: 'Enquiry Form', icon: Icons.Enquiry },
        { id: 'registration', name: 'New Registration', icon: Icons.Registration },
        { id: 'student', name: 'Student Info', icon: Icons.Student },
        { id: 'fees', name: 'Fees Info', icon: Icons.Fees },
        { id: 'bonafide', name: 'Certificates', icon: Icons.Certificate },
        { id: 'communication', name: 'Communication', icon: Icons.Enquiry },
    ];

    const handleNavClick = (tabId) => {
        setCurrentTab(tabId);
        setSidebarOpen(false); // Close sidebar on mobile after navigation
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    

    return (
        <div className="h-screen flex flex-col">
            {/* Header */}
            <header className="bg-white shadow z-10 sticky top-0">
                <div className="px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center">
                        {/* Mobile menu button */}
                        <button 
                            onClick={toggleSidebar}
                            className="mr-4 md:hidden text-gray-700"
                            aria-label="Toggle menu"
                        >
                            <Icons.Menu />
                        </button>
                        
                        {/* Logo image instead of text */}
                        <div className="flex items-center">
                            <img 
                                src={logo}
                                alt="Gyanam School Logo" 
                                className="h-8 md:h-13 w-auto" // Adjust height as needed
                            />
                            {/* You can keep the text alongside the logo if desired */}
                            {/* <h1 className="ml-2 text-xl font-bold text-blue-900">Gyanam School</h1> */}
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Notification button - Added from paste.txt */}
                        <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100">
                            <Icons.Notification />
                        </button>
                        
                        {/* Display logged in user */}
                        <div className="flex items-center text-gray-1000 ">
                            <Icons.User />
                            <span className="ml-2 text-xl font-">{currentUser?.name || 'User'}</span>
                        </div>
                        <br></br>
                        <button
                            className="group relative px-6 py-3 bg-gradient-to-r from-white-600 to-blue-300 text-black rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 "
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Content Area */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar - Fixed positioning for mobile and regular for desktop */}
                <div 
                    className={
                        `${sidebarOpen ? 'block' : 'hidden'}
                        md:block md:relative md:w-64
                        fixed inset-y-0 left-0 top-0 pt-[0px] w-64 h-full z-30`
                    }
                >
                    <div className="h-full bg-gradient-to-b from-blue-700 to-blue-900 text-white overflow-y-auto flex flex-col">
                        <div className="p-4 text-xl font-bold border-b border-blue-800 flex justify-between items-center">
                            <span>Dashboard</span>
                            <button 
                                onClick={toggleSidebar}
                                className="md:hidden"
                            >
                                <Icons.Close />
                            </button>
                        </div>
                        <nav className="p-4 flex-grow">
                            <ul>
                                {navItems.map((item) => (
                                    <li key={item.id} className="mb-2">
                                        <button 
                                            onClick={() => handleNavClick(item.id)} 
                                            className={`flex items-center w-full p-3 rounded-md text-left transition ${currentTab === item.id ? 'bg-blue-800 text-white' : 'text-blue-100 hover:bg-blue-800'}`}
                                        >
                                            <span className="mr-3"><item.icon /></span>
                                            <span className="truncate">{item.name}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                        
                        {/* Back to Dashboard button at the bottom of sidebar */}
                        {currentTab !== 'dashboard' && (
                            <div className="p-4 border-t border-blue-800">
                                <button
                                    className="flex items-center w-full p-2 bg-blue-00 hover:bg-blue-800 text-white rounded-md transition-100"
                                    onClick={() => handleNavClick('dashboard')}
                                >
                                    <span className="">
                                    ⬅ <span className="ml-2">Back to Dashboard</span>
                                    </span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Transparent overlay for closing sidebar on mobile */}
                {sidebarOpen && (
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-25 z-20 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    ></div>
                )}

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-gray-50">

                    <div className="p-1">
                        {/* Content for different tabs */}
                        {currentTab === 'enquiry' && <Enquirymain />}
                        {currentTab === 'registration' && <NewRegistrationMainPage />}
                        {currentTab === 'student' && <StudentMainPage />}
                        {currentTab === 'bonafide' && <BonafideMainPage />}
                        {currentTab === 'communication' && <Communication />}
                        {currentTab === 'fees' && <FeesMainPage />}

                        {/* Enhanced Dashboard content from paste.txt */}
                        {currentTab === 'dashboard' && (
                            <>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 min-h-28">

{/* Total Students */}
<div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-500 hover:shadow-xl transition-shadow duration-100" onClick={() => handleNavClick('student')}>
  <div className="flex items-center">
    <div className="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">
    <Icons.Student />
      {/* <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-5-4M9 20h6M4 20h5v-2a4 4 0 00-5-4M16 7a4 4 0 01-8 0 4 4 0 018 0z" />
      </svg> */}
    </div>
    <div>
      <p className="text-gray-700 text-lg font-semibold mb-1">Total Students</p>
      <p className="text-2xl font-semibold text-gray-800 mb-2">{stats.totalStudents}</p>
    </div>
  </div>
</div>

{/* Fee Collection */}
<div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-500 hover:shadow-xl transition-shadow duration-100" onClick={() => handleNavClick('fees')}>
  <div className="flex items-center">
    <div className="p-3 rounded-full bg-green-100 text-green-500 mr-4">
    <IndianRupee className="text-green-500" />
      {/* <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
  <path d="M6 3h12v2H6v2h12v2H6v2h8a4 4 0 0 1-4 4h-4v2h4a6 6 0 0 0 6-6H6z"/>
</svg> */}

    </div>
    <div>
      <p className="text-gray-700 text-lg font-semibold mb-1">Fee Collection</p>
      <p className="text-2xl font-semibold text-gray-800 mb-2">
        ₹{stats.totalFeeCollection.toLocaleString()}
      </p>
    </div>
  </div>
</div>

{/* Enquiries */}
<div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-yellow-500 hover:shadow-xl transition-shadow duration-100"  onClick={() => handleNavClick('enquiry')}>
  <div className="flex items-center">
    <div className="p-3 rounded-full bg-yellow-100 text-yellow-500 mr-4">
      {/* Phone/Enquiry Icon */}
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
  <path d="M2 3v18l4-4h14a2 2 0 0 0 2-2V3H2zm11 10h-2v-2h2v2zm0-4h-2V7h2v2z"/>
</svg>

    </div>
    <div>
      <p className="text-gray-700 text-lg font-semibold mb-1">Enquiries</p>
      <p className="text-2xl font-semibold text-gray-800 mb-2">{stats.totalEnquiries}</p>
    </div>
  </div>
</div>

{/* Certificates Generated */}
<div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-purple-500 hover:shadow-xl transition-shadow duration-100" onClick={() => handleNavClick('bonafide')}>
  <div className="flex items-center">
    <div className="p-3 rounded-full bg-purple-100 text-purple-500 mr-4">
      {/* Award/Certificate Icon */}
      <ScrollText className="text-purple-500 w-6 h-6" />

    </div>
    <div>
      <p className="text-gray-700 text-lg font-semibold mb-1">Certificates Generated</p>
      <p className="text-2xl font-semibold text-gray-800 mb-2">{stats.certificatesGenerated}</p>
    </div>
  </div>
</div>

</div>
{/* <Calendar/> */}
                          {/* Recent Activities & Charts */}
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-xl font-semibold text-gray-800">Recent Activities</h3>
                                            <button className="text-blue-600 hover:text-blue-800">View All</button>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                                <div className="mr-4 bg-green-500 text-white rounded-full p-2">
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm8-5a1 1 0 00-1 1v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6a1 1 0 00-1-1z"></path>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="font-medium">New student registration</p>
                                                    <p className="text-sm text-gray-500">2 minutes ago</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                                <div className="mr-4 bg-blue-500 text-white rounded-full p-2">
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="font-medium">Fee payment received</p>
                                                    <p className="text-sm text-gray-500">5 minutes ago</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                                <div className="mr-4 bg-purple-500 text-white rounded-full p-2">
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"></path>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="font-medium">Certificate generated</p>
                                                    <p className="text-sm text-gray-500">1 hour ago</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                                <div className="mr-4 bg-yellow-500 text-white rounded-full p-2">
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="font-medium">Fee defaulter notification sent</p>
                                                    <p className="text-sm text-gray-500">2 hours ago</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-lg shadow-md p-6">
                                        
                                        <CircularCalendar/>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardHome;