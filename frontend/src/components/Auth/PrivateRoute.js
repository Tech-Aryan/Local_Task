import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, isAdmin }) => {
  const token = localStorage.getItem('token');
  const adminToken = localStorage.getItem('adminToken');

  // If the route requires admin access
  if (isAdmin) {
    if (!adminToken) {
      // If the admin token is not found, redirect to the admin login page
      return <Navigate to="/admin/login" />;
    }
    // If admin token is valid, render the children (admin page)
    return children;
  }

  // For general users, check for a regular user token
  if (!token) {
    // If the user token is not found, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If the user token is valid, render the children (protected page)
  return children;
};

export default PrivateRoute;
