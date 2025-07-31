import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieById } from '../services/movie';
import {
    Box,
    Typography,
    Container,
    Chip,
    Stack,
    Avatar,
} from '@mui/material';
import Page from '../templates/page';
import imdbLogo from '../assets/imdb.png';
import {API_ENDPOINTS} from "../constants/apiUrls.ts";
import type {MovieDetail} from '../types/types.ts';

/**
 * MovieDetails component that fetches and displays details of a specific movie.
 * @constructor
 */
const MovieDetails: React.FC = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const [movie, setMovie] = useState<MovieDetail | null>(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const data = await getMovieById(movieId!);
                setMovie(data);
            } catch (err) {
                console.error('Failed to fetch movie details:', err);
            }
        };

        fetchMovie();
    }, [movieId]);

    if (!movie) return null;

    const releaseYear = new Date(movie.release_date).getFullYear();

    return (
        <Page>
            <Box
                sx={{
                    position: 'relative',
                    minHeight: '100vh',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: -12,
                    marginTop: -2,
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${API_ENDPOINTS.MOVIES.POSTER_IMAGE}${movie.backdrop_path})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(2px)',
                        // transform: 'scale(1.1)',
                        zIndex: 0,
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '70%',
                        height: '100%',
                        background: 'linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0))',
                        zIndex: 0,
                    }}
                />

                <Container sx={{ position: 'relative', zIndex: 2, color: 'white', py: 6 }}>
                    <Box maxWidth="md">

                        <Typography variant="h3" fontWeight="bold" gutterBottom>
                            {movie.title}
                        </Typography>

                        <Stack direction="row" alignItems="center" spacing={2} mb={2} sx={{ color: 'lightgray' }}>
                            <Typography variant="body1">{releaseYear}</Typography>
                            <Typography variant="body1">|</Typography>
                            <Typography variant="body1">{movie.runtime} min</Typography>
                            <Typography variant="body1">|</Typography>
                            <Box display="flex" alignItems="center" gap={1}>
                                <Typography variant="body1">{movie.vote_average.toFixed(1)}</Typography>
                                <Avatar src={imdbLogo} alt="IMDb" sx={{ width: 'auto', height: 34 }} />
                            </Box>
                        </Stack>

                        {movie.tagline && (
                            <Typography variant="body1" gutterBottom>
                                {movie.tagline}
                            </Typography>
                        )}
                        <Typography variant="body1" sx={{ color: 'lightgray' }}>
                            {movie.overview}
                        </Typography>

                        <Stack direction="row" spacing={1} flexWrap="wrap" mb={3} mt={2}>
                            {movie.genres?.map((genre) => (
                                <Chip key={genre.id} label={genre.name} />
                            ))}
                        </Stack>

                        {movie.credits?.cast && movie.credits.cast.length > 0 && (
                            <Typography variant="body1" sx={{ mt: 2 }}>
                                <Box component="span" sx={{ color: 'darkgray' }}>Starring: </Box>
                                <Box component="span" sx={{ color: 'white' }}>
                                    {movie.credits.cast.slice(0, 3).map((actor, index) => (
                                        <React.Fragment key={actor.id}>
                                            {actor.name}
                                            {index < 2 && ', '}
                                        </React.Fragment>
                                    ))}
                                </Box>
                            </Typography>
                        )}
                    </Box>
                </Container>
            </Box>
        </Page>
    );
};

export default MovieDetails;
