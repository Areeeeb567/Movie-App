import React, { useEffect, useState } from 'react';
import { Box, Typography, Skeleton } from '@mui/material';
import MovieCard from '../../card/card';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
}

interface MovieRowProps {
    title: string;
    fetchFunction: () => Promise<{ results: Movie[] }>;
}

const MovieRow: React.FC<MovieRowProps> = ({ title, fetchFunction }) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchFunction();
                setMovies(response.results || []);
            } catch (err) {
                console.error(`Failed to fetch movies for ${title}`, err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [fetchFunction, title]);

    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 1, ml: 1 }}>
                {title}
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    overflowX: 'auto',
                    gap: 5,
                    px: 1,
                    pb: 1,
                    scrollBehavior: 'smooth',

                    // Hide scrollbar cross-browser
                    scrollbarWidth: 'none', // Firefox
                    msOverflowStyle: 'none', // IE/Edge
                    '&::-webkit-scrollbar': {
                        display: 'none', // Chrome/Safari
                    },
                }}
            >
                {loading
                    ? Array.from({ length: 6 }).map((_, index) => (
                        <Box
                            key={index}
                            sx={{
                                flex: '0 0 auto',
                                width: 160,
                            }}
                        >
                            <Skeleton
                                variant="rectangular"
                                width={160}
                                height={240}
                                sx={{ borderRadius: 2 }}
                            />
                            <Skeleton
                                variant="text"
                                width="100%"
                                sx={{ mt: 1 }}
                            />
                        </Box>
                    ))
                    : movies.map((movie) => (
                        <Box
                            key={movie.id}
                            sx={{
                                flex: '0 0 auto',
                                width: 160,
                            }}
                        >
                            <MovieCard
                                id={movie.id}
                                title={movie.title}
                                posterPath={movie.poster_path}
                            />
                        </Box>
                    ))}
            </Box>
        </Box>
    );
};

export default MovieRow;
