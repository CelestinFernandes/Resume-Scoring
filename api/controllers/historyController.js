// import resumeRoutes from './routes/resumeRoutes.js';

// export const getAllResumes = async (req, res) => {
//   try {
//     const resumes = await Resume.find()
//       .sort({ createdAt: -1 })
//       .select('-text'); // Exclude the full text for better performance

//     res.status(200).json(resumes);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const getResumeById = async (req, res) => {
//   try {
//     const resume = await Resume.findById(req.params.id);
//     if (!resume) {
//       return res.status(404).json({ message: 'Resume not found' });
//     }
//     res.status(200).json(resume);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const deleteResume = async (req, res) => {
//   try {
//     const resume = await Resume.findByIdAndDelete(req.params.id);
//     if (!resume) {
//       return res.status(404).json({ message: 'Resume not found' });
//     }
//     res.status(200).json({ message: 'Resume deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

 //\api\controllers\historyController.js
// import Resume from '../resume.js'; 

import Resume from '../models/resume.js';

export const getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find()
      .sort({ createdAt: -1 })
      .select('-text'); // Excluded full text for better performance

    res.status(200).json(resumes);
  } catch (error) {
    console.error('Error in getAllResumes:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.status(200).json(resume);
  } catch (error) {
    console.error('Error in getResumeById:', error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findByIdAndDelete(req.params.id);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.status(200).json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Error in deleteResume:', error);
    res.status(500).json({ error: error.message });
  }
};