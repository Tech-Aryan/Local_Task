import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const adminToken = localStorage.getItem('adminToken');
    setIsAuthenticated(!!token);
    setIsAdmin(!!adminToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setIsAdmin(false);
    navigate('/');
    window.location.reload();
  };

  const categories = [
    'All', 'Technology', 'Marketing', 'design', 'writing',
    'Mechanic', 'Electrician', 'Plumber', 'Photography',
  ];

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    if (location.pathname === '/tasks') {
      navigate(`/tasks?category=${event.target.value}`);
    }
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-800 tracking-wide">
          Task<span className="text-blue-500">Platform</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {location.pathname === '/tasks' && (
            <select
              className="select select-bordered"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          )}

          {!isAuthenticated && !isAdmin ? (
            <>
              <Link to="/login" className="px-5 py-2 text-black font-semibold bg-yellow-400 hover:bg-yellow-500 rounded-lg shadow-md transition-all">
                Login
              </Link>
              <Link to="/signup" className="px-5 py-2 text-black font-semibold bg-orange-400 hover:bg-orange-500 rounded-lg shadow-md transition-all">
                Signup
              </Link>
              <Link to="/admin/login" className="px-5 py-2 text-black font-semibold bg-white border border-gray-300 hover:bg-gray-100 rounded-lg shadow-md transition-all">
                Admin Login
              </Link>
            </>
          ) : isAdmin ? (
            <>
              <Link to="/dashboard/admin" className="px-5 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all">
                Admin Dashboard
              </Link>
              <button onClick={handleLogout} className="px-5 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all">
                Logout
              </button>
            </>
          ) : (
            <button onClick={handleLogout} className="px-5 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all">
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-800 text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col bg-white shadow-lg px-6 py-4 space-y-3">
          {location.pathname === '/tasks' && (
            <select
              className="select select-bordered w-full"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          )}

          {!isAuthenticated && !isAdmin ? (
            <>
              <Link to="/login" className="w-full text-center py-2 bg-yellow-400 rounded-md shadow-md hover:bg-yellow-500 transition-all">
                Login
              </Link>
              <Link to="/signup" className="w-full text-center py-2 bg-orange-400 rounded-md shadow-md hover:bg-orange-500 transition-all">
                Signup
              </Link>
              <Link to="/admin/login" className="w-full text-center py-2 bg-white border border-gray-300 rounded-md shadow-md hover:bg-gray-100 transition-all">
                Admin Login
              </Link>
            </>
          ) : isAdmin ? (
            <>
              <Link to="/dashboard/admin" className="w-full text-center py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-all">
                Admin Dashboard
              </Link>
              <button onClick={handleLogout} className="w-full py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition-all">
                Logout
              </button>
            </>
          ) : (
            <button onClick={handleLogout} className="w-full py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition-all">
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;