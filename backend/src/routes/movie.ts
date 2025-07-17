import express from 'express';
import { getTopRatedMovies, getNowPlaying, getPopularMovies, searchMovies, getMovieDetails, discoverMovies, getGenres, getTrendingMovies } from '../controllers/tmdb';

const router = express.Router();


/**
 * Route to discover movies
 * @route GET /api/movies/discover
 * @queryParam {string} [sort_by] - The sorting criteria for discovering movies
 * @queryParam {number} [page=1] - The page number for pagination
 */
router.get('/discover', discoverMovies);

/**
 * Route to get trending movies
 * @route GET /api/movies/trending
 */
router.get('/trending', getTrendingMovies);

/**
 * Route to get top-rated movies
 * @route GET /api/movies/top_rated
 * @queryParam {number} [page=1] - The page number for pagination
 */
router.get('/top_rated', getTopRatedMovies);

/**
 * Route to get now playing movies
 * @route GET /api/movies/now_playing
 * @queryParam {number} [page=1] - The page number for pagination
 */
router.get('/now_playing', getNowPlaying);

/**
 * Route to get popular movies
 * @route GET /api/movies/popular
 * @queryParam {number} [page=1] - The page number for pagination
 */
router.get('/popular', getPopularMovies);

/**
 * Route to get movie genres
 * @route GET /api/movies/genres
 */
router.get('/genres', getGenres);

/**
 * Route to search for movies
 * @route GET /api/movies/search
 * @queryParam {string} query - The search query for movies
 * @queryParam {number} [page=1] - The page number for pagination
 */
router.get('/search', searchMovies);

/**
 * Route to get movie details by ID
 * @route GET /api/movies/:movieId
 * @param {string} movieId - The ID of the movie to fetch details for
 */
router.get('/:movieId', getMovieDetails);

export default router;
