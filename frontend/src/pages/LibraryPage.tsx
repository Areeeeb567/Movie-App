// src/pages/LibraryPage.tsx

import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Tabs,
    Tab,
} from '@mui/material';
import Page from '../templates/page';
import MovieCard from '../components/card/card';
import { getMovieById } from '../services/movie';
import type { MovieDetail } from '../types/types';

const LibraryPage: React.FC = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [favouriteMovies, setFavouriteMovies] = useState<MovieDetail[]>([]);
    const [watchedMovies, setWatchedMovies] = useState<MovieDetail[]>([]);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    const fetchMovies = async () => {
        const favIds = JSON.parse(localStorage.getItem('favourites') || '[]');
        const watchedIds = JSON.parse(localStorage.getItem('watched') || '[]');

        try {
            const favs = await Promise.all(
                favIds.map((id: number) => getMovieById(id.toString()))
            );
            const watched = await Promise.all(
                watchedIds.map((id: number) => getMovieById(id.toString()))
            );
            setFavouriteMovies(favs);
            setWatchedMovies(watched);
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <Page>
            <Box sx={{ px: 3 }}>
                <Typography variant="h4" sx={{ mt: 2, mb: 3 }}>
                    My Library
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
                    <Tab label="Favourites" sx={{ textTransform: 'none' }} disableRipple />
                    <Tab label="Watched" sx={{ textTransform: 'none' }} disableRipple />
                </Tabs>

                {tabIndex === 0 && (
                    favouriteMovies.length === 0 ? (
                        <Typography>No favourite movies yet.</Typography>
                    ) : (
                        <Grid container spacing={2}>
                            {favouriteMovies.map((movie) => (
                                <MovieCard
                                    key={movie.id}
                                    id={movie.id}
                                    title={movie.title}
                                    posterPath={movie.poster_path}
                                />
                            ))}
                        </Grid>
                    )
                )}

                {tabIndex === 1 && (
                    watchedMovies.length === 0 ? (
                        <Typography>No watched movies yet.</Typography>
                    ) : (
                        <Grid container spacing={2}>
                            {watchedMovies.map((movie) => (
                                <MovieCard
                                    key={movie.id}
                                    id={movie.id}
                                    title={movie.title}
                                    posterPath={movie.poster_path}
                                />
                            ))}
                        </Grid>
                    )
                )}
            </Box>
        </Page>
    );
};

export default LibraryPage;
