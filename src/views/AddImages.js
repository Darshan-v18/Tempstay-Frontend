import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Cookies from 'js-cookie'; // Import Cookies module
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
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
            const response = await axios.post('http://65.1.134.250:9030/api/uploadimages', formData, {
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


    const handleBack = () => {
        window.history.back();
    };

    return (
        <div style={{ paddingTop: '64px' }}> {/* Adjust the top padding to account for the height of the app bar (64px) */}
            <AppBar position="fixed">
                <Toolbar>
                    <button
                        onClick={handleBack}
                        className="absolute left-4 text-white text-xl font-medium focus:outline-none hover:text-indigo-500 hover:scale-110 transition duration-200"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                        Add Images
                    </Typography>
                    <Typography variant="h5" >
                        TEMPSTAY
                    </Typography>
                    <div></div>
                </Toolbar>
            </AppBar>
            <div className="flex justify-center items-center h-full">
                <div className="w-full max-w-md">
                    {/* <h1 className="text-center mb-4">Add Images</h1> */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 file-input-container">
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
