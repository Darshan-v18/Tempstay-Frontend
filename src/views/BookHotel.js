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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

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
  const [errorMessage, setErrorMessage] = useState('');


  console.log(Cookies.get("ownerID"));

  const today = new Date().toISOString().split('T')[0];
  const handleBookHotel = async () => {
    try {


      if (numberOfRooms === '' || numberOfRooms <= 0) {
        alert('Please enter a valid number for the number of rooms.');
        return;
      }
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
      if (response.data.success === false) {
        setErrorMessage("No rooms available for the specified dates");
        setOpenDialog(true);
      } else {

        // Show alert message with the amount to be paid
        alert(`Amount to be paid is ${priceToBePaid}`);

        setOpenSuccessDialog(true);
      }


    } catch (error) {
      console.error('Error handling book hotel:', error);

      // Extract available rooms and set the error message
      let errorMsg = 'An unexpected error occurred. Please try again later.';
      if (error.response && error.response.data) {
        const { message, availableRooms } = error.response.data;
        console.log(message);
        if (message == "Cannot invoke \"com.tempstay.tempstay.Models.HotelsDB.getRoomId()\" because \"hotels\" is null") {
          errorMsg = "No rooms available for the specified dates";
        } else {
          if (message) {
            errorMsg = message;
          }
          if (availableRooms !== undefined) {
            errorMsg += ` ${availableRooms} rooms are available for the specified dates.`;
          }
        }

      }

      setErrorMessage(errorMsg);
      setOpenDialog(true);
    }
  };


  const handleCheckInDateChange = (e) => {
    const selectedDate = e.target.value;
    setCheckInDate(selectedDate);

    // Calculate the next day's date
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);

    // Set the minimum checkout date as the next day
    setCheckOutDate(nextDay.toISOString().split('T')[0]);
  };

  const handleBack = () => {
    history.push('/UserDashboard');
  };


  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <button
            onClick={handleBack}
            className="absolute left-4 text-white text-xl font-medium focus:outline-none hover:text-indigo-500 hover:scale-110 transition duration-200"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            BookHotel
          </Typography>
          <Typography variant="h5" >
            TEMPSTAY
          </Typography>
          <div></div>
        </Toolbar>
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
          onChange={handleCheckInDateChange}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          sx={{ mb: 2 }}
          inputProps={{ min: today }}
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
          inputProps={{ min: checkoutDate }}
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
            {errorMessage}
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
            Your booking has been confirmed successfully
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
