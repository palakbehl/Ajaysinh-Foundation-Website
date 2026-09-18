import express from 'express';
import {
  getDonations,
  getDonationById,
  createDonation,
} from '../controllers/donationController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protectAdmin, getDonations)
  .post(createDonation);

router.route('/:id')
  .get(protectAdmin, getDonationById);

export default router;
