import React from 'react';
import {
    AppBar,
    Toolbar,
    Box,
    InputBase,
    alpha
} from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';

const Header: React.FC = () => {
    const theme = useTheme();

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                background: 'transparent',
                borderBottom: 'none',
                backdropFilter: 'blur(4px)', // Optional subtle blur
            }}
        >
            <Toolbar sx={{ position: 'relative', height: '64px' }}>
                <MovieIcon sx={{ fontSize: 30, color: 'white' }} />

                <Box
                    sx={{
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                        paddingX: 1.5,
                        borderRadius: theme.shape.borderRadius,
                        width: '100%',
                        height: '38px',
                        maxWidth: 400,
                    }}
                >
                    <SearchIcon sx={{ color: 'white', mr: 2 }} />
                    <InputBase
                        placeholder="Search…"
                        fullWidth
                        sx={{
                            color: 'white',
                            '& input::placeholder': {
                                color: 'gray',
                            },
                        }}
                    />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
