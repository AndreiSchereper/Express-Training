import express from 'express';
import {getPosts, getPost, addPost, deletePost, updatePost } from '../controllers/postController.js';
const router = express.Router();

// Get all posts
router.get('/', getPosts);

// Get a single post
router.get('/:id', getPost);

// Add a post
router.post('/', addPost);

// Update a post
router.put('/:id', updatePost);

// Delete a post
router.delete('/:id', deletePost);

export default router;