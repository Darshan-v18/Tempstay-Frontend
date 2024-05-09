// login.js

import React, { useState, useEffect } from "react";
import "./login.css";
import ForgotPassword from "./ForgotPassword";
import axios from "axios";
import Cookies from "js-cookie";
import OTPPopup from "./OTPPopup";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("user");
  const [showOTPPopup, setShowOTPPopup] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      // Token exists, handle login or other operations here
      console.log("Token exists:", token);
    } else {
      console.log("No token found");
    }
  }, []);

  const nav = (path) => {
    // Your navigation logic here
    window.location.href = path;
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleForgotPassword = () => {
    nav("/ForgotPassword");
  };

  const handleLoginSuccess = () => {
    setShowOTPPopup(true);
  };

  const handleOTPSubmit = async (otp) => {
    // Handle OTP submission here
    setShowOTPPopup(false);
    // nav("/UserPanel");
    // Proceed with your logic after OTP submission
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add your form submission logic here
    const userData = {
      email,
      password,
    };
    console.log("User Data:", userData, userType);

    try {
      // Make POST request to backend API using Axios
      const response = await axios.post(
        "http://localhost:9030/api/login",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
            role: userType,
          },
        }
      );

      // Check if request was successful
      console.log("Response:", response.data); // Log the response data
      console.log("User login successfully");
      handleLoginSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-nav">
        <div className="home-nav">
          <span className="logo">TEMPSTAY</span>
          <div data-thq="thq-close-menu" className="home-close-menu"></div>
        </div>
      </div>
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <div className="radio-buttons">
              <input
                type="radio"
                id="user"
                name="userType"
                value="user"
                checked={userType === "user"}
                onChange={handleUserTypeChange}
              />
              <label htmlFor="user">User</label>
              <input
                type="radio"
                id="serviceProvider"
                name="userType"
                value="serviceprovider"
                checked={userType === "serviceprovider"}
                onChange={handleUserTypeChange}
              />
              <label htmlFor="serviceProvider">Service provider</label>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div id="button-group">
            <button
              type="button"
              className="btn-forgot"
              onClick={handleForgotPassword}
            >
              Forgot password
            </button>
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
        <div>{showOTPPopup && <OTPPopup onSubmit={handleOTPSubmit} />}</div>
      </div>
    </div>
  );
};

export default Login;
