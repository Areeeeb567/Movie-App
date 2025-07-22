import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { searchMovies } from '../services/movie';
import { Box, Typography, Grid } from '@mui/material';
import Page from '../templates/page';
import MovieCard from '../components/card/card';
import type { Movie } from '../types/types';

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchPage: React.FC = () => {
    const query = useQuery().get('q') || '';
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const data = await searchMovies(query);
                setResults(data.results || []);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        if (query.trim()) {
            fetchResults();
        }
    }, [query]);

    return (
        <Page>
            <Box sx={{ px: 3 }}>
                <Typography variant="h4" sx={{ mb: 3, mt: 2 }}>
                    Search Results for "{query}"
                </Typography>

                {results.length === 0 ? (
                    <Typography>No results found.</Typography>
                ) : (
                    <Grid container spacing={2}>
                        {results.map((movie: Movie) => (
                            <MovieCard
                                id={movie.id}
                                title={movie.title}
                                posterPath={movie.poster_path}
                            />
                        ))}
                    </Grid>
                )}
            </Box>
        </Page>
    );
};

export default SearchPage;
