import express from 'express';
import { Router } from 'express';
import * as userController from '../controllers/userController.js';

const router = Router();

// Define your user routes here
router.post('/register', userController.register);
router.post('/login', userController.login);
// Add other user routes as needed

export default router; 