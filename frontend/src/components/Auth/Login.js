import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('seeker'); // Default role
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        alert('Login successful!');
        
        // Redirect based on the role
        if (role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }
      } else {
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Failed to connect to the server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input input-bordered w-full px-4 py-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
            autoComplete="username"
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input input-bordered w-full px-4 py-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
            autoComplete="current-password"
          />

          {/* Role Selection */}
          <div className="flex justify-between items-center">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="seeker"
                checked={role === 'seeker'}
                onChange={(e) => setRole(e.target.value)}
                className="accent-blue-600"
              />
              <span className="text-gray-700">Seeker</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="helper"
                checked={role === 'helper'}
                onChange={(e) => setRole(e.target.value)}
                className="accent-blue-600"
              />
              <span className="text-gray-700">Helper</span>
            </label>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="btn bg-blue-600 text-white w-full py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
