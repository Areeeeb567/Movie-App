import { Request, Response } from 'express';
import axios from 'axios';
import {ERROR_MESSAGES, HTTP_STATUS, jsonResponse, sendErrorResponse} from "../constants/httpResponses";

/**
 * Controllers for handling requests to the TMDB API
 */

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