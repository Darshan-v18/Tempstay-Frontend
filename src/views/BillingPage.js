import React from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function BillingPage() {
    const history = useHistory();

    const handleConfirmBooking = () => {
        // Implement logic to confirm booking
        // Redirect to success page or handle booking confirmation
        history.push('/booking-success');
    };

    // Sample billing details
    const numberOfRooms = 2; // Example value
    const checkInDate = '2024-05-15'; // Example value
    const checkOutDate = '2024-05-20'; // Example value
    const roomPricePerNight = 100; // Example value
    const totalBill = numberOfRooms * roomPricePerNight * 5; // Assuming 5 nights

    return (
        <>
            <AppBar position="fixed">
                <Container maxWidth="xl">
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <Typography variant="h6">
                            Billing Details
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
                    Billing Details
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="billing details table">
                        <TableHead>
                            <TableRow>
                                <TableCell>DETAILS</TableCell>
                                <TableCell align="right">VALUE</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">Number of Rooms</TableCell>
                                <TableCell align="right">{numberOfRooms}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Check-In Date</TableCell>
                                <TableCell align="right">{checkInDate}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Check-Out Date</TableCell>
                                <TableCell align="right">{checkOutDate}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Total Bill</TableCell>
                                <TableCell align="right">${totalBill}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <Button variant="contained" onClick={handleConfirmBooking}>
                    Confirm Booking
                </Button>
            </Container>
        </>
    );
}

export default BillingPage;
