// ForgotPassword.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./ForgotPassword.css";
import Showotpforgot from "./OTPforgot";
import OTPforgot from "./OTPforgot";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { Cookie } from "@mui/icons-material";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const ForgotPassword = (props) => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userType, setUserType] = useState("");
  const [Showotpforgot, setShowOTPPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

    const users = Cookies.get("userType");
    console.log(users)
    // if (users == "serviceprovider") {
    //   nav("/ResetPassword");
    //   return;
    // }
    setLoading(true);
    try {

      console.log(Cookies.get("userType"));
      // Make POST request to backend API using Axios
      const response = await axios.post(
        "http://3.109.122.147:9030/api/forgotpassword", {
      },
        {
          headers: {
            "Content-Type": "application/json",
            email: email,
            role: Cookies.get("userType"),
          },
        }
      );

      Cookies.set("email", email);
      handleLoginSuccess();
      // Check if request was successful
      console.log("Response:", response.data); // Log the response data
      setSuccessMessage("OTP sent to your email.");


    } catch (error) {
      console.log(error);
      const mess = "The Email is not valid"
      setErrorMessage(mess);
      setOpenDialog(true);

    }
    finally {
      setLoading(false); // Set loading state to false after the request is completed
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

  const handleBack = () => {
    history.back();
  };

  return (
    <div className="forgot-password-page">
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
      {loading ? (
        <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row" justifyContent="center">
          <CircularProgress color="secondary" />
        </Stack>
      ) : (

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
        </div>)}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Invalid Email</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            {errorMessage}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ForgotPassword;
