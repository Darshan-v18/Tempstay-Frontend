// ViewHotels.js
import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './viewBookings.css'; // Import CSS file for styling
import Hotel1 from '../Images/Hotel1.jpg';
import Hotel2 from '../Images/Hotel2.jpg';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Cookies from 'js-cookie';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ViewHotels = () => {
    const history = useHistory();
    const location = useLocation();
    const [bookings, setBookings] = useState([]);
    const [openCancelDialog, setOpenCancelDialog] = useState(false);
    const [bookingIdToCancel, setBookingIdToCancel] = useState(null);
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
    // Sample hotel data
    // const hotels = [
    //     { name: 'Hotel A', location: 'City A', type: 'Luxury', price: '$200', image: Hotel1 },
    //     { name: 'Hotel B', location: 'City B', type: 'Budget', price: '$100', image: Hotel2 },
    //     // Add more hotel data as needed
    // ];

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await axios.get('http://65.1.95.196:9030/api/userdetailsdashboard', {
                headers: {
                    token: Cookies.get("token"),
                    role: Cookies.get("userType"),
                }
            });
            console.log(response.data);
            setBookings(response.data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    const handleCancelBooking = async () => {
        try {
            await axios.put(`http://65.1.95.196:9030/api/checkoutuser`, null, {
                headers: {
                    token: Cookies.get('token'),
                    role: Cookies.get('userType'),
                    roomBookingId: bookingIdToCancel,
                },
            });
            fetchBookings(); // Refresh user bookings after cancellation
            setOpenCancelDialog(false);
            setOpenSuccessDialog(true);// Close the cancel dialog
        } catch (error) {
            console.error('Error canceling booking:', error);
        }
    };
    const openCancelDialogForcheckout = (bookingId) => {
        setBookingIdToCancel(bookingId);
        setOpenCancelDialog(true);
    };


    const handleBack = () => {
        window.history.back();
    };

    return (
        <div className="hotels-container">
            <AppBar position="fixed">
                <Toolbar>
                    <button
                        onClick={handleBack}
                        className="absolute left-4 text-white text-xl font-medium focus:outline-none hover:text-indigo-500 hover:scale-110 transition duration-200"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                        User Bookings
                    </Typography>
                    <Typography variant="h5" >
                        TEMPSTAY
                    </Typography>
                    <div></div>
                </Toolbar>
            </AppBar>
            <ul className="hotel-list" style={{ marginTop: '100px' }}>
                {bookings.map((booking, index) => (
                    <li key={index} className="hotel-item">
                        <div className="hotel-info">
                            <div className="booking-info">
                                <strong>Booking ID: {booking.roomBookingId}</strong>
                                <br />
                                <strong>Hotel Name: {booking.hotelName}</strong>
                                <p>Check-in Date: {booking.checkinDate}</p>
                                <p>Check-out Date: {booking.checkoutDate}</p>
                                <p>Number of Rooms: {booking.numberOfRooms}</p>
                                {/* Add more booking details as needed */}
                            </div>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Button variant="contained" onClick={() => openCancelDialogForcheckout(booking.roomBookingId)} sx={{ mt: 1 }}>
                                    Checkout
                                </Button>
                            </Box>
                        </div>
                    </li>
                ))}
            </ul>
            <Dialog open={openCancelDialog} onClose={() => setOpenCancelDialog(false)}>
                <DialogTitle>Confirm Checkout</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to checkout?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenCancelDialog(false)}>Cancel</Button>
                    <Button onClick={handleCancelBooking} variant="contained" color="error">Confirm</Button>
                </DialogActions>
            </Dialog>


            <Dialog open={openSuccessDialog} onClose={() => setOpenSuccessDialog(false)}>
                <DialogTitle>Checkout Success</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        Customer has successfully checked out.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setOpenSuccessDialog(false);
                        history.push('/SPDashboard');
                    }}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ViewHotels;
