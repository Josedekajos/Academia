import {motion} from 'framer-motion';

const About = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 py-16 px-4">
            <motion.div
                className="max-w-6xl mx-auto text-slate-100"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Introduction */}
                <motion.div variants={itemVariants} className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">Welcome to Academia</h1>
                    <p className="text-xl text-slate-300">The ultimate virtual study space where students connect, collaborate, and learn together.</p>
                </motion.div>

                {/* Mission Statement */}
                <motion.div variants={itemVariants} className="bg-slate-700/30 backdrop-blur-lg rounded-xl p-8 mb-12 shadow-xl">
                    <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                    <p className="text-lg text-slate-300">To create a supportive online environment where students can share knowledge, improve academic performance, and build a strong learning community.</p>
                </motion.div>

                {/* Key Features */}
                <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-8 mb-12">
                    {[
                        { title: "Virtual Study Rooms", icon: "🎯" },
                        { title: "Group Collaboration", icon: "👥" },
                        { title: "Peer Tutoring", icon: "📚" },
                        { title: "AI Study Assistant", icon: "🤖" },
                        { title: "Discussion Forums", icon: "💭" },
                        { title: "Resource Sharing", icon: "📱" }
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            className="bg-slate-700/30 backdrop-blur-lg rounded-xl p-6 text-center hover:bg-slate-600/30 transition-all duration-300 shadow-xl"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-bold text-slate-100">{feature.title}</h3>
                        </motion.div>
                    ))}
                </motion.div>

                {/* How It Works */}
                <motion.div variants={itemVariants} className="bg-slate-700/30 backdrop-blur-lg rounded-xl p-8 mb-12 shadow-xl">
                    <h2 className="text-3xl font-bold mb-6">How It Works</h2>
                    <div className="grid md:grid-cols-4 gap-4">
                        {[
                            "Sign Up", "Create Profile", "Join Groups", "Start Learning"
                        ].map((step, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl font-bold mb-2 text-slate-100">{index + 1}</div>
                                <div className="text-lg text-slate-300">{step}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Testimonials */}
                <motion.div variants={itemVariants} className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 text-center">Success Stories</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                name: "Sarah Johnson",
                                text: "Academia helped me improve my GPA from 3.2 to 3.8 in just one semester!",
                                role: "Computer Science Student"
                            },
                            {
                                name: "Mike Chen",
                                text: "The collaborative features made group projects so much easier to manage.",
                                role: "Engineering Student"
                            }
                        ].map((testimonial, index) => (
                            <motion.div
                                key={index}
                                className="bg-slate-700/30 backdrop-blur-lg rounded-xl p-6 shadow-xl"
                                whileHover={{ scale: 1.02 }}
                            >
                                <p className="text-lg mb-4 text-slate-300">"{testimonial.text}"</p>
                                <p className="font-bold text-slate-100">{testimonial.name}</p>
                                <p className="text-sm text-slate-400">{testimonial.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    variants={itemVariants}
                    className="text-center"
                >
                    <h2 className="text-3xl font-bold mb-6">Ready to Join?</h2>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-slate-100 text-slate-800 font-bold py-3 px-8 rounded-full hover:bg-slate-200 transition duration-300 shadow-lg"
                    >
                        Get Started Now
                    </motion.button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default About;