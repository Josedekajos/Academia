import { useState } from 'react';
import { motion } from 'framer-motion';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="bg-white shadow-md">
            <nav className="container px-6 py-3 mx-auto">
                <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-purple-600">Academia</div>
                    <div className="hidden space-x-4 md:flex">
                        <a href="#features" className="text-gray-800 hover:text-purple-600">Features</a>
                        <a href="#testimonials" className="text-gray-800 hover:text-purple-600">Testimonials</a>
                        <a href="#pricing" className="text-gray-800 hover:text-purple-600">Pricing</a>
                        <a href="#contact" className="text-gray-800 hover:text-purple-600">Contact</a>
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white shadow-md md:hidden"
                >
                    <a href="#features" className="block px-4 py-2 text-gray-800 hover:bg-purple-100">Features</a>
                    <a href="#testimonials" className="block px-4 py-2 text-gray-800 hover:bg-purple-100">Testimonials</a>
                    <a href="#pricing" className="block px-4 py-2 text-gray-800 hover:bg-purple-100">Pricing</a>
                    <a href="#contact" className="block px-4 py-2 text-gray-800 hover:bg-purple-100">Contact</a>
                </motion.div>
            )}
        </header>
    );
};

export default Header;

