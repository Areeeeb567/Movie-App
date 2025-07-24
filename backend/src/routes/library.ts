// backend/src/routes/library.ts
import { Router } from 'express';
import {
    addToFavourites,
    addToWatched,
    getUserFavourites,
    getUserWatchedList,
    removeFavourite,
    removeWatched
} from '../controllers/library';
import authMiddleware from '../middleware/auth';

const router = Router();

/**
 * Route to add a movie to favorites
 * @route POST /api/favourites/addfav
 * @body {number} userId - The ID of the user
 * @body {number} movieId - The ID of the movie to add to favorites
 */
router.post('/addfav', authMiddleware, addToFavourites);

/**
 * Route to remove favorite
 * @route POST api/favourites/remfav
 * @body {number} userId - The ID of the user
 * @body {number} movieId - The ID of the movie to add to favorites
 */
router.post('/remfav', authMiddleware, removeFavourite);

/**
 * Route to add a movie to watched list
 * @route POST /api/favourites/addfav
 * @body {number} userId - The ID of the user
 * @body {number} movieId - The ID of the movie to add to favorites
 */
router.post('/addwatched', authMiddleware, addToWatched);

/**
 * Route to remove favorite
 * @route POST api/favourites/remfav
 * @body {number} userId - The ID of the user
 * @body {number} movieId - The ID of the movie to add to favorites
 */
router.post('/remwatched', authMiddleware, removeWatched);

router.get('/getfav/:userId', authMiddleware, getUserFavourites);

router.get('/getwatched/:userId', authMiddleware, getUserWatchedList);


export default router;