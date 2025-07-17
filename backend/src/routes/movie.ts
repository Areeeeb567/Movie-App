import express from 'express';
import { getPopularMovies } from '../controllers/tmdb';

const router = express.Router();

/**
 * Route to get popular movies
 * @route GET /api/movies/popular
 * @queryParam {number} [page=1] - The page number for pagination
 */
router.get('/popular', getPopularMovies);

export default router;
