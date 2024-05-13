import React from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import AdbIcon from '@mui/icons-material/Adb';
import ViewBookings from './ViewBooking';
import BookHotel from './BookHotel';
import Cookies from 'js-cookie';

const pages = ['View Booking'];
const settings = ['Profile', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const history = useHistory();

  const nav = (path) => {
    // Your navigation logic here
    window.location.href = path;
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    history.push('/login');
  };


  const handleViewBookings = () => {
    nav('/viewbookings'); // Redirect to the ViewBookings page
  };
  
  // Sample hotel data
  const hotels = [
    {
      id: 1,
      name: 'Luxury Hotel',
      roomType: 'Deluxe',
      numberOfRooms: 5,
      price: 200,
      image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      backgroundColor: '#f0f0f0',
    },
    {
      id: 2,
      name: 'Cozy Inn',
      roomType: 'Standard',
      numberOfRooms: 10,
      price: 100,
      image: 'https://images.pexels.com/photos/53464/sheraton-palace-hotel-lobby-architecture-san-francisco-53464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      backgroundColor: '#e0e0e0',
    },
    // Add more hotel data as needed
  ];

  const handleBookHotel = () => {
    nav('/bookhotel');
  };

 
  return (
    <Box
      sx={{
        backgroundImage: 'url("https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg")', // Replace with the actual path to your background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <AppBar position="fixed">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                TEMPSTAY
              </Typography>
              <Box
                sx={{
                  backgroundColor: 'black',
                  color: 'white',
                  padding: '4px',
                  marginLeft: '3px',
                  borderRadius: '5px',
                }}
              >
                USER DASHBOARD
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                LOGO
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}><Button onClick={handleViewBookings} color="inherit">
                View Booking
              </Button>
              </Box>

              {/* Search Bar */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginRight: '30rem',
                  backgroundColor: 'white',
                  borderRadius: '4px',
                  padding: '2px',
                }}
              >
                <TextField
                  id="search"
                  label="Search Hotels"
                  variant="outlined"
                  size="small"
                  sx={{ width: '350px', backgroundColor: 'white' }}
                />
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                    <MenuItem key={setting} onClick={setting === 'Logout' ? handleLogout : handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Container maxWidth="md" sx={{ marginTop: '80px', padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Explore Hotels
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {hotels.map((hotel) => (
              <Box
                key={hotel.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  bgcolor: hotel.backgroundColor,
                  padding: '10px',
                  marginBottom: '10px',
                }}
              >
                <Box display="flex" alignItems="center">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    width={100}
                    height={100}
                    style={{ marginRight: '20px', borderRadius: '5px' }}
                  />
                  <Box>
                    <Typography variant="h6" component="h3">
                      {hotel.name}
                    </Typography>
                    <Typography variant="body1" sx={{ mr: 4 }}>
                      Room Type: {hotel.roomType}
                    </Typography>
                    <Typography variant="body1" sx={{ mr: 4 }}>
                      Number of Rooms: {hotel.numberOfRooms}
                    </Typography>
                    <Typography variant="body1">Price: ${hotel.price}</Typography>
                  </Box>
                </Box>
                <Button variant="contained" onClick={() => handleBookHotel()}>
                  Book Hotel
                </Button>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default ResponsiveAppBar;
