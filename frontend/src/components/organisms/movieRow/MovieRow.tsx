import React, { useEffect, useState } from 'react';
import { Box, Typography, Skeleton, Button } from '@mui/material';
import MovieCard from '../../card/card';
import type {Movie, MovieRowProps} from "../../../types/types.ts";

/**
 * MovieRow component that displays a row of movie cards.
 * @param title
 * @param fetchFunction
 * @constructor
 */
const MovieRow: React.FC<MovieRowProps> = ({ title, fetchFunction }) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchFunction(1);
                setMovies(response.results || []);
                setHasMore(response.page < response.total_pages);
                setPage(2);
            } catch (err) {
                console.error(`Failed to fetch movies for ${title}`, err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [fetchFunction, title]);

    const handleLoadMore = async () => {
        try {
            setLoadingMore(true);
            const response = await fetchFunction(page);
            setMovies((prev) => [...prev, ...(response.results || [])]);
            setHasMore(response.page < response.total_pages);
            setPage((prev) => prev + 1);
        } catch (err) {
            console.error('Failed to load more movies', err);
        } finally {
            setLoadingMore(false);
        }
    };

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
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    '&::-webkit-scrollbar': { display: 'none' },
                }}
            >
                {loading
                    ? Array.from({ length: 6 }).map((_, index) => (
                        <Box key={index} sx={{ flex: '0 0 auto', width: 160 }}>
                            <Skeleton variant="rectangular" width={160} height={240} sx={{ borderRadius: 2 }} />
                            <Skeleton variant="text" width="100%" sx={{ mt: 1 }} />
                        </Box>
                    ))
                    : (
                        <>
                            {movies.map((movie) => (
                                <Box key={movie.id} sx={{ flex: '0 0 auto', width: 160 }}>
                                    <MovieCard
                                        id={movie.id}
                                        title={movie.title}
                                        posterPath={movie.poster_path}
                                    />
                                </Box>
                            ))}

                            {hasMore && (
                                <Box
                                    sx={{
                                        flex: '0 0 auto',
                                        width: 160,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingBottom: 7,
                                        paddingRight: 4,
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        onClick={handleLoadMore}
                                        disabled={loadingMore}
                                        sx={{
                                            width: '100%',
                                            height: 40,
                                            backgroundColor: 'secondary.light',
                                            '&:hover': {
                                                backgroundColor: 'primary.dark',
                                            },
                                        }}
                                    >
                                        {loadingMore ? 'Loading...' : 'Load More'}
                                    </Button>
                                </Box>
                            )}
                        </>
                    )}
            </Box>
        </Box>
    );
};

export default MovieRow;
