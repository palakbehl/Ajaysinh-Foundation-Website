import express from 'express';
import adminRoutes from './adminRoutes.js';
import campaignRoutes from './campaignRoutes.js';
import blogRoutes from './blogRoutes.js';
import donationRoutes from './donationRoutes.js';
import volunteerRoutes from './volunteerRoutes.js';
import csrRoutes from './csrRoutes.js';
import contactRoutes from './contactRoutes.js';
import uploadRoutes from './uploadRoutes.js';

const router = express.Router();

// Health Check
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Ajaysinh Foundation API is running' });
});

// Mount modular sub-routers
router.use('/admin', adminRoutes);
router.use('/campaigns', campaignRoutes);
router.use('/blogs', blogRoutes);
router.use('/donations', donationRoutes);
router.use('/volunteers', volunteerRoutes);
router.use('/csr', csrRoutes);
router.use('/csr-inquiries', csrRoutes);
router.use('/contact', contactRoutes);
router.use('/messages', contactRoutes);
router.use('/upload', uploadRoutes);

export default router;
