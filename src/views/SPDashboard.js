import React, { useState } from 'react';
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
import Cookies from "js-cookie";

const SPDashboard = () => {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const settings = ['Edit Profile', 'Logout'];
    const history = useHistory();

    console.log(Cookies.get("userType"))
    console.log(Cookies.get("token"))
    console.log(Cookies.get("email"))

    const handleLogout = () => {
        Cookies.remove("userType");
        Cookies.remove("token");
        Cookies.remove("email");
        history.push('/login');
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
        } else if (setting === 'Profile') {
            history.push('/SPprofile');
        }
    };

    return (
        <div className='bagr'>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/SPDashboard" className="navbar-logo">TEMPSTAY</Link>
                    <div className="nav-options">
                        <Link to="/addhotel" className="nav-link" onClick={handleCloseUserMenu}>Add Hotel</Link>
                        <Link to="/viewSPHotel" className="nav-link" onClick={handleCloseUserMenu}>View Bookings</Link>
                        <Link to="/hotelInfo" className="nav-link" onClick={handleCloseUserMenu}>Update Hotel</Link>
                        <Link to="/addimages" className="nav-link" onClick={handleCloseUserMenu}>Add Images</Link> {/* New Link */}
                    </div>

                    <Box sx={{ flexGrow: 0, ml: 100 }}>
                        <Tooltip title="User Settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar src={userIcon} alt="User Icon" />
                            </IconButton>
                        </Tooltip >
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
