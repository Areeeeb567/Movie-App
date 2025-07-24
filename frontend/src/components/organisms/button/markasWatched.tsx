import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';
import { addToWatched, removeFromWatched } from '../../../services/library.ts'; // adjust path

interface WatchedButtonProps {
    movieId: number;
}

const WatchedButton: React.FC<WatchedButtonProps> = ({ movieId }) => {
    const [isWatched, setIsWatched] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
    const theme = useTheme();

    useEffect(() => {
        const watchedRaw = localStorage.getItem('watchedList');
        const watched: number[] = watchedRaw ? JSON.parse(watchedRaw) : [];
        setIsWatched(watched.includes(movieId));
    }, [movieId]);

    const handleToggleWatched = async () => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            console.error('User not logged in');
            setSnackbarMessage('You must be logged in to perform this action');
            setSnackbarSeverity('error'); // add this line
            setSnackbarOpen(true);
            return;
        }

        const watchedRaw = localStorage.getItem('watchedList');
        const watched: number[] = watchedRaw ? JSON.parse(watchedRaw) : [];

        if (isWatched) {
            await removeFromWatched(userId, movieId);
            const updated = watched.filter((id) => id !== movieId);
            localStorage.setItem('watchedList', JSON.stringify(updated));
            setIsWatched(false);
            setSnackbarMessage('Marked as unwatched');
        } else {
            await addToWatched(Number(userId), movieId);
            const updated = [...watched, movieId];
            localStorage.setItem('watchedList', JSON.stringify(updated));
            setIsWatched(true);
            setSnackbarMessage('Marked as watched');
        }

        setSnackbarOpen(true);
    };

    return (
        <>
            <IconButton
                onClick={(e) => {
                    e.stopPropagation();
                    handleToggleWatched();
                }}
                aria-label="toggle watched"
                sx={{ '&:focus': { outline: 'none' } }}
            >
                {isWatched ? (
                    <CheckCircleIcon sx={{ color: theme.palette.secondary.light }} />
                ) : (
                    <CheckCircleOutlineIcon sx={{ color: theme.palette.secondary.light }} />
                )}
            </IconButton>

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

export default WatchedButton;
