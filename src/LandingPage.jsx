import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Users, BookOpen, Calendar, MessageSquare, BarChart3, FileText, CreditCard, GraduationCap, BarChart, DollarSign, CheckSquare, ClipboardCheck, Mail, Phone, Github as GitHub, ArrowRight } from 'lucide-react';
import gyanamlogo from './assets/schlogo.png'
import './index.css';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const handleSignIn = () => {
        navigate('/login');
    };
    const handleSignUp = () => {
        navigate('/register');
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMenuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.menu-button')) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isMenuOpen]);

    const heroImages = [
        "../Images/seminar1.jpg",
        "../Images/seminar2.jpg",
        "../Images/feildtrip1.jpeg",
        "../Images/fieldtrip2.jpeg",
        "../Images/fieldtrip3.jpeg",
        "../Images/ground2.jpeg",
        "../Images/ground1.jpg",
    ];

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const features = [
        {
            title: "Student Management",
            description: "Complete student information system with academic tracking",
            icon: <Users className="w-6 h-6" />,
            color: "from-blue-500/10 to-blue-500/20"
        },
        {
            title: "Curriculum Planning",
            description: "Streamlined curriculum and lesson planning tools",
            icon: <BookOpen className="w-6 h-6" />,
            color: "from-purple-500/10 to-purple-500/20"
        },
        {
            title: "Schedule Management",
            description: "Efficient timetable and calendar management",
            icon: <Calendar className="w-6 h-6" />,
            color: "from-green-500/10 to-green-500/20"
        },
        {
            title: "Communication",
            description: "Integrated messaging system for staff and parents",
            icon: <MessageSquare className="w-6 h-6" />,
            color: "from-yellow-500/10 to-yellow-500/20"
        },
        {
            title: "Assessment & Grading",
            description: "Comprehensive assessment creation and grading tools",
            icon: <ClipboardCheck className="w-6 h-6" />,
            color: "from-red-500/10 to-red-500/20"
        },
        {
            title: "Attendance Tracking",
            description: "Digital attendance management with automated reporting",
            icon: <CheckSquare className="w-6 h-6" />,
            color: "from-teal-500/10 to-teal-500/20"
        },
        {
            title: "Financial Management",
            description: "Fee collection and financial reporting system",
            icon: <DollarSign className="w-6 h-6" />,
            color: "from-emerald-500/10 to-emerald-500/20"
        },
        {
            title: "Performance Analytics",
            description: "Data-driven insights and visual reporting dashboards",
            icon: <BarChart className="w-6 h-6" />,
            color: "from-indigo-500/10 to-indigo-500/20"
        }

    ];

    const directors = [
        {
            name: "Dr. Syed Ali Luqman Hussaini, Ph. D.",
            role: "Chairman",
            image: "../Images/director1.jpeg",
            description: " 16 years of  experience in teaching at Undergraduate, Graduate and Post Graduate level in prestigious colleges in Hyderabad"
        },
        {
            name: "Mrs Hafsa Batool",
            role: "Admin incharge",
            image: "../Images/mam.png",
            description: "Expert in curriculum development and teaching methodologies Specialist in school administration and operations"
        },
        {
            name: "Dr Moramshetty Ravindra Prasad",
            role: " Science Subjet Expert",
            image: "../Images/sirs1.png",
            description: "Expert in curriculum development and teaching methodologies"
        }
    ];
     
    return (
        //   <div className="w-full min-h-screen max-w-none flex flex-col">
        <div className="w-full min-h-screen flex flex-col overflow-x-hidden">

 <header className="fixed w-screen top-0 left-0 right-0 bg-white z-50 shadow-md overflow-hidden">
    <div className="w-full px-2 sm:px-4 md:px-6">
        <div className="flex items-center justify-between py-1 sm:py-2">
            {/* Logo - made smaller on very small screens */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center"
            >
                <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-white-600 to-white-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
                    <div className="relative bg-white rounded-lg p-2">
                        <div className="flex items-center justify-start">
                            <img src={gyanamlogo} alt="gyanam the school" title="Learn more about us" className="max-w-[180px] xs:max-w-[200px] sm:max-w-[220px] md:max-w-[300px]" />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Desktop Navigation - hidden on all small screens */}
            <nav className="hidden lg:flex items-center space-x-18">
                {['Home', 'Features', 'Directors'].map((item, index) => (
                    <motion.a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative text-gray-700 hover:text-blue-700 transition-colors group"
                    >
                        {item}
                        <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                    </motion.a>
                ))}
            </nav>

            {/* Sign In / Sign Up Buttons - simplified for small screens */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="flex space-x-2 sm:space-x-4"
            >
                {/* Sign In Button */}
                <button 
                    onClick={handleSignIn} 
                    className="group relative px-2 py-1 sm:px-4 sm:py-2 md:px-6 md:py-3 bg-gradient-to-r from-white-600 to-blue-300 text-black rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-xs sm:text-sm md:text-base"
                >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-green-500 transition-transform duration-300 transform translate-x-full group-hover:translate-x-0"></div>
                    <span className="relative flex items-center justify-center">
                        Sign In
                        <ArrowRight className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                    </span>
                </button>

                {/* Sign Up Button - always visible */}
                <button 
                    onClick={handleSignUp} 
                    className="group relative px-2 py-1 sm:px-4 sm:py-2 md:px-6 md:py-3 bg-gradient-to-r from-white-600 to-blue-300 text-black rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-xs sm:text-sm md:text-base"
                >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-green-500 transition-transform duration-300 transform translate-x-full group-hover:translate-x-0"></div>
                    <span className="relative flex items-center justify-center">
                        Sign Up
                        <ArrowRight className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                    </span>
                </button>
            </motion.div>
        </div>
    </div>
</header>


            {/* Enhanced Hero Section */}
            <section id="home" className="w-full min-h-screen pt-32 pb-20 relative overflow-hidden">

                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-transparent to-green-400/10"></div>
                <motion.div
                    className="absolute -z-10 top-1/4 left-1/4 w-96 h-96 bg-primary-500/30 rounded-full filter blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.2, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                    }}
                />
                <motion.div
                    className="absolute -z-10 bottom-1/4 right-1/4 w-96 h-96 bg-green-500/30 rounded-full filter blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.2, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        delay: 4,
                    }}
                />

                <div className=" mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                                Empowering Education with
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">
                                    {" "}GYANAM{" "}
                                </span>
                                School
                            </h1>
                            <p className="text-2xl text-justify text-gray-700 mb-10">
                                Welcome to <strong>our school</strong> with Islamic values, where we strive to provide a holistic education that incorporates both academic excellence and the teachings of Islam.
                                Streamline administration, enhance communication, and improve learning outcomes with our comprehensive school management system.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <button onClick={handleSignUp} className="group relative px-8 py-4 ml-6 bg-gradient-to-r from-white-600 to-blue-300 text-black rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-green-500 transition-transform duration-300 transform translate-x-full group-hover:translate-x-0"></div>
                                    <span className="relative flex items-center justify-center">
                                        Sign Up
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </span>
                                </button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="relative rounded-4xl overflow-hidden shadow-2xl ">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={currentImageIndex}
                                        src={heroImages[currentImageIndex]}
                                        alt="School Management"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="w-full h-[650px] object-cover"
                                    />
                                </AnimatePresence>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="w-full py-20">

                <div className=" mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Comprehensive Management Tools
                        </h2>
                        <p className="text-xl text-gray-600 font-semibold">
                            Everything you need to run your educational institution efficiently
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`bg-gradient-to-br ${feature.color} p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-rotate-1`}
                            >
                                <div className="text-primary-600 mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Directors Section */}
            <section id="directors" className="w-full py-20 bg-gradient-to-br from-primary-50 to-white">

                <div className=" mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-2">Our Directors</h2>
                        <p className="text-xl text-gray-600 font-semibold">
                            Meet the visionaries leading our institution
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {directors.map((director, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={director.image}
                                        alt={director.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                                        <div className="text-white">
                                            <h3 className="text-xl font-semibold">{director.name}</h3>
                                            <p className="text-primary-200">{director.role}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <p className="text-gray-600">{director.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Us Section */}
            <section id="about-us" className="w-full py-20 bg-gradient-to-br from-primary-50 to-white">

                <div className=" mx-auto px-4 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center w-full mb-16"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-2">About Us</h2>
                        <p className="text-2xl text-gray-600 font-semibold">
                            Fostering Islamic values and academic excellence
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-2xl shadow-lg p-8 w-full"
                    >
                        <p className="text-gray-600 text-xl text-justify font-serif mb-4">
                            At our school, we emphasize the importance of Islamic values and ethics. We aim to instill a deep understanding and appreciation of Islamic teachings, morals, and ethics in our students. We believe that Islamic values such as honesty, integrity, kindness, and respect are essential in developing well-rounded individuals who are compassionate, empathetic, and responsible members of society.
                        </p>

                        <p className="text-gray-600 text-xl text-justify font-serif mb-4">
                            Our curriculum is designed to integrate Islamic values into all aspects of learning. We offer a well-rounded education that includes Quranic studies, Islamic history, and Arabic language courses. We also integrate Islamic values and morals into other academic subjects such as science, math, and social studies.
                        </p>

                        <p className="text-gray-600 text-xl text-justify font-serif mb-4">
                            Our experienced and qualified teachers are dedicated to providing a quality education that challenges students to think critically, ask questions, and explore new ideas. We encourage our students to develop a love for learning, a passion for discovery, and a commitment to excellence.
                        </p>

                        <p className="text-gray-600 text-xl text-justify font-serif mb-4">
                            In addition to academic and Islamic studies, we offer a range of extracurricular activities that promote physical fitness, social skills, and leadership development. Our students have the opportunity to participate in sports, arts, and community service projects.
                        </p>

                        <p className="text-gray-600 text-xl text-justify font-serif mb-4">
                            We welcome students from all backgrounds and cultures, and we strive to create a diverse and inclusive community that celebrates differences and promotes understanding. We believe that by providing a quality education that is grounded in Islamic values, we can help shape the next generation of leaders who will make a positive impact in the world.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Footer with Developer Section */}
            <footer className="w-full bg-gray-300 text-black-600 pt-10 mt-auto">
                <div className="w-full px-4">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <div className="flex justify-start relative top-0 left-0">
                                <img src={gyanamlogo} alt="Gyanam Logo" className="h-20 w-auto" />
                            </div>
                            <p className="text-xl text-justify text-white-300 max-w-md mt-2 py-1">
                                Beginning in the classroom will be an exposure to great ideas, right ways of understanding,
                                and new ways of knowing, leads students to embark on a journey of intellectual transformation.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-lg font-bold mb-4">Quick Links</h4>
                                <ul className="space-y-4">
                                    <li><a href="#home" className="text-white-300 text-md hover:text-white transition-colors">Home</a></li>
                                    <li><a href="#features" className="text-white-300 text-md hover:text-white transition-colors">Features</a></li>
                                    <li><a href="#directors" className="text-white-300 text-md hover:text-white transition-colors">Directors</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-xl font-bold mb-4">Contact</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-center text-white-300">
                                        <Mail className="w-4 h-4 mr-2" />
                                        gyanamhyd@gmail.com
                                    </li>
                                    <li className="flex items-center text-white-300">
                                        <Phone className="w-4 h-4 mr-2" />
                                        (+91) 86864 63718
                                    </li>
                                    <li className="flex items-center text-white-300">
                                        <Phone className="w-4 h-4 mr-2" />
                                        +91 80085 53468
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="text-center text-gray-200 pt-8 border-gray-800">
                        <p>© {new Date().getFullYear()} Gyanam School. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};


export default LandingPage;
