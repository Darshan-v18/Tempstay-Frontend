// ForgotPassword.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./ForgotPassword.css";
import Showotpforgot from "./OTPforgot";
import OTPforgot from "./OTPforgot";

const ForgotPassword = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [Showotpforgot, setShowOTPPopup] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };


  const nav = (path) => {
    // Your navigation logic here
    window.location.href = path;
  };

  const handleResetSuccess = () => {
    nav("/login");
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {

      console.log(email, userType, password);
      // Make POST request to backend API using Axios\
      const response = await axios.post(
        "http://localhost:9030/api/resetpassword",{
        },
        {
          headers: {
            "Content-Type": "application/json",
            email: email,
            role: userType,
            passwordFromUser: password,
          },
        }
      );


       handleResetSuccess();
      // Check if request was successful
      console.log("Response:", response.data); // Log the response data
      setSuccessMessage("OTP sent to your email.");
      

    } catch (error) {
      console.log(error);
      // Set error message
      // setErrorMessage("Failed to send OTP. Please try again.");
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };
  
  return (
    <div className="forgot-password-page">
      <div className="login-nav">
        <div className="home-nav">
          <span className="logo">TEMPSTAY</span>
          <div data-thq="thq-close-menu" className="home-close-menu"></div>
        </div>
      </div>
      <div className="forgot-password-container">
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address:</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">New Password:</label>
            <input
              type="password"
              id="exampleInputPassword1"
              className="form-control"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="userType">User Type:</label>
            <select
              id="userType"
              className="form-control"
              value={userType}
              onChange={handleUserTypeChange}
              required
            >
              <option value="">Select User Type</option>
              <option value="user">User</option>
              <option value="serviceprovider">Service Provider</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
