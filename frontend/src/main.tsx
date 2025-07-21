// src/main.tsx
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './assets/theming/theme.ts';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './assets/index.css';

// Render the main application component wrapped in StrictMode and BrowserRouter
ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </BrowserRouter>
    </StrictMode>
);
