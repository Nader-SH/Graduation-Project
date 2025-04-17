import express from 'express';
import {
    getAllChats,
    getChatById,
    createChat,
    updateChat,
    deleteChat
} from '../controllers/chatController.js';
import { authenticateToken, isAdmin } from '../middlewares/auth.js';

const router = express.Router();

// Protected routes (all chat routes require authentication)
router.get('/', authenticateToken, getAllChats);
router.get('/:id', authenticateToken, getChatById);
router.post('/', authenticateToken, createChat);

// Admin routes
router.put('/:id', authenticateToken, isAdmin, updateChat);
router.delete('/:id', authenticateToken, isAdmin, deleteChat);

export default router;
