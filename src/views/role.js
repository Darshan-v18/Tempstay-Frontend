import React from 'react';
import './role.css';

const Role = (props) => {
  const nav = (path) => {
    // Your navigation logic here
    window.location.href = path;
  };
  
  
  const handleUserRegister = () => {
    console.log('User button clicked');
  };

  const handleServiceProviderRegister = () => {
   nav('/ServiceProviderRegister');
  };

  return (
    <div>
      <div className="login-nav">
        <div className="home-nav">
          <span className="logo">TEMPSTAY</span>
          <div data-thq="thq-close-menu" className="home-close-menu"></div>
        </div>
      </div>
      <div className="container-wrapper">
        <div className="user-container">
          <h1>User</h1>
          <p>Register as User to book hotel rooms of your choice anytime and anywhere</p>
          <button type="button" className="btn btn-primary" onClick={handleUserRegister}>
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
