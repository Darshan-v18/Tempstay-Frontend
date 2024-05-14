import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Cookie } from "@mui/icons-material";

const OTPPopup = ({ onSubmit,onClose  }) => {
  const [otp, setOTP] = useState(""); // State to store the OTP entered by the user

  const handleChange = (event) => {
    setOTP(event.target.value); // Update the OTP state when the user enters OTP
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      // Make a request to verify the OTP
      const response = await axios.post(
        `http://localhost:9030/api/2factorauthentication`,{

        },
        {
          headers: {
            "Content-Type": "application/json",
            role: Cookies.get("userType"),
            otpforTwoFAFromUser: otp,
            email: Cookies.get("email"), // Include email in the headers
          }
        } 
      );
      Cookies.set("token", response.data.token, { expires: 7 });
      // If OTP verification is successful, call the onSubmit function passed from the parent component
      onSubmit(otp);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      // Handle error (e.g., display error message to the user)
    }
  };

  const handleClose = () => {
    onClose(); // Call the onClose function passed from the parent component
  };

  return (
    <div className="modal d-block">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Enter OTP</h5>
            <button type="button" className="close" aria-label="Close" onClick={handleClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="otpInput">OTP</label>
                <input
                  type="text"
                  className="form-control"
                  id="otpInput"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPPopup;
