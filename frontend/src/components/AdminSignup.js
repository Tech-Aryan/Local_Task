import React, { useState } from 'react';
import { signupAdmin } from '../api';

const AdminSignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    try {
      const adminData = { name, email, password };
      const response = await signupAdmin(adminData);
      setSuccessMessage(response.data.message);
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div>
      <h2>Admin Signup</h2>
      {error && <div className="error">{error}</div>}
      {successMessage && <div className="success">{successMessage}</div>}
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Admin Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default AdminSignup;
