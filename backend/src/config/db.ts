// src/config/db.ts
import mongoose from 'mongoose';
import { logger } from './logger';

/**
 * * Function to connect to MongoDB using Mongoose.
 */
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        logger.info('MongoDB connected');
    } catch (err) {
        logger.error('MongoDB connection failed:', err);
        process.exit(1);
    }
};

export default connectDB;
