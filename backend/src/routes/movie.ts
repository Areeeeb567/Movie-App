import express from 'express';
import {getMovieDetails, getNowPlaying, searchMovies} from '../controllers/tmdb';

const router = express.Router();

/**
 * Route to search for movies
 * @route GET /api/movies/search
 * @queryParam {string} query - The search query for movies
 * @queryParam {number} [page=1] - The page number for pagination
 */
router.get('/search', searchMovies);

/**
 * Route to get now playing movies
 * @route GET /api/movies/now_playing
 * @queryParam {number} [page=1] - The page number for pagination
 */
router.get('/now_playing', getNowPlaying);

/**
 * Route to get movie details by ID
 * @route GET /api/movies/:movieId
 * @param {string} movieId - The ID of the movie to fetch details for
 */
router.get('/:movieId', getMovieDetails);

export default router;
