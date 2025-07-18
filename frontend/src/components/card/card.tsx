// src/components/MovieCard.tsx
import React from 'react';
import { Card, CardContent, CardMedia, Tooltip, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface MovieCardProps {
    id: number;
    title: string;
    posterPath: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ id, title, posterPath }) => {
    const navigate = useNavigate();

    return (
        <Card
            sx={{
                cursor: 'pointer',
                height: '100%',
                '&:hover': {
                    transform: 'scale(1.03)',
                    transition: 'transform 0.2s',
                },
            }}
            onClick={() => navigate(`/movie/${id}`)}
        >
            <CardMedia
                component="img"
                image={`https://image.tmdb.org/t/p/w500${posterPath}`}
                alt={title}
                sx={{
                    height: 300,
                    objectFit: 'cover',
                }}
            />
            <CardContent sx={{ textAlign: 'center', px: 1, py: 1 }}>
                <Tooltip title={title}>
                    <Typography variant="subtitle2" noWrap sx={{ fontWeight: 'bold' }}>
                        {title}
                    </Typography>
                </Tooltip>
            </CardContent>
        </Card>
    );
};

export default MovieCard;
