// backend/src/constants/httpResponses.ts
import { Response } from 'express';

/**
 * HTTP status codes and error messages used in the application.
 */
export const HTTP_STATUS = {
    OK: 200,
    REGISTERED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
};

/**
 * Error messages used in the application.
 */
export const ERROR_MESSAGES = {
    NO_TOKEN: 'No token provided',
    INVALID_TOKEN: 'Invalid token',
    SERVER_ERROR: 'Server error',
    INVALID_CREDENTIALS: 'Invalid credentials',
    REGISTER_SUCCESSFUL: 'User registered successfully',
    REGISTER_FAILED: 'Registration failed',
    ERROR_FETCHING_MOVIES: 'Error fetching movie details:',
    NO_QUERY: 'Query parameter is required and must be a string',
    USER_NOT_FOUND: 'User not found',
    ERROR_ADDING_FAVOURITE: 'Error adding to favourites',
    ERROR_ADDING_WATCHED: 'Error adding to Watched list',
    ERROR_REMOVING_FAVOURITE: 'Error removing favourite',
    ERROR_REMOVING_WATCHED: 'Error removing from watched list',
    CREDENTIALS_UPDATED: 'Credentials updated successfully',
};

/**
 * Helper function to send consistent HTTP responses
 * @param res Express response object
 * @param statusCode HTTP status code from HTTP_STATUS
 * @param message Message or data to send in the response
 * @param success Boolean indicating if the request was successful
 */
export const sendResponse = (
    res: Response,
    statusCode: number = HTTP_STATUS.OK,
    message: string | object = '',
    success: boolean = true
) => {
    return res.status(statusCode).json({
        success,
        message: typeof message === 'string' ? message : '',
        data: typeof message === 'object' ? message : null
    });
};

/**
 * Helper function to send error responses
 * @param res Express response object
 * @param statusCode HTTP status code from HTTP_STATUS
 * @param message Error message from ERROR_MESSAGES
 */
export const sendErrorResponse = (
    res: Response,
    statusCode: number = HTTP_STATUS.SERVER_ERROR,
    message: string = ERROR_MESSAGES.SERVER_ERROR,
    success: boolean = false
) => {
    return sendResponse(res, statusCode, message, success);
};

/**
 * Sends a JSON response to the client.
 * This function is specifically designed to only handle JSON responses.
 * @param res - Express response object
 * @param data - Any data object to send as JSON
 * @returns The Express response object
 */
export const jsonResponse = <T>(res: Response, data: T) => {
    return res.status(HTTP_STATUS.OK).json(data);
};
