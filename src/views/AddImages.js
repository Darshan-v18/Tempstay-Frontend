import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Cookies from 'js-cookie'; // Import Cookies module

const AddImages = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const history = useHistory();

    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData();
            for (let i = 0; i < selectedFiles.length; i++) {
                formData.append('images', selectedFiles[i]); // Use 'images' as the key for file upload
            }

            // Make API request to upload images
            const response = await axios.post('http://localhost:9030/api/uploadimages', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    token: Cookies.get('token'),
                    role: Cookies.get('userType'),
                },
            });

            console.log(response.data); // Log response from API
            // Optionally redirect the user after successful image upload
            history.push('/SPDashboard');
        } catch (error) {
            console.error('Error:', error); // Log any errors
        }
    };

    return (
        <div style={{ paddingTop: '64px' }}> {/* Adjust the top padding to account for the height of the app bar (64px) */}
            <AppBar position="fixed">
                <Container maxWidth="xl">
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <Typography variant="h6">
                            Upload Images
                        </Typography>
                        <Typography variant="h5">
                            TEMPSTAY
                        </Typography>
                        <div></div> {/* This empty div helps to push TEMPSTAY to the center */}
                    </Toolbar>
                </Container>
            </AppBar>
            <div className="flex justify-center items-center h-full">
                <div className="w-full max-w-md">
                    <h1 className="text-center mb-4">Add Images</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input type="file" onChange={handleFileChange} multiple />
                        </div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Upload Images
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddImages;
