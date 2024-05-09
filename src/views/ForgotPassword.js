// ForgotPassword.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./ForgotPassword.css";

const ForgotPassword = (props) => {
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");
    const userType = Cookies.get("userType");
    if (token) {
      // Token exists, handle login or other operations here
      console.log("Token exists:", token, userType);
    } else {
      console.log("No token found");
    }
  }, []);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make POST request to backend API using Axios
      const response = await axios.post(
        "http://localhost:9030/api/forgotpassword",
        {
          headers: {
            "Content-Type": "application/json",
            email: email,
            role: Cookies.get("userType"),
          },
        }
      );

      // Check if request was successful
      console.log("Response:", response.data); // Log the response data
      console.log("User login successfully");
      handleLoginSuccess();
    } catch (error) {
      console.log(error);
    } // Access userTypeValue here
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
    </div>
      </div>
  );
};

export default ForgotPassword;
