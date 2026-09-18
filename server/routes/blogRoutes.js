import express from 'express';
import {
  getBlogs,
  getAllBlogsAdmin,
  getBlogByIdOrSlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getBlogs)
  .post(protectAdmin, createBlog);

// Admin route to list all blogs including drafts
router.get('/admin/all', protectAdmin, getAllBlogsAdmin);

router.route('/:id')
  .get(getBlogByIdOrSlug)
  .put(protectAdmin, updateBlog)
  .delete(protectAdmin, deleteBlog);

export default router;
