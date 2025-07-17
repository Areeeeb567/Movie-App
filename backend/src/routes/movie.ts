import express from 'express';
import {discoverMovies} from '../controllers/tmdb';

const router = express.Router();


/**
 * Route to discover movies
 * @route GET /api/movies/discover
 * @queryParam {string} [sort_by] - The sorting criteria for discovering movies
 * @queryParam {number} [page=1] - The page number for pagination
 */
router.get('/discover', discoverMovies);


export default router;
