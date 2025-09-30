
import express from 'express';
import { addBlog, allBlogs, removeBlog } from '../controllers/blogControllers.js';

const router = express.Router();

router.post('/', addBlog);      // POST /api/blog
router.get('/', allBlogs);      // GET /api/blog
router.delete('/', removeBlog); // DELETE /api/blog

export default router;
