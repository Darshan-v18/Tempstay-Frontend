// ForgotPassword.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./ForgotPassword.css";
import Showotpforgot from "./OTPforgot";
import OTPforgot from "./OTPforgot";

const ForgotPassword = (props) => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userType, setUserType] = useState("");
  const [Showotpforgot, setShowOTPPopup] = useState(false);


  const nav = (path) => {
    // Your navigation logic here
    window.location.href = path;
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };


  const handleLoginSuccess = () => {
    setShowOTPPopup(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const users=Cookies.get("userType");
    console.log(users)
    if(users=="serviceprovider"){
      nav("/ResetPassword");
      return;
    }
    try {

      console.log(Cookies.get("userType"));
      // Make POST request to backend API using Axios
      const response = await axios.post(
        "http://localhost:9030/api/forgotpassword", {
      },
        {
          headers: {
            "Content-Type": "application/json",
            email: email,
            role: Cookies.get("userType"),
          },
        }
      );


      handleLoginSuccess();
      // Check if request was successful
      console.log("Response:", response.data); // Log the response data
      setSuccessMessage("OTP sent to your email.");


    } catch (error) {
      console.log(error);
      // Set error message
      // setErrorMessage("Failed to send OTP. Please try again.");
    }
  };

  const handleOTPSubmit = async (otp) => {
    // Handle OTP submission here
    setShowOTPPopup(false);
    nav("/ResetPassword");
  };

  const handleCloseOTPPopup = () => {
    setShowOTPPopup(false);
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
        <h1>Forgot Password!!</h1>
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
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <div>{Showotpforgot && <OTPforgot onSubmit={handleOTPSubmit} onClose={handleCloseOTPPopup} />}</div>
      </div>
    </div>
  );
};

export default ForgotPassword;
