import React from 'react';
import { motion } from 'framer-motion';

const CallToAction = () => {
    return (
        <section className="py-20 bg-purple-600 text-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-4">Ready to Excel in Your Studies?</h2>
                <p className="text-xl mb-8">Join Academia today and unlock your full potential!</p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-purple-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-purple-100 transition duration-300"
                >
                    Get Started Now
                </motion.button>
            </div>
        </section>
    );
};

export default CallToAction;

