import {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {motion} from 'framer-motion';
import {Home, Info, LogOut, MessageCircle, Users} from 'lucide-react';

const NavHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const logOut = () => {
        localStorage.clear();
        navigate('/');
    };

    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: Home },
        { path: '/about', label: 'About', icon: Info },
        { path: '/groups', label: 'Groups', icon: Users },
        { path: '/chat', label: 'Chat', icon: MessageCircle }, // Added Chat item
    ];

    return (
        <nav className="bg-slate-800/95 backdrop-blur-lg border-b border-slate-700 fixed w-full top-0 z-50">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Brand */}
                    <Link
                        to="/"
                        className="text-2xl font-bold text-slate-100 hover:text-slate-200 transition duration-300"
                    >
                        Academia
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-4">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center px-4 py-2 transition duration-300 ${
                                        isActive
                                            ? 'bg-slate-700 text-slate-100'
                                            : 'text-slate-300 hover:text-slate-100'
                                    } rounded-full`}
                                >
                                    <Icon className="w-4 h-4 mr-2" />
                                    {item.label}
                                </Link>
                            );
                        })}

                    </div>

                    {/* User Profile */}
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center mr-2">
                                <span className="text-slate-100">
                                    {user?.avatar || (user?.first_name?.[0] || 'K')}
                                </span>
                            </div>
                            <span className="text-slate-100 font-medium">
                                {user ? `${user.first_name} ${user.last_name}` : "Kelsea"}
                            </span>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={logOut}
                            className="flex items-center px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Log out
                        </motion.button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavHeader;