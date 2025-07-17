import React from 'react';
import {
    Drawer,
    Tooltip,
    IconButton,
    Box,
    Stack,
} from '@mui/material';

import { useNavigate, useLocation } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';

const drawerWidth = 72;

const navItems = [
    { icon: <HomeIcon />, label: 'Home', route: '/' },
    { icon: <ExploreIcon />, label: 'Discover', route: '/trending' },
];

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    background: 'transparent',
                    borderRight: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    paddingTop: '1rem',
                    top: '64px',
                    height: 'calc(100% - 64px)',
                    position: 'fixed',
                },
            }}
        >            <Box>
                <Stack spacing={2}>
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.route;
                        return (
                            <Tooltip key={item.label} title={item.label} placement="right">
                                <IconButton
                                    onClick={() => navigate(item.route)}
                                    sx={{
                                        color: (theme) =>
                                            isActive ? theme.palette.secondary.main : theme.palette.text.primary,
                                        backgroundColor: 'transparent',
                                        borderRadius: 2,
                                        '&:hover': {
                                            backgroundColor: 'rgba(255,255,255,0.1)',
                                        },
                                        width: 48,
                                        height: 48,
                                        marginX: 'auto',
                                    }}
                                >
                                    {item.icon}
                                </IconButton>
                            </Tooltip>
                        );
                    })}
                </Stack>
            </Box>
        </Drawer>
    );
};

export default Navbar;
