import React, { useState, useEffect } from 'react';
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
import Carousel from 'react-material-ui-carousel';
import Cookies from 'js-cookie';
import axios from 'axios';
import Rating from 'react-rating';
import Star from '@mui/icons-material/Star';
import StarBorder from '@mui/icons-material/StarBorder';
import ImageCarousel from './ImageCarousel';

const pages = ['View Booking'];
const settings = ['Edit Profile', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [hotels, setHotels] = useState([]);
  const [hotelImages, setHotelImages] = useState({});
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [fetchCount, setFetchCount] = useState(0);


  console.log(Cookies.get("token"));
  console.log(Cookies.get("userType"));

  useEffect(() => {

    fetchHotels();

  }, []);



  const handleSearch = async () => {
    try {
      // Make API request to fetch filtered hotels based on the search query
      const response = await axios.get('http://localhost:9030/api/searchbyaddressandhotelname', {
        headers: {
          searchItem: searchQuery,
        }
      });
      console.log(response.data);
      setFilteredHotels(response.data); // Store fetched filtered data in state
    } catch (error) {
      console.error('Error fetching filtered hotel data:', error);
    }
  };

  const handleSearchClick = () => {
    // Call the handleSearch function when the search button is clicked
    handleSearch();
  };


  const fetchHotelImages = async (hotelIds) => {
    try {
      // Clear previous images
      setHotelImages({});

      const imagePromises = hotelIds.map((id) =>
        axios.get('http://localhost:9030/api/getimagesbyhotelid', {
          headers: { hotelownId: id },
        })
      );

      const imageResponses = await Promise.all(imagePromises);
      const images = imageResponses.reduce((acc, imageResponse, index) => {
        acc[hotelIds[index]] = imageResponse.data;
        return acc;
      }, {});

      console.log('Images:', images);
      setHotelImages(images);
    } catch (error) {
      console.error('Error fetching hotel images:', error);
    }
  };


  const fetchHotels = async () => {
    try {
      // Make API request to fetch hotel data
      const response = await axios.get('http://localhost:9030/api/getallhotels', {
        headers: {
          token: Cookies.get('token'),
          role: Cookies.get('userType'),
        },
      });
      console.log(response.data);
      Cookies.set('ownerID', response.data.id, { expires: 7 });
      setHotels(response.data); // Store fetched data in state

      const hotelIds = response.data.map((hotel) => hotel.id);
      fetchHotelImages(hotelIds);
    } catch (error) {
      console.error('Error fetching hotel data:', error);
    }
  };

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

  const handleMenuItemClick = (setting) => {
    handleCloseUserMenu();
    if (setting === 'Logout') {
      Cookies.remove('token');
      Cookies.remove('userType');
      history.push('/login');
    } else if (setting === 'Edit Profile') {
      history.push('/UserProfile');
    }
  };

  const handleViewBookings = () => {
    nav('/viewbookings'); // Redirect to the ViewBookings page
  };


  const handleBookHotel = async (hotelId) => {
    try {
      // Make API request to fetch hotel data
      const response = await axios.get('http://localhost:9030/api/getallhotels', {
        headers: {
          token: Cookies.get('token'),
          role: Cookies.get('userType'),
        },
      });
      console.log(response.data.id);
      Cookies.set("ownerID", hotelId, { expires: 7 });
      setHotels(response.data); // Store fetched data in state
    } catch (error) {
      console.error('Error fetching hotel data:', error);
    }
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
          <Container maxWidth="2xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 1,
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
                  marginLeft: '2px',
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{ width: '350px', backgroundColor: 'white', mt: '1' }}
                />
                <Button onClick={handleSearchClick} variant="contained" sx={{ ml: 2 }}>
                  Search
                </Button>
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
                    <MenuItem key={setting} onClick={() => handleMenuItemClick(setting)}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Container maxWidth="xl" sx={{ marginTop: '62px', padding: '40px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Explore Hotels
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {(searchQuery === '' ? hotels : filteredHotels).map((hotel) => (
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
                  {hotelImages[hotel.id] && hotelImages[hotel.id].length > 0 && (
                    <ImageCarousel images={hotelImages[hotel.id].map(image => image.imageURL)} />
                  )}

                  <Box sx={{ textAlign: 'left', ml: 4 }}>
                    <Typography variant="h5" component="h3" sx={{ fontSize: '26px', }}>
                      {hotel.hotelName}
                    </Typography>
                    <Typography variant="body1" sx={{ mr: 4, fontSize: '22px', }}>
                      Hotel Address: {hotel.address}
                    </Typography>
                    <Typography variant="body1" sx={{ mr: 4, fontSize: '22px', }}>
                      Rating:
                      <Rating
                        readonly
                        initialRating={hotel.rating}
                        emptySymbol={<StarBorder />}
                        fullSymbol={<Star />}
                      />
                    </Typography>
                    <Typography variant="body1" sx={{ mr: 4, fontSize: '22px', }}>Phone Number: {hotel.phoneNumber}</Typography>
                  </Box>
                </Box>
                <Button variant="contained" onClick={() => handleBookHotel(hotel.id)}>
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
