// server/routes/donation.js
import express from 'express';
import { 
    getAllDonations, 
    getDonationById, 
    createDonation, 
    updateDonation, 
    deleteDonation,
    getDonationsSummary
} from '../controllers/donationController.js';

const router = express.Router();

// All routes
router.get('/', getAllDonations);
router.get('/summary', getDonationsSummary);
router.get('/:id', getDonationById);
router.post('/', createDonation);
router.put('/:id', updateDonation);
router.delete('/:id', deleteDonation);

export default router;