import express from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken } from '../utils/token';
import {ERROR_MESSAGES, HTTP_STATUS} from "../constants/httpResponses";
import { sendResponse, sendErrorResponse, jsonResponse } from '../constants/httpResponses';
import { Request, Response } from 'express';
import authMiddleware from "../middleware/auth";

const router = express.Router();

/**
 * Login route to authenticate user and generate JWT tokens
 */
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    //  Incase user is not found or password is incorrect
    if (!user){
        sendErrorResponse(res, HTTP_STATUS.UNAUTHORIZED, ERROR_MESSAGES.INVALID_CREDENTIALS);
        return;
    }

    //  If user is found, compare the password
    if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            // res.status(HTTP_STATUS.UNAUTHORIZED).send(ERROR_MESSAGES.INVALID_CREDENTIALS);
            sendErrorResponse(res, HTTP_STATUS.UNAUTHORIZED, ERROR_MESSAGES.INVALID_CREDENTIALS);
            return;
        }
    }

    //  Generate JWT tokens
    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    jsonResponse(res, { token: accessToken });

});

/**
 * Register route to create a new user
 */
router.post('/register', async (req, res) => {
    const { username, email, phoneNumber, password } = req.body;
    try {
        const user = new User({ username, email, phoneNumber, password });
        await user.save();
        sendErrorResponse(res, HTTP_STATUS.REGISTERED, ERROR_MESSAGES.REGISTER_SUCCESSFUL, true);
    } catch (error) {
        sendErrorResponse(res, HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.REGISTER_FAILED);
    }
});

/**
 * Change password route
 * @param req
 * @param res
 */
export const changePassword = async (req: Request , res: Response ) => {
    const { userId, oldPassword, newPassword } = req.body;

    try {
        const user = await User.findOne({userId});

        if (!user) {
            sendResponse(res, HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.INVALID_CREDENTIALS);
            return;
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            sendResponse(res, HTTP_STATUS.UNAUTHORIZED, ERROR_MESSAGES.INVALID_CREDENTIALS);
            return;
        }

        user.password = newPassword;
        await user.save();

        sendResponse(res, HTTP_STATUS.OK, ERROR_MESSAGES.CREDENTIALS_UPDATED, true);
    } catch (err) {
        sendResponse(res, HTTP_STATUS.SERVER_ERROR, ERROR_MESSAGES.SERVER_ERROR, false);
        return;
    }
};

export default router;


