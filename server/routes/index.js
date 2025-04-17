import express from 'express';
import authRoutes from './auth.js';
import userRoutes from './user.js';
import requestRoutes from './requests.js';
import donationRoutes from './donation.js';
import assistanceTypeRoutes from './assistanceType.js';
import donorRoutes from './donor.js';
import chatRoutes from './chat.js';

const router = express.Router();

// Mount all routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/requests', requestRoutes);
router.use('/donations', donationRoutes);
router.use('/assistance-types', assistanceTypeRoutes);
router.use('/donors', donorRoutes);
router.use('/chats', chatRoutes);

export default router;