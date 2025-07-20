import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Box,
    InputBase,
    alpha,
} from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';

const Header: React.FC = () => {
    const theme = useTheme();
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                background: 'transparent',
                borderBottom: 'none',
                backdropFilter: 'blur(4px)',
            }}
        >
            <Toolbar sx={{ position: 'relative', height: '64px' }}>
                <MovieIcon sx={{ fontSize: 35, color: 'white' , marginLeft: -0.7}} />

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
                        height: '43px',
                        maxWidth: 400,
                    }}
                >
                    <SearchIcon sx={{ color: 'white', mr: 2 }} />
                    <InputBase
                        placeholder="Search…"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyPress}
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
