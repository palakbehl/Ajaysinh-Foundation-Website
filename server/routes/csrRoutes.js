import express from 'express';
import {
  getCSRInquiries,
  updateCSRStatus,
  deleteCSRInquiry,
  submitCSRInquiry,
} from '../controllers/csrController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protectAdmin, getCSRInquiries)
  .post(submitCSRInquiry);

router.route('/:id')
  .put(protectAdmin, updateCSRStatus)
  .delete(protectAdmin, deleteCSRInquiry);

export default router;
