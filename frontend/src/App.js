import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainPage from './components/MainPage';
import PostTask from './components/Seekers/PostTask';
import BrowseTasks from './components/Helpers/BrowseTasks';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import PrivateRoute from './components/Auth/PrivateRoute';
import SeekerDashboard from './components/SeekerDashboard';
import HelperDashboard from './components/HelperDashboard';
import AdminSignup from './components/AdminSignup'; // Admin signup route
import AdminLogin from './components/AdminLogin'; // Admin login route
import AdminDashboard from './components/AdminDashboard'; // Admin dashboard route

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="pt-16">
      <Routes>
        <Route path="/" element={<MainPage />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/post-task" element={<PrivateRoute><PostTask /></PrivateRoute>} />
        <Route path="/tasks" element={<PrivateRoute><BrowseTasks /></PrivateRoute>} />
        
        {/* Dashboards for seekers, helpers, and admins */}
        <Route path="/dashboard/seeker" element={<PrivateRoute><SeekerDashboard /></PrivateRoute>} />
        <Route path="/dashboard/helper" element={<PrivateRoute><HelperDashboard /></PrivateRoute>} />
        
        {/* Admin routes for login, signup, and dashboard */}
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/dashboard/admin" element={<PrivateRoute isAdmin={true}><AdminDashboard /></PrivateRoute>} />  {/* Admin dashboard */}
      </Routes>
      </div>
    </Router>
  );
};

export default App;
