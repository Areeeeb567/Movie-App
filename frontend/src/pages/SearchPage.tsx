import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { searchMovies } from '../services/movie';
import {
    Box,
    Typography,
    Grid,
    Button,
} from '@mui/material';
import Page from '../templates/page';
import MovieCard from '../components/card/card';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import type { Movie } from '../types/types';

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchPage: React.FC = () => {
    const query = useQuery().get('q') || '';
    const [results, setResults] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);

    const fetchResults = async (pageToLoad = 1) => {
        try {
            const data = await searchMovies(query, pageToLoad);
            if (pageToLoad === 1) {
                setResults(data.results || []);
            } else {
                setResults((prev) => [...prev, ...data.results]);
            }
            setPage(data.page);
            setTotalPages(data.total_pages);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    useEffect(() => {
        if (query.trim()) {
            fetchResults(1);
        }
    }, [query]);

    const handleLoadMore = () => {
        setLoadingMore(true);
        fetchResults(page + 1).finally(() => setLoadingMore(false));
    };

    return (
        <Page>
            <Box sx={{ px: 3 }}>
                <Typography variant="h4" sx={{ mb: 3, mt: 2 }}>
                    Search Results for "{query}"
                </Typography>

                {results.length === 0 ? (
                    <Typography>No results found.</Typography>
                ) : (
                    <>
                        <Grid container spacing={2}>
                            {results.map((movie: Movie) => (
                                <MovieCard
                                    key={movie.id}
                                    id={movie.id}
                                    title={movie.title}
                                    posterPath={movie.poster_path}
                                />
                            ))}
                        </Grid>

                        {page < totalPages && (
                            <Box sx={{ textAlign: 'center', mt: 4, mb: 8 }}>
                                <Button
                                    onClick={handleLoadMore}
                                    disabled={loadingMore}
                                    variant="contained"
                                    sx={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: '50%',
                                        minWidth: 'auto',
                                        backgroundColor: 'secondary.light',
                                        opacity: 0.85,
                                        '&:hover': {
                                            backgroundColor: 'primary.dark',
                                            opacity: 1,
                                        },
                                    }}
                                >
                                    <KeyboardArrowDownOutlinedIcon />
                                </Button>
                            </Box>
                        )}
                    </>
                )}
            </Box>
        </Page>
    );
};

export default SearchPage;
