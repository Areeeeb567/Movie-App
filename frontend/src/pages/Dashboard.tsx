// src/pages/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Tabs,
    Tab,
    Divider,
    Paper,
    Button,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@mui/material';
import Page from '../templates/page';
import api from '../services/api';
import type { User } from '../types/types';
import { useNavigate } from 'react-router-dom';
import {createDynamicTheme, themePalettes} from "../assets/theming/theme.ts";

const Dashboard = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();
    // const [errorOpen, setErrorOpen] = useState(false);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('favourites');
        localStorage.removeItem('watchedList');
        navigate('/login');
    };

    useEffect(() => {
        api.get('/dashboard')
            .then(res => {
                setUser(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    function handleClick(event: React.ChangeEvent<HTMLInputElement>) {
        const selectedColor = event.target.value;
        createDynamicTheme(themePalettes[selectedColor as keyof typeof themePalettes]);
    }

    return (
        <Page>
            <Box sx={{ px: 3 }}>
                <Typography variant="h4" sx={{ mt: 2, mb: 3 }}>
                    Dashboard
                </Typography>

                <Tabs
                    value={tabIndex}
                    onChange={handleTabChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                    sx={{
                        mb: 4,
                        '& .MuiTabs-indicator': { height: 3 },
                        '& .MuiTab-root:focus': { outline: 'none' },
                    }}
                >
                    <Tab label="Profile" sx={{ textTransform: 'none' }} disableRipple />
                    <Tab label="Settings" sx={{ textTransform: 'none' }} disableRipple />
                </Tabs>

                {tabIndex === 0 && user && (
                    <Paper elevation={2} sx={{ p: 3, maxWidth: 500 }}>
                        <Typography variant="h6" gutterBottom>
                            Profile Information
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        <Box sx={{ mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                                Username
                            </Typography>
                            <Typography variant="body1">{user.username}</Typography>
                        </Box>

                        <Box sx={{ mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                                Email
                            </Typography>
                            <Typography variant="body1">{user.email}</Typography>
                        </Box>

                        <Box>
                            <Typography variant="body2" color="text.secondary">
                                Phone Number
                            </Typography>
                            <Typography variant="body1">{user.phoneNumber}</Typography>
                        </Box>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleLogout}
                            sx={{ mt: 3, textTransform: 'none' }}
                        >
                            Sign Out
                        </Button>
                    </Paper>

                )}

                {tabIndex === 1 && (
                    <Box>
                        {/* Settings content will go here */}
                        <Typography variant={'h6'}>Choose Theme</Typography>
                        <RadioGroup defaultValue="purple" onChange={handleClick}>
                            <FormControlLabel
                                value="purple"
                                control={
                                    <Radio sx={{ color: '#7a5af5', '&.Mui-checked': { color: '#7a5af5' },}}/>
                                }
                                label="Purple"
                            />
                            <FormControlLabel
                                value="crimson"
                                control={
                                    <Radio
                                        sx={{
                                            color: '#dc143c',
                                            '&.Mui-checked': { color: '#dc143c' },
                                        }}
                                    />
                                }
                                label="Crimson"
                            />
                            <FormControlLabel
                                value="blue"
                                control={
                                    <Radio
                                        sx={{
                                            color: '#1e90ff',
                                            '&.Mui-checked': { color: '#1e90ff' },
                                        }}
                                    />
                                }
                                label="Blue"
                            />
                        </RadioGroup>

                    </Box>
                )}
            </Box>
        </Page>
    );
};

export default Dashboard;
