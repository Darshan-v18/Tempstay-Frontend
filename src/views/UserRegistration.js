import React, { useState } from "react";
import "./UserRegistration.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

const UserRegister = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      userName,
      email,
      phoneNumber,
      password,
    };
    console.log("Service Provider Data:", userData);

    try {
      // Make POST request to backend API using Axios
      const response = await axios.post(
        "http://localhost:9030/api/adduser",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
            role: "user",
          },
        }
      );

      // Check if request was successful
      console.log("Response:", response.data); // Log the response data
      console.log("User successfully registered.");
      Cookies.set("token", response.data.token, { expires: 7 });
      history.push("/login", { registrationSuccess: true });


    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("User already exists");
      } else {
        console.error("Error registering user:", error.message);
      }
    }
  };

  return (
    <div>
      {errorMessage && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setErrorMessage("")}>
              ×
            </span>
            <p>{errorMessage}</p>
          </div>
        </div>
      )}
      <div className="login-nav">
        <div className="home-nav">
          <span className="logo">TEMPSTAY</span>
          <div data-thq="thq-close-menu" className="home-close-menu"></div>
        </div>
      </div>
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              className="form-control"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserRegister;
