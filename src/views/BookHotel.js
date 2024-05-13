import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import axios from 'axios';


const roomTypes = [
  { value: 'single', label: 'Single' },
  { value: 'double', label: 'Double' },
  { value: 'triple', label: 'Triple' },
];

function BookHotel() {
  const history = useHistory();
  const location = useLocation();
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [checkinDate, setCheckInDate] = useState('');
  const [checkoutDate, setCheckOutDate] = useState('');
  const [numberOfRooms, setNumberOfRooms] = useState('');


  console.log(Cookies.get("ownerID"));
  const handleBookHotel = async () => {
    try {



      // Make an HTTP request to fetch the room ID based on the selected room type
      const response1 = await axios.get(`http://localhost:9030/api/getdetails`, {
        headers: {
          ownerId: Cookies.get('ownerID'),
          roomType: selectedRoomType,
        },
      });


      // Extract the room ID from the response
      const roomId = response1.data.roomId;


      const availabilityResponse = await axios.post('http://localhost:9030/api/checkroom', {
        hotelownId: Cookies.get('ownerID'),
        roomId,
      });

      if (!isRoomAvailable) {
        // Handle case when room is not available
        console.log('The selected room is not available for the specified dates.');
        return;
      }
      const response = await axios.post('http://localhost:9030/api/bookroom', {
        hotelownId: Cookies.get('ownerID'),
        roomId,
        checkinDate,
        checkoutDate,
        numberOfRooms,
      }, {
        headers: {
          token: Cookies.get('token'),
          role: Cookies.get('userType'),
        },
      });

      // Handle the booking response (e.g., redirect to success page)
      console.log('Booking response:', response.data);
      history.push({
        pathname: '/billing'
      });
    } catch (error) {
      console.error('Error fetching room ID:', error);
    }
  };




  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h6">
              Book Hotel
            </Typography>
            <Typography variant="h5">
              TEMPSTAY
            </Typography>
            <div></div> {/* This empty div helps to push TEMPSTAY to the center */}
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="md" sx={{ marginTop: '80px', padding: '20px' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Select Room Type
        </Typography>
        <TextField
          select
          fullWidth
          label="Room Type"
          value={selectedRoomType}
          onChange={(e) => setSelectedRoomType(e.target.value)}
          variant="outlined"
          sx={{ mb: 2 }}
        >
          {roomTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          label="Check-In Date"
          type="date"
          value={checkinDate}
          onChange={(e) => setCheckInDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Check-Out Date"
          type="date"
          value={checkoutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Number of Rooms"
          type="number"
          value={numberOfRooms}
          onChange={(e) => setNumberOfRooms(e.target.value)}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleBookHotel}>
          Book Hotel
        </Button>
      </Container>
    </>
  );
}

export default BookHotel;
