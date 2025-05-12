import express from 'express';
import {
  getAllRequests,
  getRequestById,
  createRequest,
  updateRequest,
  deleteRequest,
  updateRequestStatus
} from '../controllers/requestController.js';
import { authenticateToken, isAdmin } from '../middlewares/auth.js';

const router = express.Router();

// Public routes - no authentication required
router.get('/', getAllRequests);
router.get('/:id', getRequestById);
router.post('/', createRequest);

// Protected routes - require authentication
router.put('/:id', authenticateToken, updateRequest);
router.put('/:id/status', authenticateToken, isAdmin, updateRequestStatus);
router.delete('/:id', authenticateToken, isAdmin, deleteRequest);

export default router; 