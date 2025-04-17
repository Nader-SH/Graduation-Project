// server/routes/donation.js
import express from 'express';
import { 
    getAllDonations, 
    getDonationById, 
    createDonation, 
    updateDonation, 
    deleteDonation 
} from '../controllers/donationController.js';
import { authenticateToken, isAdmin } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllDonations);
router.get('/:id', getDonationById);

// Protected routes
router.post('/', authenticateToken, createDonation);

// Admin routes
router.put('/:id', authenticateToken, isAdmin, updateDonation);
router.delete('/:id', authenticateToken, isAdmin, deleteDonation);

export default router;