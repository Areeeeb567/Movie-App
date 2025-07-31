import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';
import { addToFavourites, removeFromFavourites } from '../../../services/library.ts';
import type { FavouriteButtonProps } from '../../../types/types.ts';

/**
 * FavouriteButton component that allows users to toggle a movie as favourite.
 * @param movieId
 * @constructor
 */
const FavouriteButton: React.FC<FavouriteButtonProps> = ({ movieId }) => {
    const [isFavourite, setIsFavourite] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
    const theme = useTheme();

    useEffect(() => {
        const favouritesRaw = localStorage.getItem('favourites');
        const favourites: number[] = favouritesRaw ? JSON.parse(favouritesRaw) : [];
        setIsFavourite(favourites.includes(movieId));
    }, [movieId]);

    const handleToggleFavourite = async () => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            console.error('User not logged in');
            setSnackbarMessage('You must be logged in to perform this action');
            setSnackbarSeverity('error'); // add this line
            setSnackbarOpen(true);
            return;
        }

        const favouritesRaw = localStorage.getItem('favourites');
        const favourites: number[] = favouritesRaw ? JSON.parse(favouritesRaw) : [];

        if (isFavourite) {
            await removeFromFavourites(userId, movieId);
            const updated = favourites.filter((id) => id !== movieId);
            localStorage.setItem('favourites', JSON.stringify(updated));
            setIsFavourite(false);
            setSnackbarMessage('Removed from favourites');
        } else {
            await addToFavourites(Number(userId), movieId);
            const updated = [...favourites, movieId];
            localStorage.setItem('favourites', JSON.stringify(updated));
            setIsFavourite(true);
            setSnackbarMessage('Added to favourites');
        }

        setSnackbarOpen(true);
    };

    return (
        <>
            <IconButton
                onClick={(e) => {
                    e.stopPropagation();
                    handleToggleFavourite();
                }}
                aria-label="toggle favourite"
                sx={{ '&:focus': { outline: 'none',},}}
            >
                {isFavourite ? (
                    <FavoriteIcon sx={{ color: theme.palette.secondary.light }} />
                ) : (
                    <FavoriteBorderIcon sx={{ color: theme.palette.secondary.light }} />
                )}
            </IconButton>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)} // only auto-close after timeout
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Alert
                    severity={snackbarSeverity}
                    variant="filled"
                    sx={{
                        bgcolor: theme.palette.secondary.light,
                        color: theme.palette.text.primary,
                    }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>

        </>
    );
};

export default FavouriteButton;
