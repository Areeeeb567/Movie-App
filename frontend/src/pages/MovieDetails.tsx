import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieById } from '../services/movie';
import {
    Box,
    Typography,
    CircularProgress,
    Container,
    Chip,
    Stack,
} from '@mui/material';
import Page from '../templates/page';

interface Genre {
    id: number;
    name: string;
}

interface MovieDetails {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    poster_path: string;
    genres?: Genre[]; // made optional to avoid map crash
    runtime: number;
    vote_average: number;
    tagline: string;
}

const MovieDetails: React.FC = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const data = await getMovieById(movieId!);
                setMovie(data);
            } catch (err) {
                console.error('Failed to fetch movie details:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [movieId]);

    return (
        <Page>
            <Container sx={{ mt: 6 }}>
                {loading ? (
                    <Box display="flex" justifyContent="center" mt={10}>
                        <CircularProgress />
                    </Box>
                ) : !movie ? (
                    <Typography color="error" align="center" mt={10}>
                        Movie not found.
                    </Typography>
                ) : (
                    <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
                        <Box
                            component="img"
                            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                            alt={movie.title}
                            sx={{
                                width: { xs: '100%', md: 300 },
                                borderRadius: 2,
                            }}
                        />

                        <Box>
                            <Typography variant="h4" fontWeight="bold" gutterBottom>
                                {movie.title}
                            </Typography>

                            {movie.tagline && (
                                <Typography variant="subtitle1" fontStyle="italic" gutterBottom>
                                    {movie.tagline}
                                </Typography>
                            )}

                            <Typography variant="body1" paragraph>
                                {movie.overview}
                            </Typography>

                            <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
                                {movie.genres?.map((genre) => (
                                    <Chip key={genre.id} label={genre.name} color="primary" variant="outlined" />
                                ))}
                            </Stack>

                            <Typography variant="body2">
                                <strong>Release Date:</strong> {movie.release_date}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Runtime:</strong> {movie.runtime} min
                            </Typography>
                            <Typography variant="body2">
                                <strong>Rating:</strong> {movie.vote_average} / 10
                            </Typography>
                        </Box>
                    </Box>
                )}
            </Container>
        </Page>
    );
};

export default MovieDetails;