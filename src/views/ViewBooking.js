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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';


function ViewBookings() {
  const [userBookings, setUserBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);
  const [checkinDate, setCheckinDate] = useState('');
  const [checkoutDate, setCheckoutDate] = useState('');
  const [numberOfRooms, setNumberOfRooms] = useState('');
  const [open, setOpen] = useState(false);
  const [editedBooking, setEditedBooking] = useState(null);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [bookingIdToCancel, setBookingIdToCancel] = useState(null);


  useEffect(() => {
    fetchUserBookings();
  }, []);


  const openEditDialog = (booking) => {
    setEditedBooking(booking);
    setOpen(true);
    setCheckinDate(booking.checkinDate);
    setCheckoutDate(booking.checkoutDate);
    setNumberOfRooms(booking.numberOfRooms);
  };


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

  const handleEdit = (booking) => {
    setEditingBooking(booking);
    setCheckinDate(booking.checkinDate);
    setCheckoutDate(booking.checkoutDate);
    setNumberOfRooms(booking.numberOfRooms);
    setOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:9030/api/updateroombooking`,
        {
          roomId: editingBooking.roomId,
          roomBookingId: editingBooking.roomBookingId,
          checkinDate,
          checkoutDate,
          numberOfRooms,
        },
        {
          headers: {
            token: Cookies.get('token'),
            role: Cookies.get('userType'),
          },
        }
      );
      // Update user bookings after editing
      fetchUserBookings();
      setEditingBooking(null);
    } catch (error) {
      console.error('Error editing booking:', error);
    }
  };

  const handleCancelBooking = async () => {
    try {
      await axios.put(`http://localhost:9030/api/deletebooking`, null, {
        headers: {
          token: Cookies.get('token'),
          role: Cookies.get('userType'),
          roomBookingId: bookingIdToCancel,
        },
      });
      fetchUserBookings(); // Refresh user bookings after cancellation
      setOpenCancelDialog(false); // Close the cancel dialog
    } catch (error) {
      console.error('Error canceling booking:', error);
    }
  };

  const openCancelDialogForBooking = (bookingId) => {
    setBookingIdToCancel(bookingId);
    setOpenCancelDialog(true);
  };

  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            View Bookings
          </Typography>
          <Typography variant="h5" >
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
              Number of Rooms: {booking.numberOfRooms}
            </Typography>
            <Typography variant="subtitle1" component="div">
              Amount: Rs{booking.priceToBePaid}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Button variant="contained" onClick={() => handleEdit(booking)} sx={{ mt: 0 }}>
                Edit Booking
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Button variant="contained" onClick={() => openCancelDialogForBooking(booking.roomBookingId)} sx={{ mt: 1 }}>
                Cancel Booking
              </Button>
            </Box>
          </Box>
        ))}
      </Container>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Booking</DialogTitle>
        <DialogContent>
          <TextField
            label="Check-in Date"
            type="date"
            value={checkinDate}
            onChange={(e) => setCheckinDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            label="Check-out Date"
            type="date"
            value={checkoutDate}
            onChange={(e) => setCheckoutDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Number of Rooms"
            type="number"
            value={numberOfRooms}
            onChange={(e) => setNumberOfRooms(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveEdit}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openCancelDialog} onClose={() => setOpenCancelDialog(false)}>
        <DialogTitle>Confirm Cancel Booking</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to cancel this booking?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCancelDialog(false)}>Cancel</Button>
          <Button onClick={handleCancelBooking} variant="contained" color="error">Confirm</Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}

export default ViewBookings;
