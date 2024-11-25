// // models/Resume.js
// import mongoose from 'mongoose';

// const resumeSchema = new mongoose.Schema({
//   filename: { type: String, required: true },
//   text: { type: String, required: true },
//   JD: { type: String, required: true },
//   Score: { type: Number, required: true },
//   scoringDetails: {
//     relevanceScore: { type: Number, required: true },
//     sectionsScore: { type: Number, required: true },
//     formattingScore: { type: Number, required: true },
//     summary: {
//       strengths: { type: [String], required: true },  
//       weaknesses: { type: [String], required: true }
//     },
//     criteriaExplanation: {
//       relevanceToJob: String,
//       keySections: String,
//       formatting: String,
//     },
//   },
//   createdAt: { type: Date, default: Date.now },
// });

// const Resume = mongoose.model('Resume', resumeSchema);
// export default Resume;



// models/Resume.js
import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    text: { type: String, required: true },
    JD: { type: String, required: true },
    fileUrl: { type: String }, // URL to stored PDF file
    fileKey: { type: String }, // Storage key/path for the file
    Score: { type: Number, required: true, min: 0, max: 100 },
    scoringDetails: {
      relevanceScore: { type: Number,default:0 , min: 0, max: 100 },
      sectionsScore: { type: Number, default:0, min: 0, max: 100 },
      formattingScore: { type: Number,default:0 , min: 0, max: 100 },
      summary: {
        strengths: { type: [String], default: [] },
        weaknesses: { type: [String], default: [] },
      },
      criteriaExplanation: {
        relevanceToJob: { type: String, default: '' },
        keySections: { type: String, default: '' },
        formatting: { type: String, default: '' },
      },
    },
  },
  { timestamps: true }
);

const Resume = mongoose.model('Resume', resumeSchema);
export default Resume;