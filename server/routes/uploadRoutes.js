import express from 'express';
import upload from '../middleware/uploadMiddleware.js';
import { uploadImage, deleteImage } from '../controllers/uploadController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/image', protectAdmin, upload.single('image'), uploadImage);
router.delete('/image', protectAdmin, deleteImage);

export default router;
