import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-2xl font-bold mb-4">Academia</h3>
                        <p className="text-sm">Empowering students to achieve academic excellence through collaborative learning and expert guidance.</p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="#features" className="hover:text-purple-300">Features</a></li>
                            <li><a href="#testimonials" className="hover:text-purple-300">Testimonials</a></li>
                            <li><a href="#pricing" className="hover:text-purple-300">Pricing</a></li>
                            <li><a href="#contact" className="hover:text-purple-300">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-2">Resources</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-purple-300">Blog</a></li>
                            <li><a href="#" className="hover:text-purple-300">Help Center</a></li>
                            <li><a href="#" className="hover:text-purple-300">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-purple-300">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-2">Connect With Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-purple-300">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                                </svg>
                            </a>
                            <a href="#" className="hover:text-purple-300">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                </svg>
                            </a>
                            <a href="#" className="hover:text-purple-300">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-700 text-center">
                    <p className="text-sm">&copy; {new Date().getFullYear()} Academia. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

