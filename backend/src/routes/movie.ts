import express from 'express';
import { getTopRatedMovies } from '../controllers/tmdb';

const router = express.Router();

/**
 * Route to get top-rated movies
 * @route GET /api/movies/top_rated
 * @queryParam {number} [page=1] - The page number for pagination
 */
router.get('/top_rated', getTopRatedMovies);


export default router;
