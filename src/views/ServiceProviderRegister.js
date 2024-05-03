import React, { useState } from 'react';
import './ServiceProviderRegister.css';

const ServiceProviderRegister = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isUserChecked, setIsUserChecked] = useState(false); // State for User checkbox
    const [isServiceProviderChecked, setIsServiceProviderChecked] = useState(false); // State for Service Provider checkbox

    const handleServiceProviderRegister = () => {
        setIsServiceProviderChecked(!isServiceProviderChecked);
        console.log("Service Provider Checkbox is now:", !isServiceProviderChecked);
    };

    const handleUserRegister = () => {
        setIsUserChecked(!isUserChecked);
        console.log("User Checkbox is now:", !isUserChecked);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleContactChange = (event) => {
        setContact(event.target.value);
    }
    const handleAddressChange = (event) => {
        setAddress(event.target.value)
    }
    const handleHotelNameChange = (event) => {
        setHotelName(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('User Checkbox Checked:', isUserChecked);
        console.log('Service Provider Checkbox Checked:', isServiceProviderChecked);
    };

    return (
        <div>
            <div className="login-nav">
                <div className="home-nav">
                    <span className="logo">TEMPSTAY</span>
                    <div data-thq="thq-close-menu" className="home-close-menu"></div>
                </div>
            </div>
            <div className="login-container">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={handleEmailChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={handlePasswordChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputName" className="form-label">Name</label>
                        <input type="" className="form-control" id="exampleInputName" onChange={handleNameChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputContact" className="form-label">Contact no:</label>
                        <input type="password" className="form-control" id="exampleInputContact" onChange={handleContactChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputHotelName" className="form-label">Hotel Name</label>
                        <input type="password" className="form-control" id="exampleInputHotelName" onChange={handleHotelNameChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputAddress" className="form-label">Address</label>
                        <input type="password" className="form-control" id="exampleInputAddress" onChange={handleAddressChange} />
                    </div>
                </form>
                <button type="submit" className="btn btn-primary">Register</button>
            </div>
        </div>
    );
}

export default ServiceProviderRegister;
