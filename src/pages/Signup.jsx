import { useState } from 'react';
import { motion } from 'framer-motion';
import FormInput from '../components/FormInput';
import axiosClient from "../axios.js";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const Signup = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        level: '',
        goals: '',
    });
    const [errors, setErrors] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        level: '',
        goals: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newErrors = { first_name: '', last_name: '', email: '', phone: '', password: '', level: '', goals: '' };
        let isValid = true;

        if (!formData.first_name) {
            newErrors.first_name = 'First name is required';
            isValid = false;
        }

        if (!formData.last_name) {
            newErrors.last_name = 'Last name is required';
            isValid = false;
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
            isValid = false;
        }

        if (!formData.phone) {
            newErrors.phone = 'Phone number is required';
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long';
            isValid = false;
        }

        if (!formData.level) {
            newErrors.level = 'Level is required';
            isValid = false;
        }

        if (!formData.goals) {
            newErrors.goals = 'Goals are required';
            isValid = false;
        }

        setErrors(newErrors);

        await handleSignup(formData);
    };

    const handleSignup = async (formData) => {
        try {
            const response = await axiosClient.post('/auth/signup', formData);
            console.log('Signup successful:', response.data);
            const { token, user } = response.data;

            // Store the token and user information in local storage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            // Display a success toast message
            toast.success('Signup successful! Welcome to Academia!');

            // Redirect the user to the dashboard page
            navigate('/dasboard');
        } catch (error) {
            if (error.response) {
                console.error('Error signing up:', error.response.data.message);
                toast.error(`Error signing up: ${error.response.data.message}`);
            } else {
                console.error('Error:', error.message);
                toast.error(`Netowrk Error: ${error.message}`);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg"
            >
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your Academia account</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <FormInput
                        label="First Name"
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        error={errors.first_name}
                    />
                    <FormInput
                        label="Last Name"
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        error={errors.last_name}
                    />
                    <FormInput
                        label="Email Address"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                    />
                    <FormInput
                        label="Phone Number"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        error={errors.phone}
                    />
                    <FormInput
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                    />
                    <FormInput
                        label="Level"
                        type="text"
                        name="level"
                        value={formData.level}
                        onChange={handleChange}
                        error={errors.level}
                    />
                    <FormInput
                        label="Goals"
                        type="text"
                        name="goals"
                        value={formData.goals}
                        onChange={handleChange}
                        error={errors.goals}
                    />
                    <div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                            Sign up
                        </motion.button>
                    </div>
                </form>
                <div className="text-center">
                    <a href="/login" className="font-medium text-purple-600 hover:text-purple-500">
                        Already have an account? Sign in
                    </a>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;