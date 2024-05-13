import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'; // ensure useHistory is properly imported
import "./addHotel.css"; // Assuming this CSS file exists and is correctly configured

const AddHotel = () => {
  const [roomType, setRoomType] = useState('');
  const [numRooms, setNumRooms] = useState('');
  const [price, setPrice] = useState('');
  const history = useHistory(); // For React Router v5

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submit action
    // Here you can add logic to send data to the server or handle it in some way
    console.log({ roomType, numRooms, price });
  };

  // Handle cancel action
  const handleCancel = () => {
    history.push('/SPDashboard'); // Ensure this is the correct path
  };

  return (
    <div className='bagr'>
    <div className="add-hotel-container">
      <form onSubmit={handleSubmit} className="hotel-form">
        <label>
          Type of Room:
          <select value={roomType} onChange={e => setRoomType(e.target.value)}>
            <option value="single">Single</option>
            <option value="double">Double</option>
            <option value="triple">Triple</option>
          </select>
        </label>
        <label>
          Number of Rooms:
          <input type="number" value={numRooms} onChange={e => setNumRooms(e.target.value)} />
        </label>
        <label>
          Price:
          <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
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
