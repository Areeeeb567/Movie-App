// src/models/Favourite.ts
import mongoose from 'mongoose';

const favouriteSchema = new mongoose.Schema({
    userId: { type: Number, required: true, index: true },
    movieId: { type: Number, required: true }
});

export default mongoose.model('Favourite', favouriteSchema);
