import  { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {useNavigate} from "react-router-dom";

const Hero = () => {
    const [currentText, setCurrentText] = useState(0);
    const [currentBackground, setCurrentBackground] = useState(0);
    const texts = [
        "Boost Your Grades",
        "Collaborate with Peers",
        "Learn from Experts",
        "Achieve Your Goals"
    ];
    const backgrounds = [
        "bg-gradient-to-r from-purple-500 to-blue-500",
        "bg-gradient-to-r from-blue-500 to-purple-500",
        "bg-gradient-to-r from-indigo-500 to-purple-500",
        "bg-gradient-to-r from-purple-500 to-indigo-500"
    ];
    const navigate = useNavigate();

    useEffect(() => {
        const textInterval = setInterval(() => {
            setCurrentText((prevText) => (prevText + 1) % texts.length);
        }, 3000);

        const backgroundInterval = setInterval(() => {
            setCurrentBackground((prevBg) => (prevBg + 1) % backgrounds.length);
        }, 4000);

        return () => {
            clearInterval(textInterval);
            clearInterval(backgroundInterval);
        };
    }, []);

    return (
        <div className={`min-h-screen flex items-center justify-center ${backgrounds[currentBackground]} transition-all duration-1000`}>
            <div className="text-center">
                <motion.h1
                    key={currentText}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-5xl md:text-6xl font-bold text-white mb-4"
                >
                    {texts[currentText]}
                </motion.h1>
                <p className="text-xl text-white mb-8">Join Academia and unlock your full potential</p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-purple-600 font-bold py-2 px-4 rounded-full hover:bg-purple-100 transition duration-300"
                    onClick={() => navigate('/login')}
                >
                    Get Started
                </motion.button>
            </div>
        </div>
    );
};

export default Hero;

