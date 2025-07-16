import express from 'express';
import { getMovieDetails } from '../controllers/tmdb';

const router = express.Router();

router.get('/:movieId', getMovieDetails);

export default router;
