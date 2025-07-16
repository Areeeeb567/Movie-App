import { Request, Response } from 'express';
import axios from 'axios';


export const getMovieDetails = async (req: Request, res: Response): Promise<void> => {
    const { movieId } = req.params;

    try {
        const response = await axios.get(`${process.env.TMDB_BASE_URL}/movie/${movieId}`, {
            params: {
                api_key: process.env.TMDB_API_KEY,
                language: 'en-US'
            }
        });
        res.status(200).json(response.data);
        console.log('Movie details fetched successfully:', response.data);
    }
    catch (error) {
        console.error('Error fetching movie details:', error);
    }
};