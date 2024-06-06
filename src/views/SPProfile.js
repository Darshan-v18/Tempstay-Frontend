import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory hook
import axios from 'axios'; // Import axios for making API requests
import "./SPProfile.css";
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const SPProfile = () => {
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
    // State variables to hold user information
    const [userInfo, setUserInfo] = useState({
        hotelName: '',
        address: '',
        phoneNumber: '',
    });

    // Access the history object using useHistory hook
    const history = useHistory();

    useEffect(() => {
        getInfo();
    }, []);

    // Function to fetch user information 
    const getInfo = async () => {
        try {
            const response = await axios.get("http://65.1.95.196:9030/api/getuserdetailsbytoken", {
                headers: {
                    Token: Cookies.get('token'),
                    role: Cookies.get('userType'),
                }
            });
            setUserInfo(response.data);
        } catch (e) {
            console.error("Error fetching user info:", e.message);
        }
    };

    // Function to handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            [name]: value,
        }));
    };

    // Function to update user information and redirect to "/SPDashboard"
    const updateUserInformation = async () => {
        try {
            // Make API request to update user information
            const response = await axios.put(
                "http://65.1.95.196:9030/api/updatehotelownerdetails",
                userInfo,
                {
                    headers: {
                        "Content-Type": "application/json",
                        token: Cookies.get("token"),
                    },
                }
            );

            // Handle successful response
            console.log("User information updated:", response.data);

            setOpenSuccessDialog(true);
        } catch (error) {
            // Handle error
            console.error("Error updating user information:", error.message);
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
            <div className="user-profile-container">
                <h2>User Profile</h2>
                <div>
                    <label>Hotel Name:</label>
                    <input
                        type="text"
                        name="hotelName"
                        value={userInfo.hotelName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={userInfo.address}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={userInfo.phoneNumber}
                        onChange={handleChange}
                    />
                </div>
                <button onClick={updateUserInformation}>Save</button>
            </div>
            <Dialog open={openSuccessDialog} onClose={() => setOpenSuccessDialog(false)}>
                <DialogTitle>Update Success</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        Service Provider Info Changed Successfully
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setOpenSuccessDialog(false);
                        history.push('/SPDashboard');
                    }}>Close</Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};

export default SPProfile;
