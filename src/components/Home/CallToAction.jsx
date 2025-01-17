import { motion } from 'framer-motion';

const CallToAction = () => {
    return (
        <section className="py-20 text-white bg-purple-600">
            <div className="container px-4 mx-auto text-center">
                <h2 className="mb-4 text-4xl font-bold">Ready to Excel in Your Studies?</h2>
                <p className="mb-8 text-xl">Join Academia today and unlock your full potential!</p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 text-lg font-bold text-purple-600 transition duration-300 bg-white rounded-full hover:bg-purple-100"
                >
                    Get Started Now
                </motion.button>
            </div>
        </section>
    );
};

export default CallToAction;

