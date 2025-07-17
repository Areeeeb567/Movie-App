import express from 'express';
import { getTrendingMovies } from '../controllers/tmdb';

const router = express.Router();

/**
 * Route to get trending movies
 * @route GET /api/movies/trending
 */
router.get('/trending', getTrendingMovies);

export default router;
