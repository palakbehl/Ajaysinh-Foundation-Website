import express from 'express';

const router = express.Router();

// Health Check
router.get('/', (req, res) => res.json({ message: 'API API Routes Working' }));

// Placeholder routes for Campaign
router.get('/campaigns', (req, res) => res.json({ message: 'Get all campaigns' }));
router.get('/campaigns/:slug', (req, res) => res.json({ message: `Get campaign ${req.params.slug}` }));

// Placeholder routes for Blog
router.get('/blogs', (req, res) => res.json({ message: 'Get all blogs' }));
router.get('/blogs/:slug', (req, res) => res.json({ message: `Get blog ${req.params.slug}` }));

// Placeholder route for Donation
router.post('/donations/create-order', (req, res) => res.json({ message: 'Create razorpay order' }));

export default router;
