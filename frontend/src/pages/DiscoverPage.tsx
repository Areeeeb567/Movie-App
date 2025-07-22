import React, { useEffect, useState } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Typography,
    Grid,
    Box,
    Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Page from '../templates/page';
import MovieCard from '../components/card/card';
import { getGenres, discoverMoviesByGenres } from '../services/movie';
import LoadMoreButton from '../components/organisms/button/button';
import type { Genre, Movie } from '../types/types';

/**
 * DiscoverPage component that allows users to discover movies by genre.
 * @constructor
 */
const DiscoverPage: React.FC = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [hasSearched, setHasSearched] = useState(false);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const genreData = await getGenres();
                setGenres(genreData);
            } catch (error) {
                console.error('Failed to fetch genres:', error);
            }
        };

        fetchGenres();
    }, []);

    const fetchMovies = async (pageToLoad = 1) => {
        setHasSearched(true);

        if (selectedGenres.length === 0) {
            setMovies([]);
            return;
        }

        try {
            const data = await discoverMoviesByGenres(selectedGenres, pageToLoad);

            setMovies((prevMovies) =>
                pageToLoad === 1 ? data.results : [...prevMovies, ...data.results]
            );

            setPage(data.page);
            setTotalPages(data.total_pages);
        } catch (error) {
            console.error('Failed to fetch movies:', error);
        }
    };

    const handleToggleGenre = (id: number) => {
        setSelectedGenres((prev) =>
            prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
        );
    };

    const handleSearchClick = () => {
        setPage(1);
        fetchMovies(1);
    };

    const handleLoadMore = () => {
        const nextPage = page + 1;
        fetchMovies(nextPage);
    };

    return (
        <Page>
            <Box sx={{ px: 3, mt: 8 }}>
                <Typography variant="h4" sx={{ mb: 3 }}>
                    Discover Movies by Genre
                </Typography>

                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Filter by Genre</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormGroup row>
                            {genres.map((genre) => (
                                <FormControlLabel
                                    key={genre.id}
                                    control={
                                        <Checkbox
                                            checked={selectedGenres.includes(genre.id)}
                                            onChange={() => handleToggleGenre(genre.id)}
                                            sx={{
                                                color: 'primary',
                                                '&.Mui-checked': {
                                                    color: 'secondary.main',
                                                },
                                            }}
                                        />
                                    }
                                    label={genre.name}
                                />
                            ))}
                        </FormGroup>
                        <Box sx={{ mt: 2 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSearchClick}
                                disabled={selectedGenres.length === 0}
                            >
                                Search
                            </Button>
                        </Box>
                    </AccordionDetails>
                </Accordion>

                <Box sx={{ mt: 4 }}>
                    {movies.length === 0 ? (
                        <Typography variant="body1" color="text.secondary">
                            {!hasSearched
                                ? 'Select genres and click search to discover movies.'
                                : selectedGenres.length === 0
                                    ? 'Select genres to discover movies.'
                                    : 'No movies found for the selected genres.'}
                        </Typography>
                    ) : (
                        <>
                            <Grid container spacing={2}>
                                {movies.map((movie) => (
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
                                        <LoadMoreButton
                                            direction="down"
                                            onClick={handleLoadMore}
                                        />
                                    </Box>
                            )}

                        </>
                    )}
                </Box>
            </Box>
        </Page>
    );
};

export default DiscoverPage;
