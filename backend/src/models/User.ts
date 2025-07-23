// backend/src/models/User.ts
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { AutoIncrementID } from '@typegoose/auto-increment';

/**
 * User schema for MongoDB using Mongoose
 */
const userSchema = new mongoose.Schema({
    userId: { type: Number, unique: true, index: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true }
});

const AutoIncrement = require('mongoose-sequence')(mongoose);
userSchema.plugin(AutoIncrement, { inc_field: 'userId' });

/**
 * Method to compare passwords
 */
userSchema.pre('save', async function (next) {
    const user = this as any;
    if (!user.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
});

export default mongoose.model('User', userSchema);