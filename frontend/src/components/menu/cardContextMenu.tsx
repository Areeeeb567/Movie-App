// src/components/MovieContextMenu.tsx
import React, {useEffect, useState} from 'react';
import {
    Menu,
    MenuItem,
    ListItemIcon,
    Snackbar,
    Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { MovieContextMenuProps } from '../../types/types.ts';
import {addToFavourites, addToWatched} from '../../services/library.ts';

import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import CheckIcon from '@mui/icons-material/Check';

const MovieContextMenu: React.FC<MovieContextMenuProps> = ({
                                                               movieId,
                                                               anchorPosition,
                                                               onClose,
                                                           }) => {
    const navigate = useNavigate();

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
    const [isFavourite, setIsFavourite] = useState(false);

    useEffect(() => {
        const favouritesRaw = localStorage.getItem('favourites');
        const favourites: number[] = favouritesRaw ? JSON.parse(favouritesRaw) : [];
        setIsFavourite(favourites.includes(movieId));
    }, [movieId]);

    const handleAddition= async (value: 'favourites' | 'watchedList') =>{
        const userId = localStorage.getItem('userId');
        if (!userId) {
            console.error('User not logged in');
            setSnackbarMessage('You must be logged in to perform this action');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        const favouritesRaw = localStorage.getItem(value);
        const favourites: number[] = favouritesRaw ? JSON.parse(favouritesRaw) : [];

        if (isFavourite) {
            setSnackbarMessage(`Already in ${value}`);
        } else {
            if (value === 'watchedList') {
                await addToWatched(Number(userId), movieId);
            }
            else if (value === 'favourites') {
                await addToFavourites(Number(userId), movieId);
            }
            const updated = [...favourites, movieId];
            localStorage.setItem(value, JSON.stringify(updated));
            setIsFavourite(true);
            setSnackbarMessage(`Added to ${value}`);
        }

        setSnackbarOpen(true);

    }

    return (
        <>
            <Menu
                open={Boolean(anchorPosition)}
                onClose={onClose}
                anchorReference="anchorPosition"
                anchorPosition={
                    anchorPosition !== null
                        ? { top: anchorPosition.mouseY, left: anchorPosition.mouseX }
                        : undefined
                }
            >
                <MenuItem
                    onClick={() => {
                        onClose();
                        navigate(`/movie/${movieId}`);
                    }}
                >
                    <ListItemIcon>
                        <SearchIcon fontSize="small" />
                    </ListItemIcon>
                    Details
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        onClose();
                        handleAddition('watchedList');
                    }}
                >
                    <ListItemIcon>
                        <CheckIcon fontSize="small" />
                    </ListItemIcon>
                    Mark as Watched
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        onClose();
                        handleAddition('favourites')
                    }}
                >
                    <ListItemIcon>
                        <StarIcon fontSize="small" />
                    </ListItemIcon>
                    Add to Favourites
                </MenuItem>
            </Menu>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Alert
                    severity={snackbarSeverity}
                    variant="filled"
                    sx={{
                        bgcolor: (theme) => theme.palette.secondary.light,
                        color: (theme) => theme.palette.text.primary,
                    }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default MovieContextMenu;
