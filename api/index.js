// import dotenv from 'dotenv';
// dotenv.config();  // Load environment variables

// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import resumeRoutes from './routes/resumeRoutes.js';
// import authRoutes from './routes/auth.route.js';
// // import Resume from "../models/Resume.js"
// import { resumeAnalyzer } from './api/utils/resumeAnalyzer.js';

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());  // Required to parse the body of POST requests
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/resume', resumeRoutes);

// // Connect to MongoDB
// const connectDB = async () => {
//   try {
//     const mongoURI = process.env.MONGODB;  // Use the correct env variable
//     if (!mongoURI) {
//       throw new Error('MongoDB URI is not defined in environment variables');
//     }

//     // Log the Mongo URI to check it's being loaded correctly (optional)
//     console.log('Mongo URI:', mongoURI);

//     // Connect to MongoDB using the URI
//     const conn = await mongoose.connect(mongoURI);
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`Error connecting to MongoDB: ${error.message}`);
//     process.exit(1); // Exit process if connection fails
//   }
// };

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error('Error:', err);
//   res.status(500).json({
//     error: err.message,
//     details: process.env.NODE_ENV === 'development' ? err.stack : undefined,
//   });
// });

// // Start server
// const PORT = process.env.PORT || 5000;

// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// });

//index.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import resumeRoutes from './routes/resumeRoutes.js';
import authRoutes from './routes/auth.route.js';
import historyRoutes from './routes/historyRoutes.js'; 
// import historyRoutes from '../api/routes/historyRoutes.js'; 
import { analyzeResume } from './utils/resumeAnalyzer.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRoutes);
app.use('/resume', resumeRoutes);
app.use('/history', historyRoutes); // Added history routes middleware

// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB;
    if (!mongoURI) {
      throw new Error('MongoDB URI is not defined in environment variables');
    }
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: err.message,
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

// Start server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});