import jwt from 'jsonwebtoken';
import { CustomError } from './CustomError.js';
import { User } from '../models/index.js';

export const verifyToken = async (token) => {
    try {
        if (!token) {
            throw new CustomError(401, 'No token provided');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findByPk(decoded.id);
        if (!user) {
            throw new CustomError(404, 'User not found');
        }

        return user;
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            throw new CustomError(401, 'Invalid token');
        }
        if (error.name === 'TokenExpiredError') {
            throw new CustomError(401, 'Token expired');
        }
        throw error;
    }
};