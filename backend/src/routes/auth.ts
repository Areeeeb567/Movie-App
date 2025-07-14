import express from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken } from '../utils/token';
import {ERROR_MESSAGES, HTTP_STATUS} from "../constants/httpResponses";

const router = express.Router();

// Middleware to check if the user is authenticated
/**
 * Login route to authenticate user and generate JWT tokens
 */
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    //  Incase user is not found or password is incorrect
    if (!user){
        res.status(HTTP_STATUS.UNAUTHORIZED).send(ERROR_MESSAGES.INVALID_CREDENTIALS);
        return;
    }

    //  If user is found, compare the password
    if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            res.status(HTTP_STATUS.UNAUTHORIZED).send(ERROR_MESSAGES.INVALID_CREDENTIALS);
            return;
        }
    }

    //  Generate JWT tokens
    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    // res.send('Logged in');
    res.json({ token: accessToken });

});

/**
 * Register route to create a new user
 */
router.post('/register', async (req, res) => {
    const { username, email, phoneNumber, password } = req.body;
    try {
        const user = new User({ username, email, phoneNumber, password });
        await user.save();
        res.status(HTTP_STATUS.REGISTERED).send(ERROR_MESSAGES.REGISTER_SUCCESSFUL);
    } catch (error) {
        res.status(HTTP_STATUS.BAD_REQUEST).send(ERROR_MESSAGES.REGISTER_FAILED);
    }
});

export default router;


