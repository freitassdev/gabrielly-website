import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#0379F0',
    },
    secondary: {
      main: '#02E8FF',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
