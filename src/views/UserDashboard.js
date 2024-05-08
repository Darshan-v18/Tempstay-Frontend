import React, { useState } from 'react';
import "./UserDashboard.css"
import userIcon from '../Images/Icons/usericon.jpg';
import { FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // If you're using React Router

// UserDashboard component
const UserDashboard = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen); // Toggle the state
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="hamburger-icon" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Dropdown Menu */}
        <div className={`dropdown-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li>
              <Link to="/viewbooking">View Booking</Link>
            </li>
            <li>
              <Link to="/delete">Delete Booking</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
        </div>

        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            TEMPSTAY
          </Link>
          {/* Search bar */}
          <div className="search-bar">
            <input type="text" placeholder="Search Hotels" />
            <button><FaSearch /></button>
          </div>
          {/* Spacer element */}
          <div className="spacer" />
          <div className="menu-icon" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>

        {/* Navigation links */}
        <ul className={isMenuOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/profile" className="nav-links" onClick={toggleMenu}>
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/settings" className="nav-links" onClick={toggleMenu}>
              Settings
            </Link>
          </li>
          {/* User icon with dropdown for logout */}
          <li className="nav-item user-icon">
            <img src={userIcon} alt="User Icon" onClick={toggleMenu} />
            <ul className="dropdown">
              <li className="nav-item">
                <Link to="/logout" className="nav-links" onClick={toggleMenu}>
                  Logout
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      {/* Page content */}
      <div className="dashboard-content">
        {/* Your dashboard content goes here */}
        <h1>Welcome to the User Dashboard</h1>
      </div>
    </div>
  );
};

// Export the component
export default UserDashboard;
