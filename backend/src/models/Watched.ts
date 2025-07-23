// src/models/Watched.ts
import mongoose from 'mongoose';

/**
 * Watched schema for MongoDB using Mongoose
 */
const watchedSchema = new mongoose.Schema({
    userId: { type: Number, required: true, index: true },
    movieId: { type: Number, required: true }
});

export default mongoose.model('Watched', watchedSchema);
