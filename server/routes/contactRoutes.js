import express from 'express';
import {
  getContactMessages,
  toggleMessageRead,
  deleteContactMessage,
  submitContactMessage,
} from '../controllers/contactController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protectAdmin, getContactMessages)
  .post(submitContactMessage);

router.route('/:id')
  .put(protectAdmin, toggleMessageRead)
  .delete(protectAdmin, deleteContactMessage);

export default router;
