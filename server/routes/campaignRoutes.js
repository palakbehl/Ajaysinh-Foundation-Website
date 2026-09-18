import express from 'express';
import {
  getCampaigns,
  getCampaignByIdOrSlug,
  createCampaign,
  updateCampaign,
  deleteCampaign,
} from '../controllers/campaignController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getCampaigns)
  .post(protectAdmin, createCampaign);

router.route('/:id')
  .get(getCampaignByIdOrSlug)
  .put(protectAdmin, updateCampaign)
  .delete(protectAdmin, deleteCampaign);

export default router;
