import { Request, Response } from 'express';
import axios from 'axios';
import {ERROR_MESSAGES, HTTP_STATUS, jsonResponse, sendErrorResponse} from "../constants/httpResponses";

/**
 * Controllers for handling requests to the TMDB API
 */

/**
 * Fetch top-rated movies from TMDB API
 * @param req
 * @param res
 * @return Json response with top-rated movies or error message
 */
export const getTopRatedMovies = async (req: Request, res: Response): Promise<void> => {
    const {page = 1} = req.query;

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
        sendErrorResponse(res, HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.NO_QUERY, false);
        return;
    }

    try {
        const response = await axios.get(`${process.env.TMDB_BASE_URL}/movie/top_rated`, {
            params: {
                api_key: process.env.TMDB_API_KEY,
                language: 'en-US',
                page: page,
            },
        });

        jsonResponse(res, response.data);
    }
    catch (error){
        sendErrorResponse(res, HTTP_STATUS.SERVER_ERROR, ERROR_MESSAGES.ERROR_FETCHING_MOVIES, false);
    }
};
/**
 * Fetch upcoming movies from TMDB API
 * @param req
 * @param res
 * @return Json response with upcoming movies or error message
 */
export const getNowPlaying = async (req: Request, res: Response): Promise<void> => {
    const { page = 1} = req.query;

    try {
        const response = await axios.get(`${process.env.TMDB_BASE_URL}/movie/now_playing`, {
            params: {
                api_key: process.env.TMDB_API_KEY,
                language: 'en-US',
                page: page,
            },
        });

        jsonResponse(res, response.data);
    } catch (error) {
        sendErrorResponse(res, HTTP_STATUS.SERVER_ERROR, ERROR_MESSAGES.ERROR_FETCHING_MOVIES, false);
    }
};

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
 * Fetch popular movies from TMDB API
 * @param req
 * @param res
 * @return Json response with popular movies or error message
 */
export const getPopularMovies = async (req: Request, res: Response): Promise<void> => {
    const { page = 1 } = req.query;

    try {
        const response = await axios.get(`${process.env.TMDB_BASE_URL}/movie/popular`, {
            params: {
                api_key: process.env.TMDB_API_KEY,
                language: 'en-US',
                page: page,
            },
        });

        jsonResponse(res, response.data);
    } catch (error) {
        sendErrorResponse(res, HTTP_STATUS.SERVER_ERROR, ERROR_MESSAGES.ERROR_FETCHING_MOVIES, false);
    }
};
