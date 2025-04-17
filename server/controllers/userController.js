import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Donation } from '../models/index.js';
import { hashPassword, comparePassword } from '../utils/index.js';
import { CustomError } from '../utils/CustomError.js';

// Register new user
export const register = async (req, res) => {
    try {
        console.log('Request body:', req.body);

        const { firstName, lastName, email, password, type, image } = req.body;

        if (!firstName || !lastName || !email || !password || !type || !image) {
            return res.status(400).json({
                message: "All fields are required",
                required: {
                    firstName: !firstName ? "missing" : "received",
                    lastName: !lastName ? "missing" : "received",
                    email: !email ? "missing" : "received",
                    password: !password ? "missing" : "received",
                    type: !type ? "missing" : "received",
                    image: !image ? "missing" : "received"
                }
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log('hashedPassword', hashedPassword);
        // Create new user
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            type,
            image
        });

        res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser.id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                type: newUser.type,
                image: newUser.image
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
};

// Login user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Add debug logging
        console.log('JWT_SECRET:', process.env.JWT_SECRET);

        // Check if user exists
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log(password, user.password);
        // Verify password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Ensure JWT_SECRET exists
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }

        // Create and assign token
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                type: user.type
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: "Logged in successfully",
            token,
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                type: user.type,
                image: user.image
            }
        });

    } catch (error) {
        console.error('Login error:', error);  // Add detailed error logging
        res.status(500).json({
            message: "Error logging in",
            error: error.message,
            details: process.env.JWT_SECRET ? 'JWT_SECRET exists' : 'JWT_SECRET is missing'
        });
    }
};

// Get all users (admin only)
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Request,
                    attributes: ['id', 'status', 'createdAt']
                }
            ]
        });

        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        console.error('Error in getAllUsers:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching users',
            error: error.message
        });
    }
};

// Get user by ID
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id, {
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Request,
                    attributes: ['id', 'status', 'createdAt']
                }
            ]
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error('Error in getUserById:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching user',
            error: error.message
        });
    }
};

// Get user profile (for authenticated user)
export const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findByPk(userId, {
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Request,
                    attributes: ['id', 'status', 'createdAt']
                }
            ]
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error('Error in getUserProfile:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching user profile',
            error: error.message
        });
    }
};

// Update user
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, password, image } = req.body;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Check if email is being changed and if new email already exists
        if (email && email !== user.email) {
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: 'Email already in use'
                });
            }
        }

        // Update user data
        const updateData = {
            firstName: firstName || user.firstName,
            lastName: lastName || user.lastName,
            email: email || user.email,
            image: image || user.image
        };

        // If password is provided, hash it
        if (password) {
            updateData.password = await hashPassword(password);
        }

        await user.update(updateData);

        // Get updated user without password
        const updatedUser = await User.findByPk(id, {
            attributes: { exclude: ['password'] }
        });

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: updatedUser
        });
    } catch (error) {
        console.error('Error in updateUser:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating user',
            error: error.message
        });
    }
};

// Delete user
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Check if user has any active requests
        const activeRequests = await Request.count({
            where: {
                userId: id,
                status: ['pending', 'approved', 'in-progress']
            }
        });

        if (activeRequests > 0) {
            return res.status(400).json({
                success: false,
                message: 'Cannot delete user with active requests'
            });
        }

        await user.destroy();

        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        console.error('Error in deleteUser:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting user',
            error: error.message
        });
    }
};

// Get user statistics
export const getUserStats = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Get requests statistics
        const totalRequests = await Request.count({ where: { userId: id } });
        const pendingRequests = await Request.count({
            where: {
                userId: id,
                status: 'pending'
            }
        });
        const approvedRequests = await Request.count({
            where: {
                userId: id,
                status: 'approved'
            }
        });

        // Get recent requests
        const recentRequests = await Request.findAll({
            where: { userId: id },
            limit: 5,
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({
            success: true,
            data: {
                totalRequests,
                pendingRequests,
                approvedRequests,
                recentRequests
            }
        });
    } catch (error) {
        console.error('Error in getUserStats:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching user statistics',
            error: error.message
        });
    }
};

// Change password
export const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user.id;

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Verify current password
        const isPasswordValid = await comparePassword(currentPassword, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: 'Current password is incorrect'
            });
        }

        // Hash and update new password
        const hashedPassword = await hashPassword(newPassword);
        await user.update({ password: hashedPassword });

        res.status(200).json({
            success: true,
            message: 'Password changed successfully'
        });
    } catch (error) {
        console.error('Error in changePassword:', error);
        res.status(500).json({
            success: false,
            message: 'Error changing password',
            error: error.message
        });
    }
}; 