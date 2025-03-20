import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Brand Name */}
        <h2 className="text-2xl font-bold tracking-wide text-yellow-400">TaskConnect</h2>
        <p className="mt-2 text-gray-300">Bridging the gap between Seekers and Helpers</p>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-6 mt-4">
          <a href="https://mail.google.com/" target="_blank" rel="noopener noreferrer" className="text-xl text-yellow-400 hover:text-yellow-500 transition">
            <i className="fa-solid fa-envelope"></i>
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-xl text-yellow-400 hover:text-yellow-500 transition">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-xl text-yellow-400 hover:text-yellow-500 transition">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-xl text-yellow-400 hover:text-yellow-500 transition">
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </div>

        {/* Copyright Text */}
        <p className="mt-6 text-sm text-gray-400">© 2025 TaskConnect. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
