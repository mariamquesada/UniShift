import React, { useState } from 'react';
import { Outlet, Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  Star as StarIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  School as SchoolIcon,
  CheckCircle as CheckCircleIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
} from '@mui/icons-material';

const Layout = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 64; // Height of the AppBar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    handleClose();
  };

  const features = [
    {
      icon: <PersonIcon fontSize="large" sx={{ color: '#048A6D' }} />,
      title: 'Personal Approach',
      description: 'We understand each individuals career goals and employers needs',
    },
    {
      icon: <StarIcon fontSize="large" sx={{ color: '#048A6D' }} />,
      title: 'Quality Assurance',
      description: 'Rigorous screening process to ensure the best matches',
    },
    {
      icon: <SecurityIcon fontSize="large" sx={{ color: '#048A6D' }} />,
      title: 'Secure Platform',
      description: 'State-of-the-art security to protect your data and privacy',
    },
    {
      icon: <SpeedIcon fontSize="large" sx={{ color: '#048A6D' }} />,
      title: 'Fast Matching',
      description: 'Advanced algorithms to connect talent with opportunities quickly',
    },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="fixed" sx={{ backgroundColor: '#fff', boxShadow: 1, borderBottom: '2px solid #048A6D' }}>
        <Toolbar>
          <Typography
            variant="h5"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              color: '#048A6D',
              textDecoration: 'none',
              fontWeight: 700,
              '&:hover': {
                color: '#06B48E'
              }
            }}
          >
            UniShift
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', ml: 'auto' }}>
            {isMobile ? (
              <>
                <IconButton
                  size="large"
                  edge="end"
                  sx={{ color: '#048A6D' }}
                  aria-label="menu"
                  onClick={handleMenu}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => scrollToSection('about')} sx={{ color: '#048A6D' }}>
                    About Us
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('how-it-works')} sx={{ color: '#048A6D' }}>
                    How It Works
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('contact')} sx={{ color: '#048A6D' }}>
                    Contact Us
                  </MenuItem>
                  <MenuItem 
                    component={RouterLink} 
                    to="/register"
                    onClick={handleClose}
                    sx={{ color: '#048A6D' }}
                  >
                    Register
                  </MenuItem>
                  <MenuItem 
                    component={RouterLink} 
                    to="/login"
                    onClick={handleClose}
                    sx={{ color: '#048A6D' }}
                  >
                    Login
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  onClick={() => scrollToSection('about')}
                  sx={{ color: '#048A6D' }}
                >
                  About Us
                </Button>
                <Button
                  color="inherit"
                  onClick={() => scrollToSection('how-it-works')}
                  sx={{ color: '#048A6D' }}
                >
                  How It Works
                </Button>
                <Button
                  color="inherit"
                  onClick={() => scrollToSection('contact')}
                  sx={{ color: '#048A6D' }}
                >
                  Contact Us
                </Button>
                <Button
                  variant="outlined"
                  component={RouterLink}
                  to="/register"
                  sx={{
                    color: '#048A6D',
                    borderColor: '#048A6D',
                    '&:hover': {
                      borderColor: '#06B48E',
                      backgroundColor: 'rgba(4, 138, 109, 0.04)'
                    }
                  }}
                >
                  Register
                </Button>
                <Button
                  variant="contained"
                  component={RouterLink}
                  to="/login"
                  sx={{
                    backgroundColor: '#048A6D',
                    '&:hover': {
                      backgroundColor: '#06B48E'
                    }
                  }}
                >
                  Login
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* Spacer for fixed AppBar */}
      
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          textAlign: 'center',
          mb: 6,
          background: 'linear-gradient(135deg, #048A6D 0%, #06B48E 100%)',
        }}
      >
        <Container maxWidth="md">
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontSize: { xs: '2rem', sm: '2.5rem', md: '2.75rem' },
              fontWeight: 600,
              lineHeight: 1.3
            }}
          >
            Bridging Talent And Opportunity - One Event At A Time
          </Typography>
          <Typography variant="h5" paragraph>
            Connecting students and employers through impactful events
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              component={RouterLink}
              to="/employer/register"
              sx={{
                backgroundColor: '#F2B705',
                color: '#000',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                '&:hover': {
                  backgroundColor: '#FFD447'
                }
              }}
            >
              Hire Our Talent
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container component="main" sx={{ mb: 8 }}>
        <Outlet />

        {/* About Us Section */}
        <Box id="about" sx={{ my: 8, textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
            Event Employment Agency for Universities
          </Typography>
          <Typography variant="h6" sx={{ mb: 6, color: 'text.secondary', maxWidth: '800px', mx: 'auto' }}>
            UniShift is a specialized platform connecting university students with event-based employment opportunities, 
            creating meaningful connections between emerging talent and industry-leading employers.
          </Typography>

          {/* Where Are We Section */}
          <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 8, mb: 4 }}>
            Where Are We
          </Typography>
          <Box sx={{ position: 'relative', width: '100%', height: 400, mb: 6 }}>
            <img 
              src="images/map.png" 
              alt="Map of Ireland showing UniShift locations" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'contain' 
              }} 
            />
          </Box>

          {/* Employer Testimonials */}
          <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 8, mb: 4 }}>
            Employer Testimonials
          </Typography>
          <Grid container spacing={4} sx={{ mb: 6 }}>
            {[
              {
                logo: 'images/johnbrady.png',
                name: 'John Brady Events',
                quote: 'UniShift has transformed how we hire for our events. The quality of students and the ease of use is outstanding.'
              },
              {
                logo: 'images/npc.png',
                name: 'National Ploughing Championships',
                quote: 'We have found reliable and enthusiastic student staff through UniShift for all our major events.'
              },
              {
                logo: 'images/distinction.png',
                name: 'Distinction Events',
                quote: 'UniShift provides us with a steady stream of qualified students who bring fresh energy to our events.'
              }
            ].map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box
                  sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                  }}
                >
                  <Box
                    component="img"
                    src={testimonial.logo}
                    alt={`${testimonial.name} logo`}
                    sx={{
                      width: 120,
                      height: 60,
                      objectFit: 'contain',
                      mb: 2
                    }}
                  />
                  <Typography variant="h6" gutterBottom>
                    {testimonial.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                    "{testimonial.quote}"
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* How It Works Section */}
        <Box id="how-it-works">
          <Typography variant="h5" component="h3" gutterBottom sx={{ mb: 4 }}>
            How It Works
          </Typography>
          <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 4,
                height: '100%',
                borderRadius: 2,
                bgcolor: 'background.paper',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: '#048A6D',
                  mb: 3
                }}
              >
                <BusinessIcon /> For Employers
              </Typography>
              <List sx={{ p: 0 }}>
                {[
                  'Create a company profile with all relevant details',
                  'Post job opportunities with detailed requirements',
                  'Review incoming applications from qualified candidates',
                  'Rate and provide feedback on applicants',
                  'Contact promising candidates directly through our platform'
                ].map((text, index) => (
                  <ListItem key={index} sx={{ py: 1, px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircleIcon sx={{ color: '#048A6D' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={text}
                      sx={{ '& .MuiListItemText-primary': { color: 'text.primary' } }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 4,
                height: '100%',
                borderRadius: 2,
                bgcolor: 'background.paper',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: '#048A6D',
                  mb: 3
                }}
              >
                <SchoolIcon /> For Students
              </Typography>
              <List sx={{ p: 0 }}>
                {[
                  'Create a comprehensive professional profile',
                  'Browse event listings with advanced filtering options',
                  'View detailed information about each opportunity',
                  'Apply easily to interesting positions',
                  'Track application status and communicate with employers'
                ].map((text, index) => (
                  <ListItem key={index} sx={{ py: 1, px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircleIcon sx={{ color: '#048A6D' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={text}
                      sx={{ '& .MuiListItemText-primary': { color: 'text.primary' } }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>
        </Grid>
      </Box>

        {/* Features Section */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h3" component="h2" align="center" gutterBottom>
            Why Choose UniShift
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    p: 2,
                  }}
                >
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* Footer */}
      <Box id="contact" component="footer" sx={{ bgcolor: '#f5f5f5', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom sx={{ color: '#048A6D' }}>
                UniShift
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Connecting students with event opportunities.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <IconButton size="small" sx={{ color: '#048A6D' }}>
                  <TwitterIcon />
                </IconButton>
                <IconButton size="small" sx={{ color: '#048A6D' }}>
                  <InstagramIcon />
                </IconButton>
                <IconButton size="small" sx={{ color: '#048A6D' }}>
                  <LinkedInIcon />
                </IconButton>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom>
                For Event Organisers
              </Typography>
              <List sx={{ p: 0 }}>
                <ListItem disablePadding>
                  <ListItemButton component={RouterLink} to="/post-event">
                    <ListItemText primary="Post an Event" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={RouterLink} to="/student-search">
                    <ListItemText primary="Student Search" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={RouterLink} to="/event-management">
                    <ListItemText primary="Event Management" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={RouterLink} to="/pricing">
                    <ListItemText primary="Pricing" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom>
                For Students
              </Typography>
              <List sx={{ p: 0 }}>
                <ListItem disablePadding>
                  <ListItemButton component={RouterLink} to="/browse-events">
                    <ListItemText primary="Browse Events" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={RouterLink} to="/event-resources">
                    <ListItemText primary="Event Resources" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={RouterLink} to="/profile-builder">
                    <ListItemText primary="Profile Builder" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={RouterLink} to="/payment-calculator">
                    <ListItemText primary="Payment Calculator" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom>
                Company
              </Typography>
              <List sx={{ p: 0 }}>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => scrollToSection('about')}>
                    <ListItemText primary="About Us" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={RouterLink} to="/blog">
                    <ListItemText primary="Blog" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={RouterLink} to="/press">
                    <ListItemText primary="Press" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => scrollToSection('contact')}>
                    <ListItemText primary="Contact Us" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, pt: 2, borderTop: 1, borderColor: 'divider' }}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Typography variant="body2" color="text.secondary">
                  © {new Date().getFullYear()} UniShift. All rights reserved.
                </Typography>
              </Grid>
              <Grid item>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Link
                    component={RouterLink}
                    to="/privacy-policy"
                    color="text.secondary"
                    sx={{ textDecoration: 'none' }}
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    component={RouterLink}
                    to="/terms-of-service"
                    color="text.secondary"
                    sx={{ textDecoration: 'none' }}
                  >
                    Terms of Service
                  </Link>
                  <Link
                    component={RouterLink}
                    to="/cookie-policy"
                    color="text.secondary"
                    sx={{ textDecoration: 'none' }}
                  >
                    Cookie Policy
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
