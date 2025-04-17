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

// Public routes
router.get('/', getAllRequests);
router.get('/:id', getRequestById);

// Protected routes
router.post('/', authenticateToken, createRequest);

// Admin routes
router.put('/:id', authenticateToken, isAdmin, updateRequest);
router.put('/:id/status', authenticateToken, isAdmin, updateRequestStatus);
router.delete('/:id', authenticateToken, isAdmin, deleteRequest);

export default router; 