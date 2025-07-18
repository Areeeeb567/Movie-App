import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1c0b2e',
        },
        secondary: {
            main: '#7a5af5',
        },
        background: {
            default: '#0a0a0f',
            paper: '#1c0b2e',
        },
        text: {
            primary: '#ffffff',
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    margin: 0,
                    paddingTop: '64px', // Adjust for fixed header height
                    background: 'linear-gradient(135deg, #0a0a0f 0%, #1c0b2e 50%, #2a0e4f 100%)',
                    backgroundAttachment: 'fixed',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    color: '#fff',
                    overflowX: 'hidden',
                },
            },
        },
    },
});

export default theme;
