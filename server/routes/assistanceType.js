// server/routes/assistanceType.js
import express from 'express';
import {
    getAllAssistanceTypes,
    getAssistanceTypeById,
    createAssistanceType,
    updateAssistanceType,
    deleteAssistanceType
} from '../controllers/assistanceTypeController.js';
import { authenticateToken, isAdmin } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllAssistanceTypes);
router.get('/:id', getAssistanceTypeById);

// Admin routes
router.post('/', authenticateToken, isAdmin, createAssistanceType);
router.put('/:id', authenticateToken, isAdmin, updateAssistanceType);
router.delete('/:id', authenticateToken, isAdmin, deleteAssistanceType);

export default router;