import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Feature = ({ title, description, icon }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-md"
        >
            <div className="text-4xl mb-4 text-purple-600">{icon}</div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </motion.div>
    );
};

const Features = () => {
    return (
        <section id="features" className="py-20 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12">Why Choose Academia?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Feature
                        title="Join Study Groups"
                        description="Connect with peers and form study groups to collaborate and learn together."
                        icon="👥"
                    />
                    <Feature
                        title="Expert Tutors"
                        description="Get help from qualified tutors in various subjects to improve your understanding."
                        icon="👨‍🏫"
                    />
                    <Feature
                        title="Interactive Learning"
                        description="Engage with interactive content and quizzes to reinforce your knowledge."
                        icon="🖥️"
                    />
                </div>
            </div>
        </section>
    );
};

export default Features;

