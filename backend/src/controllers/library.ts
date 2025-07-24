// src/controllers/favourite.ts
import { Request, Response } from 'express';
import Favourite from '../models/Favourite';
import Watched from '../models/Watched'
import User from '../models/User';
import {ERROR_MESSAGES, HTTP_STATUS, jsonResponse, sendErrorResponse} from "../constants/httpResponses";

/**
 * Controller to add a movie to the user's favourites list.
 * @param req
 * @param res
 */
export const addToFavourites = async (req: Request, res: Response) => {
    try {
        const { userId, movieId } = req.body;

        const user = await User.findOne({ userId });
        if (!user) {
            sendErrorResponse(res, HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.USER_NOT_FOUND);
            return;
        }

        const fav = await Favourite.create({ userId, movieId });
        jsonResponse(res, fav);
    } catch (err) {
        sendErrorResponse(res, HTTP_STATUS.SERVER_ERROR, ERROR_MESSAGES.ERROR_ADDING_FAVOURITE);
    }
};

/**
 * Controller to remove a movie from the user's favourites list.
 * @param req
 * @param res
 */
export const removeFavourite = async(req: Request, res: Response)=> {
    try {
        const { userId, movieId } = req.body;

        const user = await User.findOne({ userId });
        if (!user) {
            sendErrorResponse(res, HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.USER_NOT_FOUND);
            return;
        }
        const rem = await Favourite.deleteOne({userId, movieId});
        jsonResponse(res, rem);
    }
    catch(err){
        sendErrorResponse(res, HTTP_STATUS.SERVER_ERROR, ERROR_MESSAGES.ERROR_REMOVING_FAVOURITE);

    }
}

/**
 * Controller to add a movie to the user's watched list.
 * @param req
 * @param res
 */
export const addToWatched = async (req: Request, res: Response) => {
    try {
        const { userId, movieId } = req.body;

        const user = await User.findOne({ userId });
        if (!user) {
            sendErrorResponse(res, HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.USER_NOT_FOUND);
            return;
        }

        const fav = await Watched.create({ userId, movieId });
        jsonResponse(res, fav);
    } catch (err) {
        sendErrorResponse(res, HTTP_STATUS.SERVER_ERROR, ERROR_MESSAGES.ERROR_ADDING_WATCHED);
    }
};

/**
 * Controller to remove a movie from the user's watched list.
 * @param req
 * @param res
 */
export const removeWatched = async(req: Request, res: Response)=> {
    try {
        const { userId, movieId } = req.body;

        const user = await User.findOne({ userId });
        if (!user) {
            sendErrorResponse(res, HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.USER_NOT_FOUND);
            return;
        }
        const rem = await Watched.deleteOne({userId, movieId});
        jsonResponse(res, rem);
    }
    catch(err){
        sendErrorResponse(res, HTTP_STATUS.SERVER_ERROR, ERROR_MESSAGES.ERROR_REMOVING_WATCHED);
    }
}

/**
 * Controller to fetch the list of favorite movies for a user
 * @param req - Express request object
 * @param res - Express response object
 */
export const getUserFavourites = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            sendErrorResponse(res, HTTP_STATUS.BAD_REQUEST, 'User ID is required');
            return;
        }

        const favourites = await Favourite.find(
            { userId: parseInt(userId) },
            { _id: 0, movieId: 1 }
        );

        const movieIds = favourites.map(fav => fav.movieId);

        jsonResponse(res, movieIds);
    } catch (err) {
        sendErrorResponse(res, HTTP_STATUS.SERVER_ERROR, 'Error fetching favorite movies');
    }
};

/**
 * Controller to fetch the list of watched movies for a user
 * @param req - Express request object
 * @param res - Express response object
 */
export const getUserWatchedList = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            sendErrorResponse(res, HTTP_STATUS.BAD_REQUEST, 'User ID is required');
            return;
        }

        const watchedList = await Watched.find({ userId: parseInt(userId) });

        jsonResponse(res, watchedList);
    } catch (err) {
        sendErrorResponse(res, HTTP_STATUS.SERVER_ERROR, 'Error fetching watched movies');
    }
};