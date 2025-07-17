import express from 'express';
import { getNowPlaying } from '../controllers/tmdb';

const router = express.Router();

/**
 * Route to get now playing movies
 * @route GET /api/movies/now_playing
 * @queryParam {number} [page=1] - The page number for pagination
 */
router.get('/now_playing', getNowPlaying);

export default router;
