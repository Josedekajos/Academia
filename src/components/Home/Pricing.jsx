import React from 'react';
import { motion } from 'framer-motion';

const PricingTier = ({ title, price, features, recommended }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className={`bg-white p-8 rounded-lg shadow-md ${recommended ? 'border-4 border-purple-500' : ''}`}
        >
            <h3 className="text-2xl font-bold mb-4">{title}</h3>
            <p className="text-4xl font-bold mb-6">{price} <span className="text-sm font-normal">FCFA/month</span></p>
            <ul className="mb-8">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center mb-2">
                        <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                    </li>
                ))}
            </ul>
            <button className={`w-full py-2 px-4 rounded-full font-bold ${recommended ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-600'} hover:bg-purple-500 hover:text-white transition duration-300`}>
                Choose Plan
            </button>
        </motion.div>
    );
};

const Pricing = () => {
    return (
        <section id="pricing" className="py-20 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12">Choose Your Plan</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <PricingTier
                        title="Free"
                        price="0"
                        features={[
                            "Access to study groups",
                            "Basic learning materials",
                            "Limited quizzes"
                        ]}
                    />
                    <PricingTier
                        title="Standard"
                        price="5,000"
                        features={[
                            "All Free features",
                            "Unlimited quizzes",
                            "Access to expert tutors",
                            "Advanced study materials"
                        ]}
                        recommended
                    />
                    <PricingTier
                        title="Premium"
                        price="10,000"
                        features={[
                            "All Standard features",
                            "1-on-1 tutoring sessions",
                            "Personalized study plans",
                            "Priority support"
                        ]}
                    />
                </div>
            </div>
        </section>
    );
};

export default Pricing;

