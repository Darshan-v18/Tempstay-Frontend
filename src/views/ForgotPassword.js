// ForgotPassword.js

import React, { useState } from "react";
import "./ForgotPassword.css";

const ForgotPassword = (props) => {
    
  const [email, setEmail] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const userTypeValue = props;

    console.log("Email:", email);
    console.log("User Type:", userTypeValue); // Access userTypeValue here
  };
  return (
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
  );
};

export default ForgotPassword;
