import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';


const roomTypes = [
  { value: 'single', label: 'Single' },
  { value: 'double', label: 'Double' },
  { value: 'triple', label: 'Triple' },
];

function BookHotel() {
  const history = useHistory();
  const location = useLocation();
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [numberOfRooms, setNumberOfRooms] = useState('');

  const handleBookHotel = () => {
    // Implement logic to book hotel
    // Redirect to success page or handle booking confirmation
    history.push({
      pathname: '/billing'
    });
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
          value={checkInDate}
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
          value={checkOutDate}
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
