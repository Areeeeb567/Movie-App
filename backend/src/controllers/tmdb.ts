import { Request, Response } from 'express';
import axios from 'axios';
import {ERROR_MESSAGES, HTTP_STATUS, jsonResponse, sendErrorResponse} from "../constants/httpResponses";

/**
 * Controllers for handling requests to the TMDB API
 */

/**
 * Fetch movie details from TMDB API
 * @param req
 * @param res
 * @return Json response with movie details or error message
 */
export const getMovieDetails = async (req: Request, res: Response): Promise<void> => {
    const { movieId } = req.params;

    try {
        const response = await axios.get(`${process.env.TMDB_BASE_URL}/movie/${movieId}`, {
            params: {
                api_key: process.env.TMDB_API_KEY,
                language: 'en-US'
            }
        });
        jsonResponse(res, response.data);
    }
    catch (error) {
        sendErrorResponse(res, HTTP_STATUS.SERVER_ERROR, ERROR_MESSAGES.ERROR_FETCHING_MOVIES, false);
    }
};

/**
 * Search for movies using TMDB API
 * @param req
 * @param res
 * @return Json response with search results or error message
 */
export const searchMovies = async (req: Request, res: Response): Promise<void> => {
    const {query, page = 1} = req.query;

    // In case of no query
    if (!query) {
        sendErrorResponse(res, HTTP_STATUS.BAD_REQUEST, 'Query parameter is required and must be a string');
        return;
    }

    try {
        const response = await axios.get(`${process.env.TMDB_BASE_URL}/search/movie`, {
            params: {
                api_key: process.env.TMDB_API_KEY,
                query: query,
                page: page,
            },
        });

        jsonResponse(res, response.data);
    } catch (error) {
        sendErrorResponse(res, HTTP_STATUS.SERVER_ERROR, ERROR_MESSAGES.ERROR_FETCHING_MOVIES, false);
    }
};

/**
 * Discover movies based on genres and sorting options using TMDB API
 * @param req
 * @param res
 * @return Json response with discovered movies or error message
 */
export const discoverMovies = async (req: Request, res: Response): Promise<void> => {
    const { genres, sort_by = 'popularity.desc', page = 1 } = req.query;

    try {
        const response = await axios.get(`${process.env.TMDB_BASE_URL}/discover/movie`, {
            params: {
                api_key: process.env.TMDB_API_KEY,
                language: 'en-US',
                with_genres: genres,
                sort_by: sort_by,
                page: page,
            },
        });

        jsonResponse(res, response.data);
    } catch (error) {
        console.error('Error fetching discovered movies:', error);
        sendErrorResponse(res, HTTP_STATUS.SERVER_ERROR, ERROR_MESSAGES.ERROR_FETCHING_MOVIES, false);
    }
};