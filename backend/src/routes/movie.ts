import express from 'express';
import {getGenres} from '../controllers/tmdb';

const router = express.Router();

/**
 * Route to get movie genres
 * @route GET /api/movies/genres
 */
router.get('/genres', getGenres);

export default router;
