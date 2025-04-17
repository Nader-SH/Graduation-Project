import express from 'express';
import { register, login, logout, getCurrentUser } from '../controllers/authController.js';
import { authenticateToken, validateRequestBody } from '../middlewares/auth.js';
import { registerSchema, loginSchema } from '../validation/userValidation.js';

const router = express.Router();

// Auth routes
router.post('/register', validateRequestBody(registerSchema), register);
router.post('/login', validateRequestBody(loginSchema), login);
router.post('/logout', logout);
router.get('/me', authenticateToken, getCurrentUser);
export default router; 