import express from 'express';
import {
  getAllRequests,
  getRequestById,
  createRequest,
  updateRequest,
  deleteRequest,
  updateRequestStatus
} from '../controllers/requestController.js';
import {
  getAllDonations,
  addDonation,
  getDonationStatistics,
  addExpense,
  getRequestFinancialSummary
} from '../controllers/requestDonationController.js';
import { authenticateToken, isAdmin } from '../middlewares/auth.js';

const router = express.Router();

// Public routes - no authentication required
router.get('/', getAllRequests);
router.get('/:id', getRequestById);
router.post('/', createRequest);

// Donation routes
router.get('/donations', getAllDonations);
router.post('/donations', addDonation);
router.get('/donations/statistics', getDonationStatistics);

// Request-specific donation routes
router.post('/:requestId/donations', addDonation);

// Expense routes
router.post('/:requestId/expenses', addExpense);
router.get('/:requestId/financial-summary', getRequestFinancialSummary);

// Protected routes - require authentication
router.put('/:id', authenticateToken, updateRequest);
router.put('/:id/status', authenticateToken, isAdmin, updateRequestStatus);
router.delete('/:id', authenticateToken, isAdmin, deleteRequest);

export default router; 