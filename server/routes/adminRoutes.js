import express from 'express';
import { loginAdmin, getAdminProfile, logoutAdmin } from '../controllers/authController.js';
import { getDashboardStats } from '../controllers/adminController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.get('/profile', protectAdmin, getAdminProfile);
router.post('/logout', protectAdmin, logoutAdmin);
router.get('/dashboard', protectAdmin, getDashboardStats);

export default router;
