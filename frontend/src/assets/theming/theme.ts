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
                    height: '100vh',
                    margin: 0,
                    background: 'linear-gradient(135deg, #0a0a0f 0%, #1c0b2e 50%, #2a0e4f 100%)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#fff',
                },
            },
        },
    },
});

export default theme;
