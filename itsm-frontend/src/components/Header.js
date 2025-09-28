import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ShieldLock } from 'react-bootstrap-icons'; // <-- New Icon

const Header = () => {
  const { user, logout } = useAuth(); // <-- Get the full user object
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <NavLink to="/" className="hover:text-blue-400">SnS</NavLink>
        </div>
        <ul className="flex items-center space-x-6">
          <li><NavLink to="/" className={({ isActive }) => isActive ? "text-blue-300" : "hover:text-blue-400"}>Home</NavLink></li>
          <li><NavLink to="/services" className={({ isActive }) => isActive ? "text-blue-300" : "hover:text-blue-400"}>Services</NavLink></li>
          <li><NavLink to="/build-pc" className={({ isActive }) => isActive ? "text-blue-300" : "hover:text-blue-400"}>Build Your PC</NavLink></li>
          <li><NavLink to="/consultancy" className={({ isActive }) => isActive ? "text-blue-300" : "hover:text-blue-400"}>Consultancy</NavLink></li>

          {/* New: Conditionally render Admin Dashboard link */}
          {user && user.role === 'ROLE_ADMIN' && (
            <li>
              <NavLink to="/admin" className={({ isActive }) => isActive ? "text-yellow-300 flex items-center" : "hover:text-yellow-400 flex items-center"}>
                <ShieldLock className="mr-2" />
                Admin
              </NavLink>
            </li>
          )}

        </ul>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-gray-300">{user.email}</span>
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/login')} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Login
              </button>
              <button onClick={() => navigate('/register')} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                Register
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;