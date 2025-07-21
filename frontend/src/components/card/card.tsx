// src/components/MovieCard.tsx
import React from 'react';
import {Box, Card, CardContent, CardMedia, Tooltip, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {API_ENDPOINTS} from "../../constants/apiUrls.ts";
import type {MovieCardProps} from "../../types/types.ts";

/**
 * MovieCard component displays a movie card with an image and title.
 * @param id
 * @param title
 * @param posterPath
 * @constructor
 */
const MovieCard: React.FC<MovieCardProps> = ({ id, title, posterPath }) => {
    const navigate = useNavigate();

    return (
        <Card
            elevation={0}
            sx={{
                cursor: 'pointer',
                height: '100%',
                width: 180,
                overflow: 'hidden',
                background: 'transparent',
            }}
            onClick={() => navigate(`/movie/${id}`)}
        >
            <Box>
                <CardMedia
                    component="img"
                    image={`${API_ENDPOINTS.MOVIES.POSTER_IMAGE}${posterPath}`}
                    alt={title}
                    sx={{
                        paddingTop: 2,
                        height: 270,
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.05)',
                        },
                    }}
                />
            </Box>

            <CardContent sx={{ textAlign: 'center', px: 1, py: 2 }}>
                <Tooltip title={title}>
                    <Typography
                        variant="subtitle2"
                        noWrap
                    >
                        {title}
                    </Typography>
                </Tooltip>
            </CardContent>
        </Card>
    );
};

export default MovieCard;
