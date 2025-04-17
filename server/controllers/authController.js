import { User } from '../models/index.js';
import { hashPassword, comparePassword, generateToken } from '../utils/index.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import createError from 'http-errors';

// Register new user
export const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, type, image } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return next(createError(409, 'User already exists'));
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: 'user', // Default role
      type,
      image
    });

    // Generate token
    const token = generateToken(user);

    // Set cookie with token
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user.toJSON();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: userWithoutPassword,
        token
      }
    });
  } catch (error) {
    console.error('Error in register:', error);
    next(createError(500, 'Error during registration'));
  }
};

// Login user
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(createError(401, 'Invalid credentials'));
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(createError(401, 'Invalid credentials'));
    }

    // Generate token
    const token = generateToken(user);

    // Set cookie with token
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user.toJSON();

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: userWithoutPassword,
        token
      }
    });
  } catch (error) {
    console.error('Error in login:', error);
    next(createError(500, 'Error during login'));
  }
};

// Logout user
export const logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
};

// Refresh token
export const refreshToken = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return next(createError(404, 'User not found'));
    }

    const token = generateToken(user);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    res.status(200).json({
      success: true,
      data: { token }
    });
  } catch (error) {
    console.error('Error in refreshToken:', error);
    next(createError(500, 'Error refreshing token'));
  }
};

// Get current user
export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] } // Exclude password from the response
    });

    if (!user) {
      return next(createError(404, 'User not found'));
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error in getCurrentUser:', error);
    next(createError(500, 'Error retrieving user'));
  }
};

// Verify token
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] ||
      req.cookies.token ||
      req.query.token;

    if (!token) {
      return next(createError(401, 'No token provided'));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id)
      .select('-password')
      .lean();

    if (!user) {
      return next(createError(404, 'User not found'));
    }

    // Attach user and token to request object
    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return next(createError(401, 'Invalid token'));
    }
    if (error.name === 'TokenExpiredError') {
      return next(createError(401, 'Token expired'));
    }
    next(createError(500, 'Error verifying token'));
  }
}; 