import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ServiceProviderRegister = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const validatePassword = (password) => {
    // Check if the password length is at least 6 characters
    if (password.length < 6) {
      return false;
    }
    // Check if the password contains at least one special character
    const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (!specialChars.test(password)) {
      return false;
    }
    // Check if the password contains at least one number
    const numbers = /[0-9]/;
    if (!numbers.test(password)) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validatePassword(password)) {
      setErrorMessage("Password must be at least 6 characters long and contain at least one special character and one number.");
      return;
    }

    const serviceProviderData = {
      userName,
      email,
      phoneNumber,
      password,
      address,
      hotelName,
    };

    try {
      const response = await axios.post(
        "http://localhost:9030/api/adduser",
        serviceProviderData,
        {
          headers: {
            "Content-Type": "application/json",
            role: "serviceprovider",
          },
        }
      );

      console.log("Response:", response.data);
      console.log("User successfully registered.");
      Cookies.set("token", response.data.token, { expires: 7 });
      // Log registration success state
      history.push("/login");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("User already exists");
      } else {
        console.error("Error registering user:", error.message);
      }
    }
  };



  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-cover" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }}>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-16">
            <div className="flex-shrink-0 flex items-center">     <button
              onClick={handleBack}
              className="absolute left-4 text-white text-xl font-medium focus:outline-none hover:text-indigo-500 hover:scale-110 transition duration-200"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
              <span className="text-white text-xl font-bold">TEMPSTAY</span>
            </div>
          </div>
        </div>
      </nav>
      <div className="min-h-screen flex justify-center items-center">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl text-center font-bold text-gray-800 mb-6">Service Provider Registration</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="userName" className="block text-sm font-medium text-gray-700">Username</label>
                <input type="text" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} required className="form-control" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-control" />
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input type="tel" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required className="form-control" />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="form-control" />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required className="form-control" />
              </div>
              <div>
                <label htmlFor="hotelName" className="block text-sm font-medium text-gray-700">Hotel Name</label>
                <input type="text" id="hotelName" value={hotelName} onChange={(e) => setHotelName(e.target.value)} required className="form-control" />
              </div>
            </div>
            <div>
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Register</button>
            </div>
          </form>
        </div>
      </div>
      {errorMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
          <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
            <p className="text-lg text-center text-red-600">{errorMessage}</p>
            <button className="block mx-auto mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700" onClick={() => setErrorMessage("")}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceProviderRegister;
