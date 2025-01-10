import { useState} from 'react';
import axiosClient from "../axios.js";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
    
  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await axiosClient.post('auth/login', { email, password });
          console.log(response);
      } catch (err) {
          setError(err.response?.data?.message || 'An error occurred');
      }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="w-full max-w-sm mt-6">
        {error && <p className="mb-4 text-red-600">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
      <div className="mt-4">
        <a href="/forgot-password" className="text-blue-600 hover:underline">Forgot Password?</a>
      </div>
      <div className="mt-2">
        <a href="/signup" className="text-blue-600 hover:underline">Don&apos;t have an account? Sign Up</a>
      </div>
    </div>
  );
};

export default Login;
