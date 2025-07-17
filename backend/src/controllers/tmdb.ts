import { Request, Response } from 'express';
import axios from 'axios';
import {ERROR_MESSAGES, HTTP_STATUS, jsonResponse, sendErrorResponse} from "../constants/httpResponses";

/**
 * Controllers for handling requests to the TMDB API
 */

/**
 * Fetch trending movies from TMDB API
 * @param req
 * @param res
 * @return Json response with trending movies or error message
 */
export const getTrendingMovies = async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await axios.get(`${process.env.TMDB_BASE_URL}/trending/movie/week`, {
            params: {
                api_key: process.env.TMDB_API_KEY,
                language: 'en-US',
            },
        });
        jsonResponse(res, response.data);
    } catch (error) {
        sendErrorResponse(res, HTTP_STATUS.SERVER_ERROR, ERROR_MESSAGES.ERROR_FETCHING_MOVIES, false);
    }
};