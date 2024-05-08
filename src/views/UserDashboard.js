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

  const people = [
    {
      name: 'ABC Hotel',
      rooms: 'Single bed',
      number: '10',
      rating: '3Star',
      imageUrl:
        'https://plus.unsplash.com/premium_photo-1676320514007-b9a41f2e7266?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGhvdGVsJTIwYmVkcm9vbXN8ZW58MHx8MHx8fDA%3D',

    },
    {
      name: 'XYZ Hotel',
      rooms: 'Two bed',
      number: '10',
      rating: '4Star',
      imageUrl:
        'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVkcm9vbXN8ZW58MHx8MHx8fDA%3D',

    },

  ]
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            TEMPSTAY
          </Link>
          {/* Additional Options */}
          <div className="nav-options">
            <Link to="/updatebooking" className="nav-link" onClick={toggleMenu}>
              Update Booking
            </Link>
            <Link to="/deletebooking" className="nav-link" onClick={toggleMenu}>
              Delete Booking
            </Link>
            <Link to="/viewbooking" className="nav-link" onClick={toggleMenu}>
              View Booking
            </Link>
          </div>
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
            <Link to="/profile" className="nav-link" onClick={toggleMenu}>
              Logout
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/settings" className="nav-link" onClick={toggleMenu}>
              Settings
            </Link>
          </li>
          {/* User icon with dropdown for logout */}
          <li className="nav-item user-icon">
            <img src={userIcon} alt="User Icon" onClick={toggleMenu} />
            <ul className="dropdown">
              <li className="nav-item">
                <Link to="/logout" className="nav-link" onClick={toggleMenu}>
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
        <ul role="list" className="divide-y divide-gray-100">
          {people.map((person) => (
            <li key={person.email} className="flex justify-between gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.rooms}</p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">{person.number}</p>
                {person.lastSeen ? (
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Last seen <time dateTime={person.lastSeenDateTime}>{person.rating}</time>
                  </p>
                ) : (
                  <div className="mt-1 flex items-center gap-x-1.5">
                    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <p className="text-xs leading-5 text-gray-500">Online</p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Export the component
export default UserDashboard;
