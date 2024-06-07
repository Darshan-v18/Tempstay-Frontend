import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL } from "../constant";

const OTPPopup = ({ onSubmit, onClose }) => {
  const [otp, setOTP] = useState(""); // State to store the OTP entered by the user

  const handleChange = (event) => {
    setOTP(event.target.value); // Update the OTP state when the user enters OTP
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Make a request to verify the OTP
      const response = await axios.post(
        `${API_BASE_URL}/api/2factorauthentication`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            role: Cookies.get("userType"),
            otpforTwoFAFromUser: otp,
            email: Cookies.get("email"), // Include email in the headers
          },
        }
      );
      Cookies.set("token", response.data.token, { expires: 7 });
      // If OTP verification is successful, call the onSubmit function passed from the parent component
      onSubmit(otp);
    } catch (error) {
      alert("Please enter the correct Otp");
      console.error("Error verifying OTP:", error);
      // Handle error (e.g., display error message to the user)
    }
  };

  const handleClose = () => {
    onClose(); // Call the onClose function passed from the parent component
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-75">
      <div className="bg-white rounded-lg overflow-hidden w-80">
        <div className="flex justify-between items-center bg-gray-200 px-4 py-2">
          <h5 className="text-lg font-semibold">OTP Sent to Email</h5>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={handleClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="otpInput" className="block text-sm font-medium text-gray-700">
                OTP
              </label>
              <input
                type="text"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-3 py-2"
                id="otpInput"
                placeholder="Enter OTP"
                value={otp}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTPPopup;
