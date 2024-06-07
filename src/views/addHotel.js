import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import "./addHotel.css";
import axios from 'axios';
import Cookies from 'js-cookie';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';// Import Axios library for making HTTP requests
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
const AddHotel = () => {
  const [roomType, setRoomType] = useState('');
  const [numRooms, setNumRooms] = useState('');
  const [price, setPrice] = useState('');
  const history = useHistory();



  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Fetch tokens from cookies

      console.log("user", Cookies.get("userType"))
      console.log("token", Cookies.get("token"))

      const data = [
        {
          room: roomType,
          price: price,
          numberOfRoom: numRooms
        }
      ];

      console.log(data);
      // Make API request
      const response = await axios.post('http://3.109.122.147:9030/api/uploadhotels',
        data
        , {
          headers: {
            "Content-Type": "application/json",
            token: Cookies.get("token"),
            role: Cookies.get("userType")
          }
        });

      console.log(response.data); // Log response from API
      history.push('/SPDashboard'); // Redirect after successful submission
    } catch (error) {
      console.error('Error:', error); // Log any errors
    }
  };

  const handleCancel = () => {
    history.push('/SPDashboard');
  };


  const handleNumRoomsChange = (e) => {
    const value = e.target.value;
    if (value === '' || (!isNaN(value) && parseInt(value) >= 0)) {
      setNumRooms(value);
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (value === '' || (!isNaN(value) && parseInt(value) >= 0)) {
      setPrice(value);
    }
  };


  const handleBack = () => {
    window.history.back();
  };
  return (
    <div className='bagr'>
      <AppBar position="fixed">
        <Toolbar>
          <button
            onClick={handleBack}
            className="absolute left-4 text-white text-xl font-medium focus:outline-none hover:text-indigo-500 hover:scale-110 transition duration-200"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Add Hotels
          </Typography>
          <Typography variant="h5" >
            TEMPSTAY
          </Typography>
          <div></div>
        </Toolbar>
      </AppBar>
      <div className="add-hotel-container" style={{ marginTop: '65px' }}>
        <form onSubmit={handleSubmit} className="hotel-form">
          <label>
            Type of Room:
            <select value={roomType} onChange={e => setRoomType(e.target.value)}>
              <option value="">Select room type</option>
              <option value="single">Single</option>
              <option value="double">Double</option>
              <option value="triple">Triple</option>
            </select>
          </label>

          <label>
            Number of Rooms:
            <input type="number" value={numRooms} onChange={handleNumRoomsChange} />
          </label>
          <label>
            Price:
            <input type="number" value={price} onChange={handlePriceChange} />
          </label>
          <button type="submit">Submit</button>
          <button type="button" onClick={handleCancel} className="cancel-button">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHotel;
