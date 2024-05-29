import React, { useState } from "react";
import "./login.css";
import ForgotPassword from "./ForgotPassword";
import axios from "axios";
import Cookies from "js-cookie";
import OTPPopup from "./OTPPopup";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("user");
  const [showOTPPopup, setShowOTPPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showInvalidPopup, setShowInvalidPopup] = useState(false);
  const [loading, setLoading] = useState(false); // State to track if invalid login popup should be shown
  const [loginSuccess, setLoginSuccess] = useState(false);

  const nav = (path) => {
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
    console.log("userType", userType);
    Cookies.set("userType", userType);
    nav("/ForgotPassword");
  };

  const handleLoginSuccess = () => {
    setShowOTPPopup(true);
    Cookies.set("userType", userType);
    Cookies.set("email", email);
  };

  const handleOTPSubmit = async (otp) => {
    setShowOTPPopup(false);
    if (userType === "user") {
      nav("/UserDashboard");
    } else if (userType === "serviceprovider") {
      nav("/SPDashboard");
    }
    setLoginSuccess(true);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const userData = {
      email,
      password,
    };

    try {

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

      console.log("Response:", response.data);
      console.log("User login successfully");
      handleLoginSuccess();
    } catch (error) {
      console.log(error);
      // Show invalid login popup if login fails
      setShowInvalidPopup(true);
    } finally {
      setLoading(false); // Set loading state to false after the request is completed
    }
  };

  const handleCloseOTPPopup = () => {
    setShowOTPPopup(false);
  };

  const handleCloseInvalidPopup = () => {
    setShowInvalidPopup(false);
  };


  const handleBack = () => {
    nav('/');
  };

  return (
    <div
      className="min-h-screen bg-cover"
      style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }}
    >
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
      <div className="min-h-screen flex justify-center items-center">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl text-center font-bold text-gray-800 mb-6">
            Sign in to your account
          </h2>
          {/* Conditional rendering based on loading state */}
          {loading ? (
            <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row" justifyContent="center">
              <CircularProgress color="secondary" />
            </Stack>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="userType" className="sr-only">
                  User Type
                </label>
                <div className="mt-1 grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <input
                      id="user"
                      name="userType"
                      type="radio"
                      value="user"
                      checked={userType === "user"}
                      onChange={handleUserTypeChange}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label htmlFor="user" className="ml-2 block text-sm text-gray-900">
                      User
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="serviceProvider"
                      name="userType"
                      type="radio"
                      value="serviceprovider"
                      checked={userType === "serviceprovider"}
                      onChange={handleUserTypeChange}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label htmlFor="serviceProvider" className="ml-2 block text-sm text-gray-900">
                      Service Provider
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={handleEmailChange}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>
              </div>
            </form>
          )}
          {showOTPPopup && <OTPPopup onSubmit={handleOTPSubmit} onClose={handleCloseOTPPopup} />}
          {showInvalidPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
              <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
                <p className="text-lg text-center text-red-600">Invalid Email/Password</p>
                <button
                  className="block mx-auto mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
                  onClick={handleCloseInvalidPopup}
                >
                  OK
                </button>
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
              <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
                <p className="text-lg text-center text-red-600">{errorMessage}</p>
                <button className="block mx-auto mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700" onClick={() => setErrorMessage("")}>OK</button>
              </div>
            </div>
          )}

          {loginSuccess && (
            <div className="text-green-600 text-center font-bold mt-4">
              Login successful! Redirecting to dashboard...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
