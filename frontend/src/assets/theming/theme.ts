import {createTheme} from "@mui/material";

export const themePalettes = {
    purple: {
        primary: { main: '#1c0b2e' },
        secondary: { main: '#7a5af5', light: '#3c2890' },
        background: {
            default: '#0a0a0f',
            paper: '#1c0b2e',
            gradient: 'linear-gradient(135deg, #0a0a0f 0%, #1c0b2e 50%, #2a0e4f 100%)',
        },
        text: { primary: '#ffffff' },
    },
    blue: {
        primary: { main: '#0a3d62' },
        secondary: { main: '#3c6382', light: '#60a3bc' },
        background: {
            default: '#081c24',
            paper: '#0b2545',
            gradient: 'linear-gradient(135deg, #081c24 0%, #0b2545 50%, #0e3a5e 100%)',
        },
        text: { primary: '#ffffff' },
    },
    crimson: {
        primary: { main: '#7b1e3b' },
        secondary: { main: '#ff7e79', light: '#ffa1a1' },
        background: {
            default: '#1a0a0f',
            paper: '#330d1a',
            gradient: 'linear-gradient(135deg, #1a0a0f 0%, #330d1a 50%, #7b1e3b 100%)',
        },
        text: { primary: '#fff1f1' },
    },
};

export const createDynamicTheme = (paletteConfig: typeof themePalettes.purple) =>
    createTheme({
        palette: {
            mode: 'dark',
            ...paletteConfig,
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        margin: 0,
                        paddingTop: '64px',
                        background: paletteConfig.background.gradient,
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

const defaultTheme = createDynamicTheme(themePalettes.crimson);
export default defaultTheme;
