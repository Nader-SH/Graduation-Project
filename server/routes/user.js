import express from 'express';
import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserProfile
} from '../controllers/userController.js';
import { authenticateToken, isAdmin, isOwner } from '../middlewares/auth.js';

const router = express.Router();

// Protected routes
router.get('/profile', authenticateToken, getUserProfile);
router.put('/:id', authenticateToken, isOwner, updateUser);

// Admin routes
router.get('/', authenticateToken, isAdmin, getAllUsers);
router.get('/:id', authenticateToken, isAdmin, getUserById);
router.delete('/:id', authenticateToken, isAdmin, deleteUser);

export default router;