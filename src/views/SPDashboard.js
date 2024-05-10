import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import "./SPDashboard.css";
import userIcon from '../Images/Icons/usericon.jpg';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';

const SPDashboard = () => {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const settings = ['Profile', 'Logout'];
    const history = useHistory(); // useHistory hook for navigation in React Router v5

    const handleLogout = () => {
        localStorage.removeItem('userToken'); // Assuming you store a token named 'userToken'
        history.push('/login'); // Redirect to login page using history.push
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleMenuItemClick = (setting) => {
        handleCloseUserMenu();
        if (setting === 'Logout') {
            handleLogout();
        }
        // Here you can handle other settings like 'Profile'
    };

    return (
        <div className='bagr'>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo">TEMPSTAY</Link>
                    <div className="nav-options">
                        <Link to="/addhotel" className="nav-link" onClick={handleCloseUserMenu}>Add Hotel</Link>
                        <Link to="/viewbookings" className="nav-link" onClick={handleCloseUserMenu}>View Bookings</Link>
                        <Link to="/updatehotel" className="nav-link" onClick={handleCloseUserMenu}>Update Hotel</Link>
                    </div>
                    
                    <Box sx={{ flexGrow: 0, ml: 120 }}>
                        <Tooltip title="Service Provider Settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar src={userIcon} alt="User Icon" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={() => handleMenuItemClick(setting)}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </div>
            </nav>

            <div className="dashboard-content">
                {/* Dashboard content goes here */}
            </div>
        </div>
    );
};

export default SPDashboard;
