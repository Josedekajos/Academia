import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Testimonial = ({ name, role, content, image }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="p-6 bg-white rounded-lg shadow-md"
        >
            <div className="flex items-center mb-4">
                <img src={image} alt={name} className="w-12 h-12 mr-4 rounded-full" />
                <div>
                    <h4 className="font-semibold">{name}</h4>
                    <p className="text-sm text-gray-600">{role}</p>
                </div>
            </div>
            <p className="text-gray-700">{content}</p>
        </motion.div>
    );
};

const Testimonials = () => {
    return (
        <section id="testimonials" className="py-20 bg-purple-100">
            <div className="container px-4 mx-auto">
                <h2 className="mb-12 text-4xl font-bold text-center">What Our Users Say</h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <Testimonial
                        name="Sarah Johnson"
                        role="Student"
                        content="Academia has been a game-changer for my studies. The study groups and expert tutors have helped me improve my grades significantly."
                        image="/placeholder.svg?height=100&width=100"
                    />
                    <Testimonial
                        name="Dr. Michael Brown"
                        role="Professor"
                        content="I recommend Academia to all my students. It's an excellent platform for collaborative learning and academic growth."
                        image="/placeholder.svg?height=100&width=100"
                    />
                    <Testimonial
                        name="Emily Chen"
                        role="High School Student"
                        content="Thanks to Academia, I feel more confident in my studies. The interactive quizzes and study materials are incredibly helpful."
                        image="/placeholder.svg?height=100&width=100"
                    />
                </div>
            </div>
        </section>
    );
};



export default Testimonials;