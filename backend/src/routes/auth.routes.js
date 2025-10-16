import express from 'express';
import * as authController from '../controllers/auth.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/login', authController.login);
router.get('/verify', authenticate, authController.verify);

export default router;
