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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Cookie } from '@mui/icons-material';


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
  const [openDialog, setOpenDialog] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);



  console.log(Cookies.get("ownerID"));
  const handleBookHotel = async () => {
    try {

      console.log(selectedRoomType);

      // Make an HTTP request to fetch the room ID based on the selected room type
      const response1 = await axios.get(`http://localhost:9030/api/getroomidbyhotelownidandroomtype`, {
        headers: {
          hotelownId: Cookies.get('ownerID'),
          roomType: selectedRoomType,
        },
      });


      // Extract the room ID from the response
      const roomId = response1.data;
      console.log(roomId);

      const availabilityResponse = await axios.post('http://localhost:9030/api/checkroom', {
        hotelownId: Cookies.get('ownerID'),
        roomId,
      });

      const isRoomAvailable = availabilityResponse.data.message;
      console.log(isRoomAvailable);
      if (isRoomAvailable == 'No Rooms Available') {
        // Handle case when room is not available
        console.log('The selected room is not available for the specified dates.');
        setOpenDialog(true);
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

      const { priceToBePaid } = response.data;
    console.log('Price to be paid:', priceToBePaid);

    // Show alert message with the amount to be paid
    alert(`Amount to be paid is ${priceToBePaid}`);

      setOpenSuccessDialog(true);

    } catch (error) {
      console.error('Error handling book hotel:', error);
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
          onChange={(e) => {
            const value = e.target.value;
            if (value === '' && e.nativeEvent.inputType === 'deleteContentBackward') {
              setNumberOfRooms('');
            } else {
              const intValue = parseInt(value);
              if (!isNaN(intValue) && intValue >= 1) {
                setNumberOfRooms(intValue);
              } else {
                setNumberOfRooms('');
              }
            }
          }}
          variant="outlined"
          sx={{ mb: 2 }}
        />



        <Button variant="contained" onClick={handleBookHotel}>
          Book Hotel
        </Button>
      </Container>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>No Room Available</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Unfortunately, there are no rooms available for the selected dates.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openSuccessDialog} onClose={() => setOpenSuccessDialog(false)}>
        <DialogTitle>Booking Success</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Your booking has been confirmed successfully.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpenSuccessDialog(false);
            history.push('/UserDashboard');
          }}>Close</Button>
        </DialogActions>
      </Dialog>

    </>
  );
}

export default BookHotel;
