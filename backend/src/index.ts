/**
 * * * Entry point for the backend server
 */
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import cookieParser from 'cookie-parser';
import connectDB from './config/db';
import protectedRoutes from './routes/protected';
import { logger } from './config/logger';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use(cookieParser());
app.use('/api', protectedRoutes);

/**
 * * Basic route to check if the API is working
 */
app.get('/', (req, res) => {
    res.send('API is working!');
});

/**
 * * * Port for the server to listen on
 */
const PORT = process.env.PORT || 5000;

/**
 * * Function to connect to the database and start the server
 */
connectDB().then(() => {
    app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
});
