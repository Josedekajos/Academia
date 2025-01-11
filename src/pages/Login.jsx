import {useEffect, useState} from 'react';
import { motion } from 'framer-motion';
import FormInput from '../components/FormInput';
import { toast } from 'react-toastify';
import axiosClient from "../axios.js";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            window.location.href = '/dashboard';
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newErrors = { email: '', password: '' };
        let isValid = true;

        if (!formData.email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        }

        setErrors(newErrors);

        if (isValid) {
            try {
                const response = await axiosClient.post('auth/login', {
                    email: formData.email,
                    password: formData.password
                });

                const { token, user } = response.data;

                // Store the token and user information in local storage
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));

                toast.success('Login successful!'); // Show success toast

                navigate('/dashboard');
            } catch (err) {
                const errorMessage = err.response?.data?.message || 'An error occurred';
                setErrors({ email: errorMessage, password: errorMessage }); // Set error state
                toast.error(errorMessage); // Show error toast
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
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to Academia</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <FormInput
                        label="Email Address"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                    />
                    <FormInput
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                    />
                    <div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                            Sign in
                        </motion.button>
                    </div>
                </form>
                <div className="text-center">
                    <a href="/signup" className="font-medium text-purple-600 hover:text-purple-500">
                        Don&#39;t have an account? Sign up
                    </a>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;