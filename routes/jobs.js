import express from 'express';
import { getJobs, getJob, addJob, updateJob, deleteJob } from '../controllers/jobController.js';

const router = express.Router();

// Get all jobs
router.get('/', getJobs);

// Get a single job
router.get('/:id', getJob);

// Add a new job
router.post('/', addJob);

// Update a job
router.put('/:id', updateJob);

// Delete a job
router.delete('/:id', deleteJob);

export default router;