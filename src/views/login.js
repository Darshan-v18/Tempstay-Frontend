// login.js

import React, { useState, useEffect } from "react";
import "./login.css";
import ForgotPassword from "./ForgotPassword";
import Cookies from "js-cookie";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("user");

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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your form submission logic here
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("User Type:", userType);
  };

  return (
    <div>
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
                value="serviceProvider"
                checked={userType === "serviceProvider"}
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
      </div>
      <ForgotPassword userType={userType} />
    </div>
  );
};

export default Login;
