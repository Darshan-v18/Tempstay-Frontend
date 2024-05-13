// ViewHotels.js

import React from 'react';
import './viewBookings.css'; // Import CSS file for styling
import Hotel1 from '../Images/Hotel1.jpg';
import Hotel2 from '../Images/Hotel2.jpg';

const ViewHotels = () => {
    // Sample hotel data
    const hotels = [
        { name: 'Hotel A', location: 'City A', type: 'Luxury', price: '$200', image: Hotel1 },
        { name: 'Hotel B', location: 'City B', type: 'Budget', price: '$100', image: Hotel2 },
        // Add more hotel data as needed
    ];

    return (
        <div className="hotels-container">
            <ul className="hotel-list">
                {hotels.map((hotel, index) => (
                    <li key={index} className="hotel-item">
                        <div className="hotel-info">
                            <div className="hotel-image">
                                <img src={hotel.image} alt={hotel.name} />
                            </div>
                            <div className="hotel-details">
                                <strong>{hotel.name}</strong>
                                <p>Location: {hotel.location}</p>
                                <p>Type: {hotel.type}</p>
                                <p>Price: <span className="price">{hotel.price}</span></p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewHotels;
