import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#048A6D', // Teal green
      light: '#06B48E',
      dark: '#036751',
      contrastText: '#fff',
    },
    secondary: {
      main: '#F2B705', // Complementary gold for CTAs
      light: '#FFD447',
      dark: '#C69404',
      contrastText: '#000',
    },
    background: {
      default: '#f8faf9',
      paper: '#ffffff',
    },
    text: {
      primary: '#2c3e50',
      secondary: '#546e7a',
    },
    action: {
      active: '#048A6D',
      hover: 'rgba(4, 138, 109, 0.04)',
      selected: 'rgba(4, 138, 109, 0.08)',
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '3rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '2.5rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.5rem',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    button: {
      textTransform: 'none', // More modern look without all-caps
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 24px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0,0,0,0.2)',
          },
        },
        outlined: {
          borderColor: '#048A6D',
          '&:hover': {
            borderColor: '#06B48E',
            backgroundColor: 'rgba(4, 138, 109, 0.04)',
          },
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 4px 20px rgba(0,0,0,0.05)',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 1px 10px rgba(0,0,0,0.05)',
        },
      },
      defaultProps: {
        color: 'transparent',
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#048A6D',
          '&:hover': {
            color: '#06B48E',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#048A6D',
          '&:hover': {
            backgroundColor: 'rgba(4, 138, 109, 0.04)',
          },
        },
      },
    },
  },
});

export default theme;
