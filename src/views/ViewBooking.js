import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const bookings = [
  {
    id: 1,
    hotelName: 'Luxury Hotel',
    bookingId: 'ABCD1234',
    checkInDate: '2024-05-15',
    checkOutDate: '2024-05-18',
    amount: 500,
  },
  // Add more booking data as needed
];

function ViewBookings() {
  const handleEdit = (bookingId) => {
    // Handle editing of booking with the provided ID
  };

  const handleCancel = (bookingId) => {
    // Handle cancellation of booking with the provided ID
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
      <Container sx={{ marginTop: '80px', padding: '20px' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          My Bookings
        </Typography>
        {bookings.map((booking) => (
          <Box key={booking.bookingId} sx={{ marginBottom: '20px' }}>
            <Typography variant="h6" component="div">
              Hotel Name: {booking.hotelName}
            </Typography>
            <Typography variant="subtitle1" component="div">
              Booking ID: {booking.bookingId}
            </Typography>
            <Typography variant="subtitle1" component="div">
              Check-in Date: {booking.checkInDate}
            </Typography>
            <Typography variant="subtitle1" component="div">
              Check-out Date: {booking.checkOutDate}
            </Typography>
            <Typography variant="subtitle1" component="div">
              Amount: ${booking.amount}
            </Typography>
            <Button variant="contained" onClick={() => handleEdit(booking.bookingId)} sx={{ mr: 2, mt: 2 }}>
              Edit Booking
            </Button>
            <Button variant="contained" onClick={() => handleCancel(booking.bookingId)} sx={{ mt: 2 }}>
              Cancel Booking
            </Button>
          </Box>
        ))}
      </Container>
    </Box>
  );
}

export default ViewBookings;
