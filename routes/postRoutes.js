import express from 'express';
import authMiddleware from '../middlewares/middleware.js';
import { createPost, deletePost, getAllPosts, getPostById, getPostsByTag, updatePost } from '../controllers/postController.js';
 
const router = express.Router();

router.post('/post', authMiddleware, createPost);
router.put('/post/:id', authMiddleware, updatePost);
router.delete('/post/:id', authMiddleware, deletePost);
router.get('/posts/', getAllPosts);
router.get('/post/:id', getPostById);
router.get('/post/tag/:tag', getPostsByTag);

export default router;
