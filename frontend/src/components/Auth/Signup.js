import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [role, setRole] = useState('seeker');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, contact_no: contactNo, role }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('username', data.username);
        alert('Signup successful!');
        navigate('/login');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('Failed to connect to the server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="input input-bordered w-full px-4 py-2 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input input-bordered w-full px-4 py-2 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input input-bordered w-full px-4 py-2 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
          />

          {/* Contact Number */}
          <input
            type="text"
            placeholder="Contact Number"
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
            required
            className="input input-bordered w-full px-4 py-2 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
          />

          {/* Role Selection */}
          <div className="flex justify-between items-center">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="seeker"
                checked={role === 'seeker'}
                onChange={(e) => setRole(e.target.value)}
                className="accent-indigo-600"
              />
              <span className="text-gray-700">Seeker</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="helper"
                checked={role === 'helper'}
                onChange={(e) => setRole(e.target.value)}
                className="accent-indigo-600"
              />
              <span className="text-gray-700">Helper</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn bg-indigo-600 text-white w-full py-3 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition-transform transform hover:scale-105"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
