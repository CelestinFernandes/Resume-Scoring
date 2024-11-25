// // File: API/routes/resumeRoutes.js
// import express from 'express';
// import multer from 'multer';
// import { config } from '../config/config.js';
// import { parseFile } from '../utils/fileParser.js';
// import { analyzeResume } from '../utils/resumeAnalyzer.js';
// import Resume from '../models/Resume.js';

// const router = express.Router();

// // Configure multer to allow multiple files with size limit
// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: {
//     fileSize: config.MAX_FILE_SIZE,  // Enforce max file size for each file
//   },
//   fileFilter: (req, file, cb) => {
//     if (config.ALLOWED_FILE_TYPES.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error('Only PDF files are allowed.'));
//     }
//   }
// });

// // New route: Analyze resume without file upload (using resume text and job description from the body)
// router.post('/api/analyze', async (req, res) => {
//   try {
//     const { resumeText, jobDescription } = req.body;

//     // Validate input
//     if (!resumeText || !jobDescription) {
//       return res.status(400).json({ error: 'Both resume text and job description are required' });
//     }

//     // Perform analysis
//     const analysis = await analyzeResume(resumeText, jobDescription);

//     // Return analysis result
//     res.json({ analysis });
//   } catch (error) {
//     console.error('Error in /api/analyze route:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // Original route: Analyze resume with file upload (supports multiple files)
// router.post('/analyze', upload.array('resumes'), async (req, res) => {
//   try {
//     console.log('Received request:', { files: req.files?.map(f => f.originalname), hasJobDesc: !!req.body.jobDescription });

//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ error: 'No file uploaded' });
//     }

//     if (!req.body.jobDescription) {
//       return res.status(400).json({ error: 'Job description is required' });
//     }

//     // Validate file sizes manually (since Multer's limits apply to the whole request)
//     for (const file of req.files) {
//       if (file.size > config.MAX_FILE_SIZE) {
//         return res.status(400).json({ error: `File ${file.originalname} exceeds the maximum size of 5MB.` });
//       }
//     }
//     // Process each resume file
//     const resumeTexts = await Promise.all(req.files.map(file => parseFile(file)));
//     console.log('Resume text extracted successfully');
//     // Assuming you're only analyzing the first resume file (adjust if needed)
//     const analysisResult = await analyzeResume(resumeTexts[0], req.body.jobDescription);
//     console.log('Analysis completed successfully');
//     // Just use the result directly without parsing it
//     const analysis = analysisResult;


//     // Save analysis data to the database
//     const resume = new Resume({
//       fileName: req.files.map(file => file.originalname).join(', '),
//       jobDescription: req.body.jobDescription,
//       analysis: analysis
//     });

//     await resume.save();
//     console.log('Analysis saved to database');

//     res.json({
//       analysis: analysis,
//       id: resume._id
//     });
//   } catch (error) {
//     console.error('Error in /analyze route:', error);
//     res.status(500).json({
//       error: error.message,
//       details: process.env.NODE_ENV === 'development' ? error.stack : undefined
//     });
//   }
// });

// // Route to get analysis results by ID
// router.get('/results/:id', async (req, res) => {
//   try {
//     const resume = await Resume.findById(req.params.id);
//     if (!resume) {
//       return res.status(404).json({ error: 'Analysis not found' });
//     }
//     res.json(resume);
//   } catch (error) {
//     console.error('Error in /results route:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// export default router;


//api/routes/resumeRoutes.js
import express from 'express';
import multer from 'multer';
// import { parseFile } from '../utils/fileParser'; // function to parse PDF
import Resume from "../models/resume.js"; // Mongoose model to save the resume data
import { analyzeResume } from '../utils/resumeAnalyzer.js'; // The analyzeResume function you modified
// import Resume from '../models/Resume.js';

import parseFile from "../utils/fileParser.js"
const router = express.Router();
const upload = multer(); // Initialize multer for file uploads

console.log('resumes')
// POST /analyze - Analyze resume and save results
router.post('/analyze', upload.array('resumes'), async (req, res) => {
  try {
    console.log('Received request:', { files: req.files?.map(f => f.originalname), hasJobDesc: !!req.body.jobDescription });

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    if (!req.body.jobDescription) {
      return res.status(400).json({ error: 'Job description is required' });
    }

    // Process each resume file
    const resumeTexts = await Promise.all(req.files.map(file => parseFile(file)));
    console.log('Resume text extracted successfully');

    // Assuming you're only analyzing the first resume file (adjust if needed)
    const analysisResult = await analyzeResume(resumeTexts[0], req.body.jobDescription);
    // Store the resume and analysis in MongoDB
    console.log(analysisResult)
    const resumeData = {
      filename: req.files[0].originalname,
      text: resumeTexts[0],
      JD: req.body.jobDescription,
      Score: analysisResult.Score, // assuming matchPercentage is returned as a score
      scoringDetails: {
        relevanceScore: analysisResult.relevanceScore,
        sectionsScore: analysisResult.sectionsScore,
        formattingScore: analysisResult.formattingScore,
        
        summary: analysisResult.profileSummary,
        criteriaExplanation: analysisResult.criteriaExplanation,
      }
    };







    // Save the document in MongoDB
    const newResume = new Resume(resumeData);
    await newResume.save();

    return res.status(200).json({ message: 'Resume analyzed and saved successfully', data: newResume });
    
  } catch (error) {
    console.error('Error analyzing and saving resume:', error);
    return res.status(500).json({ error: 'Error analyzing and saving resume', details: error.message });
  }
});

export default router;

