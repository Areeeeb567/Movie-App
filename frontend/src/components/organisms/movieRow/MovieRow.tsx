// src/components/organisms/movieRow/MovieRow.tsx

import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import MovieCard from '../../card/card'; // Adjusted path

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchFunction();
                setMovies(response.results || []);
            } catch (err) {
                console.error(`Failed to fetch movies for ${title}`, err);
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
                    gap: 2,
                    px: 1,
                    pb: 1,
                    '&::-webkit-scrollbar': { height: '8px' },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#555',
                        borderRadius: '4px',
                    },
                    scrollBehavior: 'smooth',
                }}
            >
                {movies.map((movie) => (
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
