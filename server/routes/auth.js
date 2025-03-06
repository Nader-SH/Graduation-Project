import express from 'express';
import { registerUser } from '../controllers/authController.js';

const router = express.Router();

// Define the registration route
router.post('/register', registerUser); // This should be correct

export default router; 