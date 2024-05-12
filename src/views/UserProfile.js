import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory hook
import "./UserProfile.css";

const UserProfile = () => {
    // State variables to hold user information
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    // Access the history object using useHistory hook
    const history = useHistory();

    // Function to fetch user information (e.g., from localStorage)
    useEffect(() => {
        // Fetch user information (replace with actual fetching logic)
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) {
            setUsername(userInfo.username);
            setEmail(userInfo.email);
            setPhoneNumber(userInfo.phoneNumber);
        }
    }, []);

    // Function to handle username change
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    // Function to handle phone number change
    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    // Function to update user information and redirect to "/SPDashboard"
    const updateUserInformation = () => {
        // Update user information (replace with actual update logic)
        const updatedUserInfo = { username, email, phoneNumber };
        localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
        // Redirect to "/SPDashboard"
        history.push('/SPDashboard');
        // Optionally, you can also make an API call to update user information on the server
    };

    return (
        <div className="user-profile-container">
            <h2>User Profile</h2>
            <div>
                <label>Username:</label>
                <input type="text" value={username} onChange={handleUsernameChange} />
            </div>
            <div>
                <label>Email:</label>
                <input type="text" value={email} readOnly />
            </div>
            <div>
                <label>Phone Number:</label>
                <input type="text" value={phoneNumber} onChange={handlePhoneNumberChange} />
            </div>
            <button onClick={updateUserInformation}>Save</button>
        </div>
    );
};

export default UserProfile;
