import express from 'express';
import {
  getVolunteers,
  updateVolunteerStatus,
  deleteVolunteer,
  submitVolunteer,
} from '../controllers/volunteerController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protectAdmin, getVolunteers)
  .post(submitVolunteer);

router.route('/:id')
  .put(protectAdmin, updateVolunteerStatus)
  .delete(protectAdmin, deleteVolunteer);

export default router;
