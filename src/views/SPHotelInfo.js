// ServiceProviderHotelInfo.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ServiceProviderHotelInfo = () => {
    const [roomDetails, setRoomDetails] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [price, setNewPrice] = useState('');
    const [numberOfRoom, setNewNumberOfRooms] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

    useEffect(() => {
        fetchRoomDetails();
    }, []);

    const fetchRoomDetails = async () => {
        try {
            const response = await axios.get('http://65.1.134.250:9030/api/getdetails', {
                headers: {
                    token: Cookies.get("token"),
                    role: Cookies.get("userType"),
                }
            });
            console.log(response.data);
            setRoomDetails(response.data);
        } catch (error) {
            console.error('Error fetching room details:', error);
        }
    };


    const handleEditRoom = (room) => {
        setSelectedRoom(room);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setNewPrice('');
        setNewNumberOfRooms('');
        setSelectedRoom(null);
    };
    const handleSaveChanges = async () => {
        try {
            console.log("price", price, "numberOfRoom", numberOfRoom);
            console.log("selectedRoom", selectedRoom.roomId);
            // Make API call to update room details
            await axios.put('http://65.1.134.250:9030/api/updatehoteldetails', {
                price,
                numberOfRoom
            }, {
                headers: {
                    roomId: selectedRoom.roomId,
                }
            });
            // Close dialog and reset state
            handleCloseDialog();
            // Refresh room details
            fetchRoomDetails();
            setOpenSuccessDialog(true);
        } catch (error) {
            console.error('Error updating room details:', error);
        }
    };

    const handleCloseSuccessDialog = () => {
        setOpenSuccessDialog(false);
    };


    const handleBack = () => {
        window.history.back();
    };



    return (
        <div>
            <AppBar position="fixed">
                <Toolbar>
                    <button
                        onClick={handleBack}
                        className="absolute left-4 text-white text-xl font-medium focus:outline-none hover:text-indigo-500 hover:scale-110 transition duration-200"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                        Update Hotel
                    </Typography>
                    <Typography variant="h5" >
                        TEMPSTAY
                    </Typography>
                    <div></div>
                </Toolbar>
            </AppBar>
            {roomDetails.map((room, index) => (
                <Container key={index} maxWidth="md" sx={{ marginTop: '80px', padding: '20px', backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <Typography variant="h4" component="h2" gutterBottom>
                            Room Details
                        </Typography>
                        <Typography variant="h6" component="h3">{room.roomType} Room</Typography>
                        <Typography variant="body1">Price: {room.pricePerDay}</Typography>
                        <Typography variant="body1">Number of Rooms: {room.numberOfRooms}</Typography>
                    </div>
                    <Button variant="outlined" color="primary" onClick={() => handleEditRoom(room)}>Edit Room</Button>
                </Container>
            ))}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Edit Room</DialogTitle>
                <DialogContent>
                    <TextField
                        label="New Price"
                        type="number"
                        value={price}
                        onChange={(e) => setNewPrice(e.target.value)}
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        fullWidth
                        label="New Number of Rooms"
                        type="number"
                        value={numberOfRoom}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value === '' && e.nativeEvent.inputType === 'deleteContentBackward') {
                                setNewNumberOfRooms('');
                            } else {
                                const intValue = parseInt(value);
                                if (!isNaN(intValue) && intValue >= 1) {
                                    setNewNumberOfRooms(intValue);
                                } else {
                                    setNewNumberOfRooms('');
                                }
                            }
                        }}
                        variant="outlined"
                        sx={{ mb: 2 }}
                    />
                    {/* <TextField
                        label="New Number of Rooms"
                        type="number"
                        value={numberOfRoom}
                        onChange={(e) => setNewNumberOfRooms(e.target.value)}
                        fullWidth
                        margin="normal"
                    /> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleSaveChanges} variant="contained" color="primary">Save Changes</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openSuccessDialog} onClose={handleCloseSuccessDialog}>
                <DialogTitle>Success</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">Hotel updated successfully!</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSuccessDialog} color="primary">OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ServiceProviderHotelInfo;
