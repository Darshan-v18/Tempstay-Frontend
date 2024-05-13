import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import Cookies from 'js-cookie';

function ViewBookings() {
  const [userBookings, setUserBookings] = useState([]);

  useEffect(() => {
    fetchUserBookings();
  }, []);

  const fetchUserBookings = async () => {
    try {
      const response = await axios.get('http://localhost:9030/api/getuserdetails', {
        headers: {
          token: Cookies.get('token'),
          role: Cookies.get('userType'),
        },
      });
      console.log(response.data);
      setUserBookings(response.data);
    } catch (error) {
      console.error('Error fetching user bookings:', error);
    }
  };

  const handleEdit = (bookingId) => {
    // Handle editing of booking with the provided ID
  };

  const handleCancel = async (bookingId) => {

    console.log(Cookies.get('userType'));
    console.log(Cookies.get('token'));
    console.log(bookingId);
    try {
      await axios.delete(`http://localhost:9030/api/deletebooking`, {
        headers: {
          token: Cookies.get('token'),
          role: Cookies.get('userType'),
          roomBookingId: bookingId
        },
      });
      // Update user bookings after deletion
      fetchUserBookings();
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };
  

  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            View Bookings
          </Typography>
          <Typography variant="h5">
            TEMPSTAY
          </Typography>
          <div></div>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: '80px', padding: '20px', backgroundColor: '#f0f0f0' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          My Bookings
        </Typography>
        {userBookings.map((booking) => (
          <Box key={booking.bookingId} sx={{ marginBottom: '20px', backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px' }}>
            <Typography variant="h6" component="div">
              Hotel Name: {booking.hotelName}
            </Typography>
            <Typography variant="subtitle1" component="div">
              Booking ID: {booking.roomBookingId}
            </Typography>
            <Typography variant="subtitle1" component="div">
              Check-in Date: {booking.checkinDate}
            </Typography>
            <Typography variant="subtitle1" component="div">
              Check-out Date: {booking.checkoutDate}
            </Typography>
            <Typography variant="subtitle1" component="div">
              Amount: ${booking.priceToBePaid}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <Button variant="contained" onClick={() => handleEdit(booking.roomBookingId)} sx={{ mt: 2 }}>
                Edit Booking
              </Button>
              <Button variant="contained" onClick={() => handleCancel(booking.roomBookingId)} sx={{ mt: 2 }}>
                Cancel Booking
              </Button>
            </Box>
          </Box>
        ))}
      </Container>
    </Box>
  );
}

export default ViewBookings;
