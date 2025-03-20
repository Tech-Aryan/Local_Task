import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white min-h-screen flex flex-col justify-center items-center px-6 text-center">
        <h1 className="text-6xl font-extrabold mb-6 animate__animated animate__fadeIn">
          Discover & Offer Tasks Effortlessly
        </h1>
        <p className="text-lg max-w-3xl mb-8 animate__animated animate__fadeIn animate__delay-1s">
          Find the perfect helper for your tasks or start helping others today. Join our growing community now!
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex space-x-6">
          <button
            onClick={() => navigate('/post-task')}
            className="px-8 py-3 text-lg font-semibold bg-yellow-400 text-black rounded-full shadow-lg hover:shadow-xl hover:bg-yellow-500 transition-all transform hover:scale-105"
          >
            I Need Help
          </button>
          <button
            onClick={() => navigate('/tasks')}
            className="px-8 py-3 text-lg font-semibold bg-white text-blue-600 rounded-full shadow-lg hover:shadow-xl hover:bg-gray-100 transition-all transform hover:scale-105"
          >
            I Want to Help
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MainPage;
