import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory hook
import axios from 'axios'; // Import axios for making API requests
import "./SPProfile.css";
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
const UserProfile = () => {
    // State variables to hold user information
    const [userName, setusername] = useState('');
    const [phoneNumber, setphoneNumber] = useState('');

    // Access the history object using useHistory hook
    const history = useHistory();

    // Function to fetch user information (e.g., from localStorage)
    useEffect(() => {
        // Fetch user information (replace with actual fetching logic)
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) {
            setusername(userInfo.username);
            setphoneNumber(userInfo.phoneNumber);
        }
    }, []);

    // Function to handle hotel name change
    const handleusernameChange = (e) => {
        setusername(e.target.value);
    };

    // Function to handle address change
    const handlephoneNumberChange = (e) => {
        setphoneNumber(e.target.value);
    };


    // Function to update user information and redirect to "/SPDashboard"
    const updateUserInformation = async () => {
        try {
            // Make API request to update user information
            const response = await axios.put(
                "http://localhost:9030/api/updateuserdetails",
                {
                    userName,
                    phoneNumber,

                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        token: Cookies.get("token"),
                    },
                }
            );

            // Handle successful response
            console.log("User information updated:", response.data);

            // Redirect to "/SPDashboard"
            history.push('/UserDashboard');
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
                <h2>User Profile Update</h2>
                <div>
                    <label>User Name:</label>
                    <input type="text" value={userName} onChange={handleusernameChange} />
                </div>
                <div>
                    <label>phoneNumber:</label>
                    <input type="text" value={phoneNumber} onChange={handlephoneNumberChange} />
                </div>
                <button onClick={updateUserInformation}>Save</button>
            </div>
        </div>
    );
};

export default UserProfile;
