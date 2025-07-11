import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
            light: '#42a5f5',
            dark: '#1565c0',
            contrastText: '#fff'
        },
        secondary: {
            main: '#dc004e',
            light: '#ff3366',
            dark: '#9a0036',
            contrastText: '#fff'
        },
        background: {
            default: '#f4f6f8',
            paper: '#ffffff'
        }
    },
    typography: {
        fontFamily: 'Helvetica, Arial, sans-serif',
        h4: {
            fontWeight: 600,
            fontSize: '1.8rem',
            '@media (min-width:600px)' : {
                fontSize: '2.2rem'
            }
        },
        body1: {
            fontSize: '1rem'
        }
    }
});

export default theme;
