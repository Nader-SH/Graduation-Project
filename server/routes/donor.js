// server/routes/donor.js
import express from 'express';
import {
    getAllDonors,
    getDonorById,
    createDonor,
    updateDonor,
    deleteDonor
} from '../controllers/donorController.js';
import { authenticateToken, isAdmin } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllDonors);
router.get('/:id', getDonorById);

// Protected routes
router.post('/', authenticateToken, createDonor);

// Admin routes
router.put('/:id', authenticateToken, isAdmin, updateDonor);
router.delete('/:id', authenticateToken, isAdmin, deleteDonor);

export default router;