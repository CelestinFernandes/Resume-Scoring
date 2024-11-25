// api/routes/historyRoutes.js
import express from 'express';
import { getAllResumes, getResumeById, deleteResume } from '../controllers/historyController.js';

const router = express.Router();

// Get all resumes
router.get('/', getAllResumes);

// Get specific resume by ID
router.get('/:id', getResumeById);

// Delete a resume
router.delete('/:id', deleteResume);

export default router;