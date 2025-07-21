import { createTheme } from '@mui/material/styles';

/**
 * Theme configuration for the application.
 */
const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1c0b2e',
        },
        secondary: {
            main: '#7a5af5',
            light: '#3c2890',
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
                    paddingTop: '64px',
                    background: 'linear-gradient(135deg, #0a0a0f 0%, #1c0b2e 50%, #2a0e4f 100%)',
                    backgroundAttachment: 'fixed',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    overflowX: 'hidden',
                },
            },
        },
    },
});

export default theme;
