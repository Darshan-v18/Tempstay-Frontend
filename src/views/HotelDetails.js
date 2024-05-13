import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const HotelDetails = ({ name, roomType, numberOfRooms, price, onBook }) => {
  return (
    <Card sx={{ minWidth: 275, margin: '10px', padding: '10px' }}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Room Type: {roomType}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Number of Rooms: {numberOfRooms}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Price: {price}
        </Typography>
        <Button onClick={onBook} variant="contained" color="primary">
          Book Hotel
        </Button>
      </CardContent>
    </Card>
  );
};

export default HotelDetails;
