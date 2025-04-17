import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import { CustomError } from '../utils/CustomError.js';

// Middleware to authenticate JWT token
export const authenticateToken = async (req, res, next) => {
    try {
        // Check both Authorization header and cookies for token
        const authHeader = req.headers['authorization'];
        const cookieToken = req.cookies?.token;
        const token = (authHeader && authHeader.split(' ')[1]) || cookieToken;

        if (!token) {
            throw new CustomError(401, 'Access token is required');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);

        if (!user) {
            throw new CustomError(404, 'User not found');
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({ message: 'Invalid token' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        next(error);
    }
};

// Middleware to check if user is admin
export const isAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin privileges required' });
    }

    next();
};

// Middleware to check if user is accessing their own resource
export const isOwner = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    const resourceId = req.params.id;
    if (req.user.id === parseInt(resourceId) || req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ message: 'Access denied. You can only access your own resources' });
    }
};

// Middleware to check if user is a donor
export const isDonor = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    if (req.user.type !== 'donor') {
        return res.status(403).json({ message: 'Donor privileges required' });
    }

    next();
};

// Middleware to validate request body
export const validateRequestBody = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: 'Validation error',
                error: error.details[0].message
            });
        }
        next();
    };
};

// Error handling middleware
export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            message: 'Validation Error',
            error: err.message
        });
    }

    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized',
            error: err.message
        });
    }

    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
};

// Rate limiting middleware
export const rateLimit = (limit, timeWindow) => {
    const requests = new Map();

    return (req, res, next) => {
        const ip = req.ip;
        const now = Date.now();

        if (requests.has(ip)) {
            const { count, startTime } = requests.get(ip);

            if (now - startTime > timeWindow) {
                requests.set(ip, { count: 1, startTime: now });
                next();
            } else if (count >= limit) {
                res.status(429).json({ message: 'Too many requests. Please try again later.' });
            } else {
                requests.set(ip, { count: count + 1, startTime });
                next();
            }
        } else {
            requests.set(ip, { count: 1, startTime: now });
            next();
        }
    };
};