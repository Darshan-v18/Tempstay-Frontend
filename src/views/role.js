import React from 'react';
import './role.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


const Role = (props) => {
  const nav = (path) => {
    // Your navigation logic here
    window.location.href = path;
  };




  const handleServiceProviderRegister = () => {
    nav('/ServiceProviderRegister');
  };

  const UserRegister = () => {
    nav('/UserRegister');
  };


  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className='roledashboard'>
      <div className="login-nav">
        
          <nav className="bg-gray-800 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-center h-16">
                <button
                  onClick={handleBack}
                  className="absolute left-4 text-white text-xl font-medium focus:outline-none hover:text-indigo-500 hover:scale-110 transition duration-200"
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <span className="text-white text-xl font-bold">TEMPSTAY</span>
              </div>
            </div>
          </nav>
     
      </div>
      <div className="container-wrapper">
        <div className="user-container">
          <h1>User</h1>
          <p>Register as User to book hotel rooms of your choice anytime and anywhere</p>
          <button type="button" className="btn btn-primary" onClick={UserRegister}>
            User
          </button>
        </div>
        <div className="service-provider-container">
          <h1>Service Provider</h1>
          <p>Register as Service Provider to extend your lodging services</p>
          <button type="button" className="btn btn-primary" onClick={handleServiceProviderRegister}>
            Service Provider
          </button>
        </div>
      </div>
    </div>
  );
};

export default Role;
