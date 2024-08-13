import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F5DEB3',
    },
    secondary: {
      main: '#37474F',
    },
    background: {
      default: '#ECEFF1',
      paper: '#CFD8DC',
    },
    text: {
      primary: '#212121',
    },
  },
  typography: {
    fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontFamily: '"Raleway", "sans-serif"',
    },
  },
});

export default theme;
