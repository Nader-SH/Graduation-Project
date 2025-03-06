import express from 'express';
import { 
  getAllRequests, 
  getRequestById, 
  createRequest, 
  updateRequestStatus 
} from '../controllers/requestController.js';

const router = express.Router();

// Public routes (no auth required)
router.get('/', getAllRequests);
router.get('/:id', getRequestById);
router.post('/', createRequest);
router.put('/:id/status', updateRequestStatus);

export default router; 