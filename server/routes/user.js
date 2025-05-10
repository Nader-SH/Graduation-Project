import express from 'express';
import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserProfile,
    approveVolunteer,
    getPendingVolunteers,
    rejectVolunteer
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

// Volunteer approval routes (admin only)
router.get('/volunteers/pending', authenticateToken, isAdmin, getPendingVolunteers);
router.post('/volunteers/:id/approve', authenticateToken, isAdmin, approveVolunteer);
router.post('/volunteers/:id/reject', authenticateToken, isAdmin, rejectVolunteer);

export default router;